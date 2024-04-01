import chalk from 'chalk';
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!, {
      dbName: 'MovieSafarisDB',
    });
    console.log(chalk.greenBright('MongoDB Connected'));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('mongodb Error', err);
    }
  }
};

export default connectDB;
