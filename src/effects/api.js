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
