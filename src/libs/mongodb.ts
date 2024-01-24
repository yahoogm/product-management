import mongoose from 'mongoose';

const apiURI = process.env.API_URI;
if (!apiURI) {
  throw new Error('API_URI is not defined in the environment variables.');
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(apiURI);
    console.log('connect to mongodb');
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
