/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';

if (__DEV__) {
  import('./ReactotronConfig');
}
AppRegistry.registerComponent('chatApp', () => App);
