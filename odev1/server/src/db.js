import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })

    mongoose.connection.on('open', () => console.log('mongodb: Connencted'))
    mongoose.connection.on('err', (e) => console.log('Mongodb: NotConnected!', e))
}