import React, { useState, useEffect } from 'react';
import { Alert, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Idea.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import API from '../../BaseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonCounter } from '../../components/ButtonCounter';
import { Label } from '../../components/Label';
import { Menu } from '../../components/Menu';
import { Modal } from '../../components/Modal';
import { TextSourceSans } from '../../components/TextSourceSans';
import { Comments } from '../Comments/Comments';
import { CommentForm } from '../Comments/CommentForm';
import { ButtonSubmit } from '../../components/ButtonSubmit';

export const Idea = (props) => {
  const {idea, project, createdDate} = props.route.params;
  const moduleId = project.single_agenda_setting_module;
  const [ideaState, setIdeaState] = useState(idea);
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [comments, setComments] = useState([]);
  const [objectToComment, setObjectToComment] = useState({'contentType': idea.content_type, 'pk': idea.pk});
  //const [focusCommentForm, setFocusCommentForm] = useState(false);
  const [commentLastCommented, setCommentLastCommented] = useState(-1);
  const hasComments = comments.length !== 0;
  const [showCommentForm, setShowCommentForm] = useState(false);

  const menuItems = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () =>  {
        setMenuVisible(false);
        props.navigation.navigate('IdeaCreate', {idea: ideaState, project: project, editing: true});
      },
      isFirst: true,
      isAllowed: ideaState.has_changing_permission
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => toggleDeleteModal(),
      isAllowed: ideaState.has_deleting_permission
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => console.log('Report'),
      isFirst: !ideaState.has_changing_permission && !ideaState.has_deleting_permission,
      isLast: true,
      isAllowed: true
    },
    {
      title: 'Cancel',
      action: () => setMenuVisible(false),
      isCancel: true,
      isAllowed: true
    },
  ];

  const deleteModalItems = [
    {
      // space is to center the text
      title: '   This idea will be deleted.\nThis action cannot be undone',
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
  ];

  const getLabels = () => {
    let labelsList = [];
    ideaState.category && labelsList.push(ideaState.category.name);
    ideaState.labels.length > 0 && labelsList.push(...ideaState.labels.map(label => label.name));
    return labelsList;
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const toggleDeleteModal = () => (
    setDeleteModalVisible(!deleteModalVisible),
    setMenuVisible(false)
  );

  const handleRate = async(value) => {
    if (processing) return;
    setProcessing(true);
    const token = await AsyncStorage.getItem('authToken');
    const newIdea = await rate(value, token);
    newIdea && setProcessing(false);
  };

  const rate = async(value, token) => {
    const {pk, content_type} = ideaState;

    if (ideaState.user_rating) {
      if (ideaState.user_rating.value !== value) {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: value},
          token
        );
      }
      else {
        await API.changeRating(
          content_type,
          pk,
          ideaState.user_rating.id,
          {value: 0},
          token
        );
      }
    }
    else {
      await API.rate(content_type, pk, {value: value}, token);
    }
    return await fetchIdea();
  };

  const handleCommentSubmit = (values) => {
    setShowCommentForm(false);
    AsyncStorage.getItem('authToken')
      .then((token) => {
        return API.addComment(objectToComment.contentType, objectToComment.pk, values, token);
      })
      .then((response) => {
        const {statusCode, data} = response;
        if (statusCode == 201) {
          if (data.content_type == data.comment_content_type) {
            setCommentLastCommented(data.object_pk);
          }
          else {
            setCommentLastCommented(-1);
          }
          fetchComments(idea.content_type, idea.pk);
          setObjectToComment({'contentType': idea.content_type, 'pk': idea.pk});
        }
        else {
          const errorMessage = 'That did not work.';
          let errorDetail;
          if (statusCode==403) {
            errorDetail = data.detail;
          }
          else if (statusCode == 400) {
            errorDetail = ('comment' in data ? ('Comment: ' + data['comment']) : 'Bad request');
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok' }]);
        }
      });

  };

  const handleCommentReply = (commentContentType, commentObjectPk) => {
    setObjectToComment({'contentType': commentContentType, 'pk': commentObjectPk});
    setShowCommentForm(true);
  };

  const fetchIdea = () => {
    return AsyncStorage.getItem('authToken')
      .then((token) => API.getIdea(moduleId, ideaState.pk, token))
      .then(fetchedIdea => {
        setIdeaState(fetchedIdea);
        return fetchedIdea;
      });
  };

  const deleteIdea = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.deleteIdea(moduleId, ideaState.pk, token))
      .then(() => {
        Alert.alert('Your idea was deleted.', 'Thank you for participating!',  [{ text: 'Ok' }]);
        props.navigation.navigate('IdeaProject');
      });
  };

  const arrowLeftIcon = (<IconSLI name='arrow-left' size={22} />);
  const optionsIcon = (<IconSLI name='options-vertical' size={22} />);
  const arrowUpIcon = (<IconSLI name='arrow-up' size={18} />);
  const arrowDownIcon = (<IconSLI name='arrow-down' size={18} />);
  const commentIcon = (
    <IconSLI name='bubble' size={18}
      color={!hasComments
        ? styles.disabledIcon.color
        : styles.fontColor.color
      }
      style={styles.commentIcon}
    />
  );

  const fetchComments = (ideaContentType, ideaPk) => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.getComments(ideaContentType, ideaPk, token))
      .then(({results}) => setComments(results));
  };

  useEffect(() => {
    setIdeaState(idea);
    const { content_type, pk } = idea;
    fetchComments(content_type, pk);
  }, [idea]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.actionsContainer}>
          <Button
            buttonStyle={styles.backButton}
            titleStyle={styles.backButtonText}
            title='Back'
            type='clear'
            icon={arrowLeftIcon}
            onPress={() => props.navigation.goBack()}
          />
          <Button
            icon={optionsIcon}
            type='clear'
            onPress={toggleMenu}
          />
        </View>
        <View style={styles.titleContainer}>
          <TextSourceSans style={styles.title}>{ideaState.name}</TextSourceSans>
        </View>
        <View style={styles.descriptionContainer}>
          {ideaState.image && (
            <>
              <Image source={{ uri: ideaState.image }} style={styles.ideaImage} />
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
            {ideaState.creator} {createdDate}
          </TextSourceSans>
          <TextSourceSans style={styles.text}>
            Reference No.: {ideaState.reference_number || 'n/a'}
          </TextSourceSans>
        </View>
        <View style={styles.bottomActionsContainer}>
          <View style={styles.ratingButtons}>
            <ButtonCounter
              icon={arrowUpIcon}
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
          />
        </View>}
        {!showCommentForm && (
          <ButtonSubmit
            title='Add Comment'
            onPress={() => setShowCommentForm(true)}
          />)}
      </ScrollView>
      {showCommentForm && (
        <View>
          <CommentForm
            handleSubmit={handleCommentSubmit}
            isFocused={showCommentForm}
          />
        </View>)}
      <Menu menuItems={menuItems} isVisible={menuVisible} />
      <Modal
        modalItems={deleteModalItems}
        isVisible={deleteModalVisible}
      />
    </>
  );
};
