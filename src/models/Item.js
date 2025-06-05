import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    minlength: [5, 'Description must be at least 5 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other'],
      message: 'Category must be one of: Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other'
    }
  },
  stock: { 
    type: Number, 
    required: [true, 'Stock is required'],
    min: [0, 'Stock must be a non-negative number'],
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer'
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Item', itemSchema);