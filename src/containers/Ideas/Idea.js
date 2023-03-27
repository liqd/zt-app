import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import API from '../../BaseApi'
import { ButtonCounter } from '../../components/ButtonCounter'
import { Header } from '../../components/Header'
import { Label } from '../../components/Label'
import { Menu } from '../../components/Menu'
import { Modal } from '../../components/Modal'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'
import { CommentForm } from '../Comments/CommentForm'
import { Comments } from '../Comments/Comments'

import { styles } from './Idea.styles'

export const Idea = (props) => {
  const {idea, module} = props.route.params
  const { navigation } = props
  const [ideaState, setIdeaState] = useState(idea)
  const [menuVisible, setMenuVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [comments, setComments] = useState([])
  const [error, setError] = useState()
  const [contentObjectOfComment, setContentObjectOfComment] =
    useState({
      'contentType': idea.content_type,
      'pk': idea.pk
    })
  const [commentLastCommented, setCommentLastCommented] = useState(-1)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(undefined)
  const [submitPending, setSubmitPending] = useState(false)
  const hasComments = comments.length !== 0
  const commentInputRef = useRef(null)
  const scrollViewRef = useRef(null)
  const { t } = useTranslation()
  const ideaMenuItems = [
    {
      title: t('Edit'),
      icon: 'pencil',
      action: () =>  {
        setMenuVisible(false)
        props.navigation.navigate('IdeaCreate', {
          idea: ideaState,
          module: module,
          editing: true
        })
      },
      isFirst: true,
      isAllowed: ideaState.has_changing_permission
    },
    {
      title: t('Delete'),
      icon: 'trash',
      action: () => {
        setDeleteModalItems(ideaDeleteModalItems)
        toggleDeleteModal()
      },
      isAllowed: ideaState.has_deleting_permission
    },
    {
      title: t('Report'),
      icon: 'flag',
      action: () => {
        setMenuVisible(false)
        props.navigation.navigate(
          'ReportCreateMessage',
          {
            content_type: ideaState.content_type,
            object_pk: ideaState.pk
          }
        )
      },
      isFirst: !ideaState.has_changing_permission &&
        !ideaState.has_deleting_permission,
      isLast: true,
      isAllowed: true
    },
    {
      title: t('Cancel'),
      action: () => toggleMenu(),
      isCancel: true,
      isAllowed: true
    },
  ]

  const ideaDeleteModalItems = [
    {
      // space is to center the text
      title: [t('This idea will be deleted.'), t('This action cannot be undone.')],
      isText: true
    },
    {
      title: t('Delete'),
      action: () => deleteIdea()
    },
    {
      title: t('Cancel'),
      action: () => toggleDeleteModal(),
      isCancel: true
    },
  ]

  const [menuItems, setMenuItems] = useState(ideaMenuItems)
  const [deleteModalItems, setDeleteModalItems] =
    useState(ideaDeleteModalItems)

  const getLabels = () => {
    let labelsList = []
    ideaState.category && labelsList.push(ideaState.category.name)
    ideaState.labels.length > 0 && labelsList.push(
      ...ideaState.labels.map(label => label.name)
    )
    return labelsList
  }

  const toggleMenu = () => setMenuVisible(prevState => !prevState)

  const toggleDeleteModal = () => {
    setDeleteModalVisible(prevState => !prevState)
    setMenuVisible(false)
  }

  const handleRate = async(value) => {
    if (processing) return
    setProcessing(true)
    const newIdea = await rate(value)
    newIdea && setProcessing(false)
  }

  const rate = async(value) => {
    const {pk, content_type} = ideaState

    if (ideaState.user_rating) {
      if (ideaState.user_rating.value !== value) {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: value}
        )
      } else {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: 0}
        )
      }
    } else {
      await API.postRating(content_type, pk, {value: value})
    }
    return await fetchIdea()
  }

  const toggleEditing= (comment) => {
    if (isEditing){
      commentInputRef.current.blur()
      setIsEditing(false)
      setEditedComment(undefined)
    } else {
      toggleMenu()
      setIsEditing(true)
      setEditedComment(comment)
    }
  }

  const handleComment = (values) => {
    commentInputRef.current.blur()
    setSubmitPending(true)
    values.agreed_terms_of_use = true
    const payload = getCommentPayload(values)
    return (isEditing
      ? API.editComment(...payload)
      : API.addComment(...payload)
    )
      .then((response) => {
        let {statusCode, data} = response
        if (statusCode === 201 || statusCode === 200) {
          if (statusCode === 200) toggleEditing()
          processComment(data)
          setSubmitPending(false)
        } else if (statusCode === 403) {
          return Promise.reject(data.detail)
        } else if (statusCode === 400) {
          const errorMsg = 'comment' in data
            ? 'Comment: ' + data['comment']
            : 'Bad request'
          return Promise.reject(errorMsg)
        }
      })
      .catch(error => {
        setError(error)
        setSubmitPending(false)
      })
  }

  const getCommentPayload = (values) => {
    if (isEditing) {
      return [
        editedComment.content_type,
        editedComment.object_pk,
        editedComment.id,
        values
      ]
    } else {
      return [
        contentObjectOfComment.contentType,
        contentObjectOfComment.pk,
        values
      ]
    }
  }

  const processComment = (data) => {
    if (data.content_type == data.comment_content_type) {
      setCommentLastCommented(data.object_pk)
    } else {
      setCommentLastCommented(-1)
    }
    fetchComments(idea.content_type, idea.pk)
    setContentObjectOfComment({
      'contentType': idea.content_type,
      'pk': idea.pk
    })
  }

  const handleCommentReply = (
    commentContentType,
    commentObjectPk,
    parentCommentY
  ) => {
    setContentObjectOfComment({
      'contentType': commentContentType,
      'pk': commentObjectPk
    })

    setAnchorComment(parentCommentY)
    setIsReply(true)
  }

  function handleScroll(event) {
    const { nativeEvent: { contentOffset: { y: offsetY } } } = event
    if (isScrolling && offsetY < 75.0) {
      setIsScrolling(false)
    } else if (!isScrolling && (offsetY >= 75.0) ) {
      setIsScrolling(true)
    }
  }

  const fetchIdea = () => {
    return API.getIdea(module.pk, ideaState.pk)
      .then(response => {
        setIdeaState(response.data)
        return response.data
      })
  }

  const deleteIdea = () => {
    API.deleteIdea(module.pk, ideaState.pk)
      .then((response) => {
        const {statusCode, data} = response
        toggleDeleteModal()
        if (statusCode == 204) {
          Alert.alert(
            t('Your idea was deleted.'),
            t('Thank you for participating!'),
            [{ text: t('Ok') }]
          )
          props.navigation.goBack()
        } else {
          const errorMessage = t('That did not work.')
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = 'Bad request'
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok' }])
        }
      })
  }

  const optionsIcon = <IconSLI name='options-vertical' size={22} />
  const arrowUpIcon = <IconSLI name='arrow-up' size={18} />
  const arrowDownIcon = <IconSLI name='arrow-down' size={18} />
  const commentIcon = <IconSLI name='bubble' size={18} />

  const fetchComments = (ideaContentType, ideaPk) => {
    API.getComments(ideaContentType, ideaPk)
      .then(response => setComments(response.data.results))
  }

  useEffect(() => {
    setIdeaState(idea)
    const { content_type, pk } = idea
    fetchComments(content_type, pk)
  }, [idea])

  useEffect(() => {
    if(isEditing) {
      const timer = setTimeout(()=>{
        commentInputRef.current.focus()
      }, 100)
      return () => {clearTimeout(timer)}
    }
  }, [isEditing])

  /***** start of scrolling to anchored Comment *****/

  const [anchorComment, setAnchorComment] =  useState(0)
  const [isReply, setIsReply] =  useState(false)
  const [ideaInfoHeight, setIdeaInfoHeight] =  useState()
  const {height: windowHeight} = useWindowDimensions()
  const ideaRef = useRef(null)

  useEffect(() => {
    if (ideaRef.current) {
      ideaRef.current.measureInWindow((...measures) => {
        // measures[3] = distance from top to comments list
        // moving to bottom of screen with minus windowHeight
        setIdeaInfoHeight(measures[3] - windowHeight)
      })
    }
  }, [ideaRef.current])

  useEffect(() => {
    // re-define local function everytime anchorComment changes
    // to make sure latest anchorComment is used
    const onKeyboardDidShow = (e) => {
      const keyboardHeight = e.endCoordinates.height
      isReply && scrollViewRef?.current?.scrollTo({
        x: 0,
        y: ideaInfoHeight + keyboardHeight + anchorComment
      })
      setIsReply(false)
    }
    const keyboardEventListener = Keyboard
      .addListener('keyboardDidShow', (e) => onKeyboardDidShow(e))

    // cleanup listener -> this runs next time before useEffect body runs
    return () => {
      keyboardEventListener.remove()
    }
  }, [anchorComment, isReply])

  useEffect(() => {
    if (anchorComment && isReply) {
      commentInputRef.current.focus()
    }
  }, [anchorComment, isReply])

  /***** end of scrolling to anchored Comment *****/

  useEffect(() => {
    if (error) {
      Alert.alert(t('An error occured'), error, [{ text: 'Ok' }])
    }
  }, [error])

  const rightHeaderButton = (
    (!isEditing && !isScrolling) &&
        <Button
          icon={optionsIcon}
          type='clear'
          onPress={() => {setMenuItems(ideaMenuItems); toggleMenu()}}
          accessibilityLabel={t('Click to open idea menu')}
          accessibilityHint={t('Click to open menu to update or delete your idea or report someone elses')}
        />)

  return (
    <SafeAreaView
      style={styles.safeAreaView}
    >
      <StatusBarStyled />
      <Header
        isEditing={isEditing}
        rightButton={rightHeaderButton}
        toggleEditing={toggleEditing}
        navigation={props.navigation}
      />
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios')
          ? 'padding'
          : null}
        style={styles.flexFullWidth}
      >
        <ScrollView
          style={styles.container}
          scrollEnabled={!isEditing}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps='handled'
          onScroll={handleScroll}
          ref={scrollViewRef}
        >
          <View
            ref={ideaRef}
            collapsable={false}
          >
            <View style={styles.titleContainer}>
              <TextSourceSans
                accessibilityRole="header"
                style={styles.title}
              >
                {ideaState.name}
              </TextSourceSans>
            </View>
            <View style={styles.descriptionContainer}>
              {ideaState.image && (
                <>
                  <Image
                    accessibilityIgnoresInvertColors={true}
                    source={{ uri: ideaState.image }}
                    style={styles.ideaImage}
                  />
                </>
              )}
              <TextSourceSans
                style={styles.text}
              >
                {ideaState.description}
              </TextSourceSans>
            </View>
            {getLabels().length > 0 && (
              <View style={styles.labelsContainer}>
                {getLabels().map((label, idx) => (
                  <Label key={idx + label} title={label} />
                ))}
              </View>
            )}
            <View style={styles.infoContainer}>
              <TextSourceSans style={styles.creator}>
                {ideaState.creator} {idea.created}
              </TextSourceSans>
              <TextSourceSans style={styles.text}>
                {t('Reference No.:') + ' ' + ideaState.reference_number || t('n/a')}
              </TextSourceSans>
            </View>
            <View style={styles.bottomActionsContainer}>
              <View style={styles.ratingButtons}>
                <ButtonCounter
                  icon={arrowUpIcon}
                  labelText={ideaState.positive_rating_count + ' ' + t('up-votes')}
                  hintText={t('click to up vote')}
                  counter={ideaState.positive_rating_count}
                  onPress={() => handleRate(1)}
                  highlight={
                    ideaState.user_rating &&
                    ideaState.user_rating.value === 1 &&
                    ideaState.user_rating.value
                  }
                  rating='pos'
                  disabled={!ideaState.has_rating_permission}
                />
                <ButtonCounter
                  icon={arrowDownIcon}
                  labelText={ideaState.negative_rating_count + ' ' + t('down-votes')}
                  hintText={t('click to down vote')}
                  counter={ideaState.negative_rating_count}
                  onPress={() => handleRate(-1)}
                  highlight={
                    ideaState.user_rating &&
                    ideaState.user_rating.value === -1 &&
                    ideaState.user_rating.value
                  }
                  rating='neg'
                  disabled={!ideaState.has_rating_permission}
                />
              </View>
              {hasComments &&
                <View>
                  <ButtonCounter
                    icon={commentIcon}
                    labelText={t('idea has comments')}
                    disabled
                  />
                </View>}
            </View>
          </View>
          {comments && (
            <Comments
              comments={comments}
              handleReply={handleCommentReply}
              commentLastCommented={commentLastCommented}
              setMenuItems={setMenuItems}
              toggleMenu={toggleMenu}
              toggleEditing={toggleEditing}
              setDeleteModalItems={setDeleteModalItems}
              toggleDeleteModal={toggleDeleteModal}
              hasCommentingPermission={idea.has_commenting_permission}
              navigation={navigation}
            />
          )}
        </ScrollView>
        {idea.has_commenting_permission && (
          <View>
            <CommentForm
              inputRef={commentInputRef}
              isEdit={isEditing}
              handleSubmit={handleComment}
              value={isEditing
                ? editedComment.comment
                : ''}
              disabled={submitPending}
            />
          </View>)}
        <Menu menuItems={menuItems} isVisible={menuVisible} />
        <Modal
          modalItems={deleteModalItems}
          isVisible={deleteModalVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
