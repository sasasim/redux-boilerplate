export const fetchUser = () => new Promise(res => setTimeout(() => {
  res({
    id: 'somespecialuserid',
    firstName: 'John',
    lastName: 'Doe',
    country: {
      id: 'us',
      name: 'USA'
    }
  });
}, 500));
