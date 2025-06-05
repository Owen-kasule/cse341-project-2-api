import express from 'express';
import Item from '../models/Item.js';
import { itemValidationRules, validateObjectId, validate } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - stock
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: The name of the item
 *           minLength: 2
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: The description of the item
 *           minLength: 5
 *           maxLength: 500
 *         price:
 *           type: number
 *           description: The price of the item
 *           minimum: 0
 *         category:
 *           type: string
 *           enum: [Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other]
 *           description: The category of the item
 *         stock:
 *           type: integer
 *           description: The stock quantity
 *           minimum: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the item was last updated
 *       example:
 *         name: "iPhone 13"
 *         description: "Latest Apple smartphone with advanced features"
 *         price: 999.99
 *         category: "Electronics"
 *         stock: 50
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch items',
      message: err.message 
    });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       400:
 *         description: Invalid item ID
 *       500:
 *         description: Server error
 */
router.get('/:id', validateObjectId(), validate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false,
        error: 'Item not found' 
      });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch item',
      message: err.message 
    });
  }
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 500
 *               price:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *                 enum: [Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other]
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *             example:
 *               name: "iPhone 13"
 *               description: "Latest Apple smartphone with advanced features"
 *               price: 999.99
 *               category: "Electronics"
 *               stock: 50
 *     responses:
 *       201:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', itemValidationRules(), validate, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const newItem = new Item({ name, description, price, category, stock });
    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem
    });
  } catch (err) {
    console.error('Error creating item:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Failed to create item',
      message: err.message 
    });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update the item by the id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 500
 *               price:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *                 enum: [Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food, Other]
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *             example:
 *               name: "iPhone 13 Pro"
 *               description: "Updated Apple smartphone with pro features"
 *               price: 1099.99
 *               category: "Electronics"
 *               stock: 30
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put('/:id', validateObjectId(), itemValidationRules(), validate, async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() }, 
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ 
        success: false,
        error: 'Item not found' 
      });
    }
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (err) {
    console.error('Error updating item:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: Object.values(err.errors).map(e => e.message)
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Failed to update item',
      message: err.message 
    });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 *       400:
 *         description: Invalid item ID
 *       500:
 *         description: Server error
 */
router.delete('/:id', validateObjectId(), validate, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ 
        success: false,
        error: 'Item not found' 
      });
    }
    res.json({ 
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem
    });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete item',
      message: err.message 
    });
  }
});

export default router;