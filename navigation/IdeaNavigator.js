import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { ExplorePage } from '../containers/Ideas/ExplorePage';
import { Idea } from '../containers/Ideas/Idea';
import { IdeaCreate } from '../containers/Ideas/IdeaCreate';
import { IdeaProject } from '../containers/Ideas/IdeaProject';

const IdeaNavigator = createStackNavigator({
  ExplorePage: ExplorePage,
  IdeaProject: IdeaProject,
  IdeaDetail: Idea,
  IdeaCreate: IdeaCreate
});

export default createAppContainer(IdeaNavigator);
