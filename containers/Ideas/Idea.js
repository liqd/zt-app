import React, { useEffect, useRef,useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/base'

import API from '../../BaseApi'
import { ButtonCounter } from '../../components/ButtonCounter'
import { Header } from '../../components/Header'
import { Label } from '../../components/Label'
import { Menu } from '../../components/Menu'
import { Modal } from '../../components/Modal'
import { TextSourceSans } from '../../components/TextSourceSans'
import { DateService } from '../../services/DateService'
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
  const [contentObjectOfComment, setContentObjectOfComment] = useState(
    {'contentType': idea.content_type, 'pk': idea.pk}
  )
  const [commentLastCommented, setCommentLastCommented] = useState(-1)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(undefined)
  const hasComments = comments.length !== 0
  const commentInputRef = useRef(null)
  const ideaMenuItems = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () =>  {
        setMenuVisible(false)
        props.navigation.navigate('IdeaCreate', {idea: ideaState, module: module, editing: true})
      },
      isFirst: true,
      isAllowed: ideaState.has_changing_permission
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => {setDeleteModalItems(ideaDeleteModalItems); toggleDeleteModal()},
      isAllowed: ideaState.has_deleting_permission
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => {
        setMenuVisible(false)
        props.navigation.navigate(
          'ReportCreateMessage',
          {content_type: ideaState.content_type, object_pk: ideaState.pk}
        )
      },
      isFirst: !ideaState.has_changing_permission && !ideaState.has_deleting_permission,
      isLast: true,
      isAllowed: true
    },
    {
      title: 'Cancel',
      action: () => toggleMenu(),
      isCancel: true,
      isAllowed: true
    },
  ]

  const ideaDeleteModalItems = [
    {
      // space is to center the text
      title: '   This idea will be deleted.\nThis action cannot be undone.',
      isText: true
    },
    {
      title: 'Delete',
      action: () => deleteIdea()
    },
    {
      title: 'Cancel',
      action: () => toggleDeleteModal(),
      isCancel: true
    },
  ]

  const [menuItems, setMenuItems] = useState(ideaMenuItems)
  const [deleteModalItems, setDeleteModalItems] = useState(ideaDeleteModalItems)

  const getLabels = () => {
    let labelsList = []
    ideaState.category && labelsList.push(ideaState.category.name)
    ideaState.labels.length > 0 && labelsList.push(...ideaState.labels.map(label => label.name))
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
    const token = await AsyncStorage.getItem('authToken')
    const newIdea = await rate(value, token)
    newIdea && setProcessing(false)
  }

  const rate = async(value, token) => {
    const {pk, content_type} = ideaState

    if (ideaState.user_rating) {
      if (ideaState.user_rating.value !== value) {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: value},
          token
        )
      } else {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: 0},
          token
        )
      }
    } else {
      await API.postRating(content_type, pk, {value: value}, token)
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

  const handleCommentSubmit = (values) => {
    commentInputRef.current.blur()
    AsyncStorage.getItem('authToken')
      .then((token) => {
        values.agreed_terms_of_use = true
        return API.addComment(
          contentObjectOfComment.contentType,
          contentObjectOfComment.pk,
          values,
          token
        )
      })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 201) {
          if (data.content_type == data.comment_content_type) {
            setCommentLastCommented(data.object_pk)
          } else {
            setCommentLastCommented(-1)
          }
          fetchComments(idea.content_type, idea.pk)
          setContentObjectOfComment({'contentType': idea.content_type, 'pk': idea.pk})
        } else {
          const errorMessage = 'That did not work.'
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = ('comment' in data ? ('Comment: ' + data['comment']) : 'Bad request')
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok' }])
        }
      })

  }

  function handleCommentEdit(values) {
    commentInputRef.current.blur()
    AsyncStorage.getItem('authToken')
      .then((token) => {
        values.agreed_terms_of_use = true
        return API.editComment(
          editedComment.content_type,
          editedComment.object_pk,
          editedComment.id,
          values,
          token
        )
      })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 200) {
          toggleEditing()
          if (data.content_type == data.comment_content_type) {
            setCommentLastCommented(data.object_pk)
          } else {
            setCommentLastCommented(-1)
          }
          fetchComments(idea.content_type, idea.pk)
          setContentObjectOfComment({'contentType': idea.content_type, 'pk': idea.pk})
        } else {
          const errorMessage = 'That did not work.'
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = ('comment' in data ? ('Comment: ' + data['comment']) : 'Bad request')
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok', onPress: ()=> {toggleEditing()} }])
        }
      })
  }

  const handleCommentReply = (commentContentType, commentObjectPk) => {
    setContentObjectOfComment({'contentType': commentContentType, 'pk': commentObjectPk})
    commentInputRef.current.focus()
  }

  function handleScroll(event) {
    if (isScrolling && event.nativeEvent.contentOffset.y < 75.0) {
      setIsScrolling(false)
    } else if (!isScrolling && (event.nativeEvent.contentOffset.y >= 75.0) ) {
      setIsScrolling(true)
    }
  }

  const fetchIdea = () => {
    return AsyncStorage.getItem('authToken')
      .then(token => API.getIdea(module.pk, ideaState.pk, token))
      .then(response => {
        setIdeaState(response.data)
        return response.data
      })
  }

  const deleteIdea = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.deleteIdea(module.pk, ideaState.pk, token))
      .then((response) => {
        const {statusCode, data} = response
        toggleDeleteModal()
        if (statusCode == 204) {
          Alert.alert('Your idea was deleted.', 'Thank you for participating!',  [{ text: 'Ok' }])
          props.navigation.goBack()
        } else {
          const errorMessage = 'That did not work.'
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
  const commentIcon = (
    <IconSLI name='bubble' size={18}
      color={!hasComments
        ? styles.disabledIcon.color
        : styles.fontColor.color
      }
      style={styles.commentIcon}
    />
  )

  const fetchComments = (ideaContentType, ideaPk) => {
    AsyncStorage.getItem('authToken')
      .then(token => API.getComments(ideaContentType, ideaPk, token))
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

  const rightHeaderButton = (
    (!isEditing && !isScrolling) &&
        <Button
          icon={optionsIcon}
          type='clear'
          onPress={() => {setMenuItems(ideaMenuItems); toggleMenu()}}
        />)

  return (
    <SafeAreaView
      style={styles.safeAreaView}
    >
      <Header
        isEditing={isEditing}
        rightButton={rightHeaderButton}
        toggleEditing={toggleEditing}
        navigation={props.navigation} />
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios')? 'padding' : null}
        style={styles.flexFullWidth}
      >
        <ScrollView
          style={styles.container}
          scrollEnabled={!isEditing}
          keyboardShouldPersistTaps='handled'
          onScroll={handleScroll}
        >
          <Pressable accessibilityRole="button" onPress={isEditing && toggleEditing} style={{
            ...isEditing ? styles.pressableEditing : {}
          }} disabled={!isEditing}>
            <View style={styles.titleContainer}>
              <TextSourceSans style={styles.title}>{ideaState.name}</TextSourceSans>
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
              <TextSourceSans style={styles.text}>{ideaState.description}</TextSourceSans>
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
                {ideaState.creator} {DateService(idea.created)}
              </TextSourceSans>
              <TextSourceSans style={styles.text}>
            Reference No.: {ideaState.reference_number || 'n/a'}
              </TextSourceSans>
            </View>
            <View style={styles.bottomActionsContainer}>
              <View style={styles.ratingButtons}>
                <ButtonCounter
                  icon={arrowUpIcon}
                  labelText="up-votes"
                  hintText="click to up vote"
                  counter={ideaState.positive_rating_count}
                  onPress={() => handleRate(1)}
                  highlight={
                    ideaState.user_rating &&
                ideaState.user_rating.value === 1 &&
                ideaState.user_rating.value
                  }
                  disabled={!ideaState.has_rating_permission}
                />
                <ButtonCounter
                  icon={arrowDownIcon}
                  labelText="down-votes"
                  hintText="click to down vote"
                  counter={ideaState.negative_rating_count}
                  onPress={() => handleRate(-1)}
                  highlight={
                    ideaState.user_rating &&
                ideaState.user_rating.value === -1 &&
                ideaState.user_rating.value
                  }
                  disabled={!ideaState.has_rating_permission}
                />
              </View>
              <View>
                {commentIcon}
              </View>
            </View>
            {comments && <View>
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
            </View>}
          </Pressable>
        </ScrollView>
        {idea.has_commenting_permission && (
          <CommentForm
            inputRef={commentInputRef}
            isEdit={isEditing}
            handleSubmit={isEditing
              ? handleCommentEdit
              : handleCommentSubmit
            }
            value={isEditing
              ? editedComment.comment
              : ''
            }
          />
        )}
        <Menu menuItems={menuItems} isVisible={menuVisible} />
        <Modal
          modalItems={deleteModalItems}
          isVisible={deleteModalVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
