import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema: Schema = new Schema({
    _id: Schema.Types.ObjectId,
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

export const User = model<IUser>('User', UserSchema);
