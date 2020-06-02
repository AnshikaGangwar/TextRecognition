import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import Camera from './screens/camera';
import MemoView from './screens/memoView';
import Gallery from './screens/galleryView';
const MainStack = createStackNavigator({ Welcome, Camera, MemoView, Gallery });

const Routes = createAppContainer(MainStack);

export default Routes;
