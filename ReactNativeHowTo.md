
# How to create React Native Boilerplate


## Prepare Boilerplate 

Clone the boilerplate repository
```
git clone git@github.com:salsita/redux-boilerplate.git
cd redux-boilerplate
```

The boilerplate contains lot of files, which are not need for mobile development. Remove them before you create new project

```
rm -r static
rm -r webpack/
rm -r dist/
```


## Install react-native

You need to just follow steps in provided link bellow
https://facebook.github.io/react-native/docs/getting-started.html

## Create project 

Initialise project

```
react-native init <project-name>
```

and copy all content from redux boilerplate into new react native project folder. Do not forgot to copy hidden configuration files for `eslint` and `babel`.

## Prepare package.json

Remove all packages, which are not need (`router5`, `react-router5` and `react-dom`) and replace them with package `react-native`. For now, you have all packages you require to run the boilerplate.

The application can be build and depolyed to simulator/emulation by using console commands `react-native run-ios` or `react-native run-android`. If the server is not running, then it is going to be started by those commands.


## Update project's code

There are going to be lot changes in code in order to convert boilerplate for mobile development. 

React native does not support standard HTML elements. It uses its owns elements which are mapped into native counterparts. In order to get boilerplate working, you need to rewrite all used components.

For example, the counter component from the boilerplate

```
<div className="counter">
  <button onClick={onDecrement}>-</button>
    <span>{value}</span>
  <button onClick={onIncrement}>+</button>
</div>
```

can be transformed to react native component like this:

```
<View className="counter">
  <TouchableHighlight onPress={onDecrement}>
  	<Text>-</Text>
  </TouchableHighlight>
  <Text>{value}</Text>
  <TouchableHighlight onPress={onIncrement}>
  	<Text>+</Text>
  </TouchableHighlight>
</View>
```

React native use different function to bootstrap the application. You can look into stock files (`index.ios.js` or `index.android.js`) for inspiration.

Here is the example of entry point connected to boilerplate: 
```
import { AppRegistry } from 'react-native';
import MainRender from './src/main';

AppRegistry.registerComponent('ReactNativeReduxBoilerplate', () => MainRender);
```

# Remote debugging

React native projects can be debugged in Chrome out of box. You just need to allow remote debugging in system menu of the simulator/emulator. 

If you need to examine your redux storage and observe redux actions, then it is better to install redux remote debugging tools

```
npm install --save remote-redux-devtools
```



# Navigation (Routing)

Usual mobile application does not have same workflow as a web application. In mobile, you usually have home screen, which acts as the starting point. New screen are presented over home screen.

React Native provides native mechanism, which works on both platforms. It is called navigation and allows you to manage screens and present them over them self in stack. Presentation might be done using `push` animation. You can find more information in
https://facebook.github.io/react-native/docs/navigation.html

Navigator operates on state, which defines which screen is currently presented. This might be example of simple reducer which manages the navigator’s state:

```
import { NavigationExperimental } from 'react-native';

import createReducer from 'helpers/createReducer';
import * as ActionTypes from 'constants/actionTypes';
import * as Scenes from 'constants/scenes';

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

const initialState = {
  index: 0,
  routes: [
    { key: Scenes.INDEX }
  ]
};

export default createReducer({
  [ActionTypes.RESET]: (state, payload) => NavigationStateUtils.reset(state, [payload]),
  [ActionTypes.PUSH]: (state, payload) => NavigationStateUtils.push(state, { key: payload.key }),
  [ActionTypes.POP]: state => NavigationStateUtils.pop(state),
}, initialState);
```

If you want to present new screen, you can simply dispatch push action:

```
buildAction(ActionTypes.PUSH, { payload: { key: Scenes.COUNTER } })
```



