import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { Idea } from '../containers/Ideas/Idea';
import { IdeasPage } from '../containers/Ideas/IdeasPage';

const IdeaNavigator = createStackNavigator({
  IdeasPage: IdeasPage,
  IdeaDetail: Idea
});

export default createAppContainer(IdeaNavigator);
