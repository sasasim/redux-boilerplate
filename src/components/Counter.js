import React, { PropTypes } from 'react';

import 'components/counter.styl';

const Counter = ({ value, onDecrement, onIncrement }) => (
  <div className="counter">
    <button onClick={onDecrement}>-</button>
    <span>{value}</span>
    <button onClick={onIncrement}>+</button>
  </div>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired
};

export default Counter;
