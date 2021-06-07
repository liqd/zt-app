import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { ExplorePage } from '../containers/Ideas/ExplorePage';
import { Idea } from '../containers/Ideas/Idea';
import { IdeaCreate } from '../containers/Ideas/IdeaCreate';
import { IdeaProject } from '../containers/Ideas/IdeaProject';
import { LoginScreen } from '../containers/Auth/LoginScreen';
import { StartUpScreen } from '../containers/Auth/StartUpScreen';

const IdeaNavigator = createStackNavigator({
  ExplorePage: ExplorePage,
  IdeaProject: IdeaProject,
  IdeaDetail: Idea,
  IdeaCreate: IdeaCreate
});

const MainNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: LoginScreen,
  Ideas: IdeaNavigator
});

export default createAppContainer(MainNavigator);
