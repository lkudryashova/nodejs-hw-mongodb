import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const password = getEnvVar('MONGODB_PASSWORD');
    await mongoose.connect(
      `mongodb+srv://LK:${password}@cluster0.uqo6dar.mongodb.net/my-contacts?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
