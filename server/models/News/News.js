import mongoose from 'mongoose';

const NewsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  category: String,
  country: String,
  description: String,
  language: String,
  name: String,
  url: String,
});

export const News = mongoose.model('News', NewsSchema);
