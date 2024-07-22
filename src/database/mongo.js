const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: { type: String },
  // Add other user data fields here if needed
});

const DownloadHistorySchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  songId: { type: String, required: true },
  songName: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  downloadDate: { type: Date, default: Date.now },
  // Add other download history fields here if needed
});

const User = mongoose.model('User', UserSchema);
const DownloadHistory = mongoose.model('DownloadHistory', DownloadHistorySchema);

const createUser = async (telegramId, username) => {
  try {
    const newUser = new User({ telegramId, username });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getUser = async (telegramId) => {
  try {
    const user = await User.findOne({ telegramId });
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

const updateUser = async (telegramId, updateData) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ telegramId }, updateData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (telegramId) => {
  try {
    await User.findOneAndDelete({ telegramId });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const createDownloadHistory = async (userId, songId, songName, artist, album) => {
  try {
    const newDownloadHistory = new DownloadHistory({
      userId,
      songId,
      songName,
      artist,
      album,
    });
    await newDownloadHistory.save();
    return newDownloadHistory;
  } catch (error) {
    console.error('Error creating download history:', error);
    throw error;
  }
};

const getDownloadHistory = async (userId) => {
  try {
    const downloadHistory = await DownloadHistory.find({ userId });
    return downloadHistory;
  } catch (error) {
    console.error('Error getting download history:', error);
    throw error;
  }
};

const updateDownloadHistory = async (downloadId, updateData) => {
  try {
    const updatedDownloadHistory = await DownloadHistory.findOneAndUpdate(
      { _id: downloadId },
      updateData,
      { new: true }
    );
    return updatedDownloadHistory;
  } catch (error) {
    console.error('Error updating download history:', error);
    throw error;
  }
};

const deleteDownloadHistory = async (downloadId) => {
  try {
    await DownloadHistory.findOneAndDelete({ _id: downloadId });
  } catch (error) {
    console.error('Error deleting download history:', error);
    throw error;
  }
};

module.exports = {
  connect,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createDownloadHistory,
  getDownloadHistory,
  updateDownloadHistory,
  deleteDownloadHistory,
};