import { model, Schema } from 'mongoose';

const SourceSchema = new Schema({
	id: {
		type: String,
		required: [true, 'Article source id required']
	},
	name: {
		type: String,
		default: () => this.id,
		required: [true, 'Article source name required']
	}
}, { _id: false });

const ArticleSchema = Schema({
	_id: Schema.Types.ObjectId,
	source: SourceSchema,
	author: {
		type: String,
		required: [true, 'Article author required']
	},
	title: {
		type: String,
		required: [true, 'Article title required']
	},
	description: {
		type: String,
		required: false
	},
	url: {
		type: String,
		required: false
	},
	urlToImage: {
		type: String,
		required: false
	},
	publishedAt: {
		type: String,
		default: new Date(Date.now()).toISOString(),
		required: [true, 'Article publishedAt required']
	},
	content: {
		type: String,
		required: [true, 'Article content required']
	}
});

export const Article = model('Article', ArticleSchema);
