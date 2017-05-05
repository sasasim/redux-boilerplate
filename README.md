# react/redux boilerplate

> react, redux, redux-saga, rotuer5, reselect, normalizr

## Development

```
git clone git@github.com:salsita/redux-boilerplate.git
cd redux-boilerplate
yarn
npm start
```

Navigate your browser to http://localhost:3000/

## Underlying library Stack

For now, we have agreed on using:

1. [`react`](https://facebook.github.io/react/) for rendering
2. [`redux`](http://redux.js.org/) for state management
3. [`router5`](http://router5.github.io/) for client-side routing
4. [`redux-saga`](https://github.com/yelouafi/redux-saga) for business logic and asynchronous workflow
5. [`reselect`](https://github.com/reactjs/reselect) for memoized, composable selectors
6. [`normlizr`](https://github.com/paularmstrong/normalizr) for normalizing business entities

### React

The heart of rendering is `react`. The goal is to keep `react` as very simple thin rendering library and therefore delegate state management to `redux`. However, sometimes it makes sense to keep the `Component` stateful, for example: a lot of DOM interaction, need for Component lifecycle, non-business specific simple state management (e.g. `hover`).

## Styleguide

You are strongly encouraged to read & use this styleguide, feel free to file an issue if you disagree with some rule, or you feel like adding a new one.

### Files & folders
1. Prefer predefined directory structure, which is flat, we don't want nested folders because it makes reasoning about imports much more difficult
2. File name must be unique across the whole project, it's good practice to add suffix of file type eg. `counterSaga` and `counterReducer`
3. Only classes or `React` Components (keep in mind that Containers are also `React` Components) should have the first letter of their filename capitalized

### Imports
```javascript
import library from 'library';
import nextLibrary, { namedStuffFromNextLibrary } from 'next-library';
import { namedStuffFromLibrary } from 'another-library';

import DefaultImport from 'src/components/Component';
import * as ActionTypes from 'src/constants/actionTypes';
import * as Whatever from 'src/whatever/whatever';
```

1. Prefer wildcard imports over named, because it namespaces variables in the scope
2. Use aliases instead of relative imports
3. If possible order group of imports alphabetically by path

### React Components
1. Keep all your `react` components & containers within `src/components` folder, use `.js` suffix even though you are technically using JSX

2. Always name your component before exporting, therefore prefer this:
  ```javascript
  import React from 'react';

  const MyComponent = () => <div>Hello World</div>;
  export default MyComponent;
  ```

  over this:
  ```javascript
  import React from 'react';

  export default () => <div>Hello World</div>;
  ```

  There are two reasons: the component will have a name in `react` devtools, and it's much easier to add proptypes later even when the component does not currently accept any props

3. Always specify PropTypes and be as specific as possible, therefore using of `PropTypes.array` is banned, use `PropTypes.shape` (wherever possible instead of `PropTypes.object`) and `PropTypes.arrayOf` instead

4. Keep in mind that 99% of your props are `required` so don't forget to define them as `isRequired` in the definition

5. Prefer destructured props over accessing them

6. Feel free to use [Short-circuit evaluation](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation)

7. Import `React` first, then define the component, then specify PropTypes and as the last step do default export

8. Always use `default` exports for Components

9. Split Component into many sub components when the Component becomes too complex, keep them in the same file if it makes sense, otherwise you can make it generic and abstract it away to separate exported `Component`

10. Never ever use `bind` or lambda functions in event handlers, they create new reference with **each render**! Of course an exception is when you need to pass an argument (e.g. index of item which has been clicked), however, think twice if that's really the case

11. Use stateful components if it makes sense (simple UI state, component lifecycle, heavy DOM manipulation)

12. Never rely on `dispatch` presence directly in the Component, prefer action creators. `onClick={() => dispatch({ type: 'FOO' })}` is simply wrong because it creates new function with each render

### Constants

1. Use uppercase convention for all the constants
2. Action types are always called `actionTypes` not `actions`!
3. Try to logically group `actionTypes` together by using empty lines as visual separators
4. Might even be a good idea to annotate the group with comments

### Containers

1. Keep them in the `src/components` folder

2. For `mapDispatchToProps` use `buildActionCreators` helper. The helper accepts an object where keys are prop names and values types of actions to be dispatched, it automatically generates action creators which dispatch the action of specified type and payload passed to the function
  ```javascript
  const { onClick } = buildActionCreators({
    onClick: 'CLICKED'
  });

  // is equal to:

  const onClick = dispatch => payload => dispatch({ 'CLICKED', payload });
  mapDispatchToProps({ onClick });
  ```

3. Keep in mind that [`connect` has also the third argument called mergeProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md) which may be very handy in some situations

  E.g. tag actions by instance id of the Container (Elmish approach):
  ```javascript
  const CounterContainer = connect(
    mapStateToProps,
    buildActionCreators({
      onIncrement: ActionTypes.INCREMENT
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onIncrement: () => dispatchProps.onIncrement(ownProps.counterId)
    })
  )(Counter);

  <CounterContainer counterId='topCounter' />
  <CounterContainer counterId='bottomCounter' />
  ```

  Re-shaping dispatched action:
  ```javascript
    const ControlledTextField = ({ onChange, value }) => <input type="text" onChange={onChange} value={value} />;

    const ControlledTextFieldContainer = connect(
      mapStateToProps,
      buildActionCreators({
        onChange: ActionTypes.TEXT_FIELD_CHANGE
      }),
      (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onChange: ev => dispatchProps.onChange(ev.target.value)
      })
    )(ControlledTextField)
  ```

### Sagas
1. Never use `yield*`, always prefer `yield call` or `yield fork`

  ```javascript
  function* apiSaga() {
     yield put({ type: 'SetLoadingSpinner' });
     try {
       yield call(api);
     } finally {
       yield put({ type: 'ResetLoadingSpinner' });
     }
  }

  // You better do this
  function* rootSaga() {
      yield take('CallAPI');

      // You should realize that you can choose between call and fork
      // depending on use case
      yield call(apiSaga);
  }

  // Instead of this
  function* rootSaga(){
      yield take('CallAPI');
      yield* apiSaga();
  }
  ```

  The reason why `call` is preferred way is because of testing

2. Always `default` export Saga and fork the function in the parent. Therefore if you want to `takeEvery` you can do that in the exported function for particular saga. See `helloUserSaga`

## Styling

There is a basic setup with `stylus` and `autoprefixer`, in development the styles are embedded right into the component, in production the styles are extracted using `extract-text-webpack-plugin` to standalone CSS file.

## Linting

The code is linted using `eslint`, we extend [`airbnb`](https://github.com/airbnb/javascript)'s code style.

One especially handy plugin is `eslint-plugin-import`, its responsibility is checking whether imported modules really exists in the file system. It works for libraries & user modules as well.

## Testing

There are two scripts available:

- `npm run test` for single test run
- `npm run test:watch` for watching changes and re-runnig the tests

Testing framework is [Jest](https://facebook.github.io/jest/), there's no configuration and the only command that is  used is `jest`. It automatically uses `babel` (configured via `.babelrc`) for transpiling.

## Deployment

We are using heroku for realtime global deployment. `postinstall` script runs the unit tests and the build script which creates static assets inside `dist/` folder. Also, deployment will require the following environment variables to be set in your heroku app:

- `NODE_ENV: true`
- `NPM_CONFIG_PRODUCTION: false`

## Demo

Application is running on: [http://boilerplate.salsitasoft.com/](http://boilerplate.salsitasoft.com/)
