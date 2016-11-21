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

### Constants

1. Use uppercase convention for all the constants
2. Action types are always called `actionTypes` not `actions`!
3. Try to logically group `actionTypes` together by using empty lines as visual separators
4. Might even be a good idea to annotate the group by comment

## Build

## Deployment

## Linting & Testing

## Debugging

## Styling

## Questions

1. Should we rather prefer React classes over stateless-functions? At the moment, there's no performance benefit when using stateless functions and in fact, statelss function does not even implement pure rendering, therefore the only option to use `shouldComponentUpdate` is to wrap the stateless function into stateful component
