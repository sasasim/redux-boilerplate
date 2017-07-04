import { Router } from 'express';

const router = new Router();

router.get('/user', (req, res) => {
  res.json({
    country: {
      id: 'us',
      name: 'USA'
    },
    firstName: 'John',
    id: 'somespecialuserid',
    lastName: 'Doe'
  });
});

export default router;
