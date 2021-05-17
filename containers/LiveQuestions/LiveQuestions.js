import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton } from '../../components/IconButton';
import { LiveQuestionsItem } from './LiveQuestionsItem';

// *** SAMPLE COMPONENT ***

export const LiveQuestions = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(
      'https://aplus-dev.liqd.net/api/modules/320/interactiveevents/livequestions/'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  return (
    <View>
      <Text>Live Questions Component (stateful)</Text>
      <View>
        <IconButton action={fetchData}>Fetch Data!</IconButton>
      </View>
      {data.map(({ text }, idx) => (
        <LiveQuestionsItem key={idx} text={text} />
      ))}
    </View>
  );
};
