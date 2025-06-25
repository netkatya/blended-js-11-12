//Робота з loacalStorage
import { WISHLIST_KEY, CART_KEY } from "./constants";

// Wishlist
export const getWishlist = () => {
    try {
        const data = localStorage.getItem(WISHLIST_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Wishlist data corrupted in localStorage:", error);
        return [];
    }
}

export const saveWishlist = (wishlist) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export const addToWishlist = (productId) => {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist(wishlist);
    }
}

export const removeFromWishlist = (productId) => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
};

// Cart
export const getCart = () => {
    try {
        const data = localStorage.getItem(CART_KEY);
        const cart = data ? JSON.parse(data) : [];
        // Фільтруємо товари без валідного id
        return cart.filter(item => item && (typeof item.id === 'number' || typeof item.id === 'string'));
    } catch (error) {
        console.error("Cart data corrupted in localStorage:", error);
        return [];
    }
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (productId, quantity = 1) => {
  const id = Number(productId);
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }

  saveCart(cart);
};

export const removeFromCart = (productId) => {
    let cart = getCart();
    const item = cart.find(p => p.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(p => p.id !== productId);
    }

    saveCart(cart);
};

export const isInCart = (productId) => {
    const cart = getCart();
    return cart.some(p => p.id === productId);
};

export const getProductQuantity = (productId) => {
    const cart = getCart();
    const item = cart.find(p => p.id === productId);
    return item ? item.quantity : 0;
};

