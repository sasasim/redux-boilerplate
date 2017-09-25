import axios from 'axios';
export const fetchUser = () => new Promise(res => setTimeout(() => {
  res({
    country: {
      id: 'us',
      name: 'USA'
    },
    firstName: 'John',
    id: 'somespecialuserid',
    lastName: 'Doe'
  });
}, 500));

export function* fetchUsers () {
  console.info('Fetch Users API');
  const users = yield axios('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.info('API Result:', response);
      return response.data;
    });
  return users;
};
