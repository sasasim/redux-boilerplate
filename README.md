# react/redux boilerplate

> react, redux, redux-saga, react-router, reselect, normalizr

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
3. [`react-router`](https://react-router.now.sh/) for client-side routing
4. [`redux-saga`](https://github.com/yelouafi/redux-saga) for business logic and asynchronous workflow
5. [`reselect`](https://github.com/reactjs/reselect) for memoized, composable selectors
6. [`normlizr`](https://github.com/paularmstrong/normalizr) for normalizing business entities

### React

Obviously the heart of rendering is `react`. The goal is to keep `react` as very simple thin rendering library and therefore delegate state management to `redux`. However, sometimes it simply makes sense to keep the `Component` stateful a good example might be: a lot of DOM interaction, a need for Component lifecycle, non-business specific simple state management eg. `hover`.

## Styleguide

You are strongly encouraged to read & use this styleguide, feel free to file an issue if you disagree with some rule, or you feel like adding a new one.

### Files & folders
1. Prefer pre-defined directory structure, which is flat, we don't want nested folders because it makes reasoning about imports much more difficult
2. File name must be unique across the whole project, it's good practice to add suffix of file type eg. `counterSaga` and `counterReducer`
3. Use `index.js` filename for root entities (eg. root saga, root reducer etc.) because all the entities technically form a tree with its root
4. Only classes or `React` Components (keep in mind that Container is also `React` Component) can have first letter upper-cased in the name of its file

### Imports
```javascript
import library from 'library';
import nextLibrary, { namedStuffFromNextLibrary } from 'next-library';
import { namedStuffFromLibrary } from 'another-library';

import DefaultImport from 'components/Component';
import * as ActionTypes from 'constants/actionTypes';
import * as Whatever from 'whatever/whatever';
```

1. Prefer wildcard imports over named, because it namespaces those variables in the scope
2. Use aliases instead of relative imports
3. If possible order group of imports alphabetically by path, not import name

### React Components
1. Keep all your `react` components within `src/components` folder, use `.js` suffix even though you are technically using JSX.

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

  There are two reasons: the component will have a name in `react` devtools and it's much easier to add proptypes later even when the component does not currently accept any props.

3. Always specify PropTypes and be as specific as possible, therefore using of `PropTypes.object` or `PropTypes.array` is banned, use `PropTypes.shape` and `PropTypes.arrayOf` instead.

4. Keep in mind that 99% of your props are `required` so don't forget to define them as `isRequired` in the definition.

5. Prefer destructured props over accessing them

6. Fear not [Short-circuit evaluation](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation)

7. Import `React` first, then define the component, then specify PropTypes and as the last step do default export

8. Always use `default` exports for Components

9. Fear not of splitting Component into many sub components when the Component become way too complex, keep them in the same file if it makes sense, otherwise you can make it generic and abstract it away to separate exported `Component`.

10. Never ever use `bind` or lambda functions in event handlers, they create new reference with **each render**! Of course an exception is when you need to pass an argument (eg. index of item which has been clicked), however think twice if that's really the case.

11. Fear not of using stateful components if it makes sense (simple UI state, component lifecycle, heavy DOM manipulation)

12. Never rely on `dispatch` presence directly in the Component, prefer action creators. `onClick={() => dispatch({ type: 'FOO' })}` is simply wrong because it creates new function with each render.

### Constants

1. Use uppercase convention for all the constants
2. Action types are always called `actionTypes` not `actions`!
3. Try to logically group `actionTypes` together by using empty lines as visual separators
4. Might even be a good idea to annotate the group by comment

### Containers

1. Keep in the container just `connect`ed HOC, the component itself should be imported from `components` folder (index be an exception)

2. For `mapDispatchToProps` use `buildActionCreators` helper. The helper accepts an object where keys are prop names and values types of actions to be dispatched, it automatically generates action creators which dispatch the action of specified type and payload passed to the function. 
  ```javascript
  const { onClick } = buildActionCreators({
    onClick: 'CLICKED'
  });

  // is equal to:

  const onClick = dispatch => payload => dispatch({ 'CLICKED', payload });
  mapDispatchToProps({ onClick });
  ```

3. Keep in mind [`connect` has third argument called mergeProps](https://github.com/reactjs/react-redux/blob/master/docs/api.md) which in some situations may be very handy.

  eg. tag actions by instance id of the Container (Elmish approach):
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

  re-shaping dispatched action:
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

  The reason why `call` is preferred way is because of testing.

2. Always `default` export Saga and fork the function in the parent. Therefore if you want to `takeEvery` you can do that in the exported function for particular saga. See `helloUserSaga`.

## Build



## Deployment

We are using [now.sh](https://zeit.co/now/) for realtime global deployment, all you have to do to get your current application online is running `npm run deploy`. First time you run the command, you will be prompted for e-mail, just provide the e-mail and visit confirmation link, from now on, you can just deploy the app by running `npm run deploy` and the application gets deployed on random URL (which is going to be copied to your cliboard).

Implementation is easy, all we had to do was install `now` via `npm`. Deploy script runs the build script which creates static assets inside `dist/` folder. This folder contains the only non-gitignored file which is `package.json` and this `package.json` is responsible for running static HTTP server. After application is built, it's just a matter of `now dist/` to get the application online.

## Linting

The code is linted using `eslint`, basically we extend [`airbnb`](https://github.com/airbnb/javascript)'s code style.

One especially handy plugin is `eslint-plugin-import`, its responsibility is checking whether imported modules really exists in the file system. It works for libraries & user modules as well.

## Testing

There are two scripts available:

- `npm run test` for single test run
- `npm run test:watch` for watching changes and re-runnig the tests

Testing framework is [Jest](https://facebook.github.io/jest/), there's basically no configuration and the only command that is being used is `jest`. It automatically uses `babel` (configured via `.babelrc`) for transpiling.

## Styling

We just did a basic setup with `stylus` and `autoprefixer`, in development styles are embedded right into the component, in production styles are being extracted using `extract-text-webpack-plugin` to standalone CSS file.


## Questions

1. Should we rather prefer React classes over stateless-functions? At the moment, there's no performance benefit when using stateless functions and in fact, statelss function does not even implement pure rendering, therefore the only option to use `shouldComponentUpdate` is to wrap the stateless function into stateful component

2. Is the flat directory structure good fit for large projects? Does it scale well? Should we somehow namespace it at some point?

3. Do we want to use `index.js` filenames?

