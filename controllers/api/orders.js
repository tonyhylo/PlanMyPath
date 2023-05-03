const Order = require('../../models/order');
const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
async function addToCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    // Add the item to the cart
    await cart.addItemToCart(req.params.id);
    res.json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try {
    const { itemId, newQty } = req.body;
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(itemId, newQty);
    res.json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  // mark the order as isPaid = true
 await cart.checkout()

  res.json(cart);

}
