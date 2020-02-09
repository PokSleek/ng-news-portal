import mongoose from 'mongoose';
import { config } from '../config/db'

const { auth, name } = config;


export const setUpConnection = () => {
    const uri = `mongodb+srv://${auth.user}:${auth.password}@newscluster-e8lal.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: name,
        auth: auth,
    });
    return mongoose.connection;
};
