// seeds/seedProducts.js - Seed the database with default products
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Premium Coco Coir Peat (5kg)',
    price: 350,
    category: 'Coir Peat',
    image: 'https://images.unsplash.com/photo-1708883575520-767e545afa18?w=500&h=500&fit=crop',
    description: 'High-quality coconut coir peat ideal for gardening, horticulture, and soil conditioning. Sourced from Philippine coconut farms.',
    featured: true,
    trending: true,
    inStock: true,
    quantity: 100,
  },
  {
    name: 'Coconut Coir Fiber Bundle (1kg)',
    price: 250,
    category: 'Coir Fiber',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Coir_fibery.jpg/500px-Coir_fibery.jpg',
    description: 'Natural coconut coir fibers for mulching, composting, erosion control, and handicraft. 100% biodegradable.',
    featured: true,
    trending: false,
    inStock: true,
    quantity: 150,
  },
  {
    name: 'Coco Coir Growing Medium (10L)',
    price: 450,
    category: 'Growing Medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Hydroponic_herb_garden.jpg/500px-Hydroponic_herb_garden.jpg',
    description: 'Complete coco coir growing medium for plants, vegetables, and seedlings. Excellent water retention and aeration.',
    featured: true,
    trending: true,
    inStock: true,
    quantity: 200,
  },
  {
    name: 'Compressed Coir Bricks (650g)',
    price: 180,
    category: 'Coir Blocks',
    image: 'https://images.unsplash.com/photo-1708883575520-767e545afa18?w=500&h=500&fit=crop',
    description: 'Compressed coconut coir bricks that expand to 8-9 liters. Great for potting mix and raised bed gardening.',
    featured: false,
    trending: true,
    inStock: true,
    quantity: 300,
  },
  {
    name: 'Coir Geo-Textile Net (1m x 5m)',
    price: 1200,
    category: 'Geo-Textiles',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Textielmuseum-cabinet-10.jpg/500px-Textielmuseum-cabinet-10.jpg',
    description: 'Durable coir-based geo-textile net for slope stabilization, erosion control, and landscaping projects.',
    featured: true,
    trending: false,
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Coconut Coir Rope (100m)',
    price: 320,
    category: 'Rope & Twine',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Making_coir_rope_in_Kerala.JPG/500px-Making_coir_rope_in_Kerala.JPG',
    description: 'Strong and natural coconut coir rope suitable for construction, agriculture, and decorative purposes.',
    featured: false,
    trending: true,
    inStock: true,
    quantity: 200,
  },
  {
    name: 'Coir Pot Liners (Set of 10)',
    price: 280,
    category: 'Garden Supplies',
    image: 'https://images.unsplash.com/photo-1653842647601-c84c4ce6f9fe?w=500&h=500&fit=crop',
    description: 'Eco-friendly coir pot liners for hanging baskets and planters. Biodegradable and promotes healthy root growth.',
    featured: true,
    trending: true,
    inStock: true,
    quantity: 120,
  },
  {
    name: 'Coir Seedling Pots (Pack of 20)',
    price: 200,
    category: 'Garden Supplies',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&h=500&fit=crop',
    description: 'Biodegradable coir seedling pots. Plant directly into soil — no transplant shock. Perfect for nurseries.',
    featured: false,
    trending: false,
    inStock: true,
    quantity: 250,
  },
  {
    name: 'Coir Mulch Mat (Pack of 5)',
    price: 550,
    category: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1683994851774-6e9642fb8a95?w=500&h=500&fit=crop',
    description: 'Round coir mulch mats for weed suppression around trees and shrubs. Natural and biodegradable.',
    featured: true,
    trending: false,
    inStock: true,
    quantity: 80,
  },
  {
    name: 'Premium Coir Starter Bundle',
    price: 999,
    category: 'Bundle',
    image: 'https://images.unsplash.com/photo-1752401966871-fcda5b645160?w=500&h=500&fit=crop',
    description: 'Complete starter bundle: includes coir peat, coir pots, and growing medium. Perfect for beginners.',
    featured: true,
    trending: true,
    inStock: true,
    quantity: 60,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
