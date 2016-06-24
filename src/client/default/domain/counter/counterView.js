import React from 'react';
import { view } from 'redux-elm';

import Button from '../../ui/button';
import ViewWrapper from '../../ui/viewWrapper';

export default view(({ model, dispatch }) => (
  <ViewWrapper>
    <Button text={`Clicked ${model}x`} onClick={() => dispatch({ type: 'Increment' })} />
  </ViewWrapper>
));
