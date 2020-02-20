import { model, Schema } from 'mongoose';
import { IArticleModel } from '../interfaces';

const SourceSchema: Schema = new Schema({
	id: {
		type: String,
		required: [true, 'Article source id required']
	},
	name: {
		type: String,
		// @ts-ignore
		default: () => this.id,
		required: [true, 'Article source name required']
	}
}, { _id: false });

const ArticleSchema: Schema = new Schema({
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

export const Article = model<IArticleModel>('Article', ArticleSchema);
