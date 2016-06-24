import React from 'react';
import { view } from 'redux-elm';

import ViewWrapper from '../../ui/viewWrapper';
import Greeting from '../../ui/greeting';
import Button from '../../ui/button';

export default view(({ model, dispatch }) => (
  <ViewWrapper>
    {!model && <Button text="Fetch" onClick={() => dispatch({ type: 'Fetch' })} />}
    {!!model && <Greeting>{model}</Greeting>}
  </ViewWrapper>
));
