import template from './template';

export default (req, res) => res
  .status(200)
  .send(template());
