const getHandler = (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
  // throw new Error('Error');
};

module.exports = { getHandler };
