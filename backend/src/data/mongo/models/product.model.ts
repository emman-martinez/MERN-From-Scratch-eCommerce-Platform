import { model, Schema } from 'mongoose';

const productSchema = new Schema({});

export const ProductModel = model('Product', productSchema);
