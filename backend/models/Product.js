const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be positive'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Coir Peat',
        'Coir Fiber',
        'Growing Medium',
        'Coir Blocks',
        'Geo-Textiles',
        'Rope & Twine',
        'Garden Supplies',
        'Landscaping',
        'Bundle',
      ],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Auto-set inStock based on quantity
productSchema.pre('save', function (next) {
  this.inStock = this.quantity > 0;
  next();
});

module.exports = mongoose.model('Product', productSchema);
