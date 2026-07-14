import 'colors';
import users from '../users.ts';
import products from '../products.ts';
import { OrderModel, ProductModel, UserModel } from '../mongo/models/index.ts';
import { MongoDatabase } from '../mongo/mongo-database.ts';
import { env } from '../../config/env.ts';

const importData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit(); // Exit the process after successful import
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit the process with an error code
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit(); // Exit the process after successful destruction
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit the process with an error code
  }
};

const runSeed = async () => {
  await MongoDatabase.connect({
    dbName: env.MONGO_DB_NAME,
    mongoUrl: env.MONGO_URI,
  });

  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

runSeed();
