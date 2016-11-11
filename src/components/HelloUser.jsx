import React, { PropTypes } from 'react';

const HelloUser = ({ greeted, user, onSayHello }) => (
  <div>
    {!greeted && <button onClick={onSayHello}>Say Hello!</button>}
    {greeted && user && <h1>Hello {user.firstName} {user.lastName} from {user.country.name}</h1>}
  </div>
);

HelloUser.propTypes = {
  greeted: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    country: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }),
  onSayHello: PropTypes.func.isRequired
};

export default HelloUser;
