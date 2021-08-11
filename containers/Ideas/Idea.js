import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Idea.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import API from '../../BaseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonCounter } from '../../components/ButtonCounter';
import { Label } from '../../components/Label';
import { Menu } from '../../components/Menu';
import { Modal } from '../../components/Modal';
import { Comments } from '../Comments/Comments';
import { TouchableOpacity } from 'react-native';

export const Idea = (props) => {
  const {params, createdDate, moduleId} = props.route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [voteUp, setVoteUp] = useState(params.positive_rating_count);
  const [voteDown, setVoteDown] = useState(params.negative_rating_count);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const hasComments = comments.length !== 0;

  const menuItems = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () => console.log('Edit'),
      isFirst: true,
      isAllowed: params.has_changing_permission
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => toggleDeleteModal(),
      isAllowed: params.has_deleting_permission
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => console.log('Report'),
      isFirst: !params.has_changing_permission && !params.has_deleting_permission,
      isLast: true,
      isAllowed: true
    },
    {
      title: 'Cancel',
      action: () => toggleMenu(),
      isCancel: true,
      isAllowed: true
    },
  ];

  const deleteModalItems = [
    {
      title: 'This idea will be deleted.\nThis action cannot be undone',
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
    params.category && labelsList.push(params.category);
    params.labels.length > 0 && labelsList.push(...params.labels);
    return labelsList;
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const toggleDeleteModal = () => (
    setDeleteModalVisible(!deleteModalVisible),
    setMenuVisible(false)
  );

  const handleVote = (direction) => {
    AsyncStorage.getItem('authToken')
      .then(token => {
        return vote(direction, token);
      });
  };

  const vote = (direction, token) => {
    const {user_rating, pk, content_type} = params;
    const alterVote = // if altering vote is true, then swap votes, otherwise reset
      (direction === 'up' && voteUp === 0) ||
      (direction === 'down' && voteDown === 0);

    if (alterVote) {
      const dirValue = direction === 'up' ? 1 : -1;
      user_rating && API.changeRating(content_type, pk, user_rating.id, {value: dirValue}, token);
      user_rating || API.rate(content_type, pk, {value: dirValue}, token);
      if (direction === 'up') {
        setVoteUp(1);
        setVoteDown(0);
      }
      else {
        setVoteUp(0);
        setVoteDown(1);
      }
    }
    else {
      API.changeRating(content_type, pk, user_rating.id, {value: 0}, token);
      setVoteUp(0);
      setVoteDown(0);
    }
  };

  const deleteIdea = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.deleteIdea(moduleId, params.pk, token))
      .then(() => {
        Alert.alert('Your idea was deleted.', 'Thank you for participating!',  [{ text: 'Ok' }]);
        props.navigation.navigate('IdeaProject');
      });
  };

  const toggleComments = () => setShowComments(!showComments);

  useEffect(() => {
    const { content_type, pk } = params;
    API.getComments(content_type, pk)
      .then(({results}) => setComments(results));
  }, []);

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
            icon={<Icon name='arrow-left' size={22} />}
            onPress={() => props.navigation.goBack()}
          />
          <Button
            icon={<Icon name='options-vertical' size={22} />}
            type='clear'
            onPress={toggleMenu}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{params.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          {params.image && (
            <Image source={{ uri: params.image }} style={styles.ideaImage} />
          )}
          <Text style={styles.text}>{params.description}</Text>
        </View>
        {getLabels().length > 0 && (
          <View style={styles.labelsContainer}>
            {getLabels().map((label, idx) => (
              <Label key={idx + label} title={label} />
            ))}
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.creator}>
            {params.creator} {createdDate}
          </Text>
          <Text style={styles.text}>
            Reference No.: {params.reference_number || 'n/a'}
          </Text>
        </View>
        <View style={styles.bottomActionsContainer}>
          <View style={styles.ratingButtons}>
            <ButtonCounter
              icon={<Icon name='arrow-up' size={18} />}
              counter={voteUp}
              onPress={() => handleVote('up')}
              disabled={!params.has_rating_permission}
            />
            <ButtonCounter
              icon={<Icon name='arrow-down' size={18} />}
              counter={voteDown}
              onPress={() => handleVote('down')}
              disabled={!params.has_rating_permission}
            />
          </View>
          <View>
            <TouchableOpacity onPress={toggleComments} disabled={!hasComments}>
              <Icon
                name='bubble'
                size={18}
                color={!hasComments
                  ? styles.disabledIcon.color
                  : styles.fontColor.color}
              />
            </TouchableOpacity>
          </View>
        </View>
        {comments && showComments && <View>
          <Comments comments={comments} />
        </View>}
      </ScrollView>
      <Menu menuItems={menuItems} isVisible={menuVisible} />
      <Modal
        modalItems={deleteModalItems}
        isVisible={deleteModalVisible}
      />
    </>
  );
};
