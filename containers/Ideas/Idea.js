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

export const Idea = (props) => {
  const {idea, project, createdDate} = props.route.params;
  const moduleId = project.single_agenda_setting_module;
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [upVotes, setUpVotes] = useState(idea.positive_rating_count);
  const [downVotes, setDownVotes] = useState(idea.negative_rating_count);
  const [userRating, setUserRating] = useState(idea.user_rating);
  const [processing, setProcessing] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const hasComments = comments.length !== 0;

  const menuItems = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () =>  props.navigation.navigate('IdeaCreate', {idea: idea, project: project, editing: true}),
      isFirst: true,
      isAllowed: idea.has_changing_permission
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => toggleDeleteModal(),
      isAllowed: idea.has_deleting_permission
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => console.log('Report'),
      isFirst: !idea.has_changing_permission && !idea.has_deleting_permission,
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
    idea.category && labelsList.push(idea.category.name);
    idea.labels.length > 0 && labelsList.push(...idea.labels.map(label => label.name));
    return labelsList;
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const toggleDeleteModal = () => (
    setDeleteModalVisible(!deleteModalVisible),
    setMenuVisible(false)
  );

  const handleVote = async(direction) => {
    if (processing) return;
    setProcessing(true);
    const token = await AsyncStorage.getItem('authToken');
    const voteObject = await vote(direction, token);
    voteObject && setProcessing(false);
  };

  const swapUserVotes = (direction) => {
    if (direction === 'up') {
      setUpVotes(upVotes + 1);
      downVotes > 0 && setDownVotes(downVotes - 1);
    }
    else {
      upVotes > 0 && setUpVotes(upVotes - 1);
      setDownVotes(downVotes + 1);
    }
  };

  const resetUserVotes = (direction) => {
    if (direction === 'up') {
      upVotes > 0 && setUpVotes(upVotes - 1);
    }
    else {
      downVotes > 0 && setDownVotes(downVotes - 1);
    }
  };

  const vote = async(direction, token) => {
    const {pk, content_type} = idea;
    const dirValue = direction === 'up' ? 1 : -1;
    let voteResponse = null;
    if (userRating) {
      if (userRating.value !== dirValue) {
        swapUserVotes(direction);
        voteResponse = await API.changeRating(content_type, pk, userRating.id, {value: dirValue}, token);
      }
      else {
        resetUserVotes(direction);
        voteResponse = await API.changeRating(content_type, pk, userRating.id, {value: 0}, token);
      }
    }
    else {
      voteResponse =  await API.rate(content_type, pk, {value: dirValue}, token);
    }
    setUserRating({id: voteResponse.data.id, value: voteResponse.data.value});
    return voteResponse;
  };

  const deleteIdea = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.deleteIdea(moduleId, idea.pk, token))
      .then(() => {
        Alert.alert('Your idea was deleted.', 'Thank you for participating!',  [{ text: 'Ok' }]);
        props.navigation.navigate('IdeaProject');
      });
  };

  const toggleComments = () => setShowComments(!showComments);

  useEffect(() => {
    const { content_type, pk } = idea;
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
          <Text style={styles.title}>{idea.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          {idea.image && (
            <Image source={{ uri: idea.image }} style={styles.ideaImage} />
          )}
          <Text style={styles.text}>{idea.description}</Text>
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
            {idea.creator} {createdDate}
          </Text>
          <Text style={styles.text}>
            Reference No.: {idea.reference_number || 'n/a'}
          </Text>
        </View>
        <View style={styles.bottomActionsContainer}>
          <View style={styles.ratingButtons}>
            <ButtonCounter
              icon={<Icon name='arrow-up' size={18} />}
              counter={upVotes}
              onPress={() => handleVote('up')}
              highlight={userRating && userRating.value === 1 && userRating.value}
              disabled={!idea.has_rating_permission}
            />
            <ButtonCounter
              icon={<Icon name='arrow-down' size={18} />}
              counter={downVotes}
              onPress={() => handleVote('down')}
              highlight={userRating && userRating.value === -1 && userRating.value}
              disabled={!idea.has_rating_permission}
            />
          </View>
          <View>
            <Button
              onPress={toggleComments}
              disabled={!hasComments}
              icon={<Icon name='bubble' size={18} color={!hasComments ? styles.disabledIcon.color : styles.fontColor.color} />}
              type='clear'
              containerStyle={styles.commentButton}
            />
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
