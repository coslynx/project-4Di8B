const express = require('express');
const router = express.Router();
const { handleMessage } = require('../utils/telegram');

router.post('/', async (req, res) => {
  try {
    const message = req.body;
    await handleMessage(message);
    res.status(200).send({ message: 'Message received' });
  } catch (error) {
    console.error('Error handling Telegram message:', error);
    res.status(500).send({ message: 'Error processing message' });
  }
});

module.exports = router;