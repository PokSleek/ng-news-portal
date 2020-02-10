import mongoose from 'mongoose';

const NewsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
});

export const News = mongoose.model('Article', NewsSchema);
