import type { Request, Response } from 'express';
import type { Types } from 'mongoose';
import { ProductService } from '../../services/product.service.ts';

export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // @desc Fetch all products
  // @route GET /api/products
  // @access Public
  async getProducts(_req: Request, res: Response) {
    const products = await this.productService.getProducts();

    if (!products) {
      res.status(404);
      throw new Error('Products not found');
    }

    res.status(200).json(products);
  }

  // @desc Fetch single product
  // @route GET /api/products/:id
  // @access Public
  async getProductById(req: Request, res: Response) {
    const productId = String(req.params.id);
    const product = await this.productService.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error(`Product with ID ${productId} not found`);
    }
  }

  // @desc Create a new product
  // @route POST /api/products
  // @access Public
  async createProduct(req: Request, res: Response) {
    const productData = {
      user: req.user?._id as Types.ObjectId,
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      description: 'Sample Description',
      image: '/images/sample.jpg',
      name: 'Sample Product',
      numReviews: 0,
      price: 0,
      rating: 0,
    };

    const newProduct = await this.productService.createProduct(productData);

    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400);
      throw new Error('Failed to create product');
    }
  }
}
