//Робота з loacalStorage
import { WISHLIST_KEY, CART_KEY, THEME_KEY } from "./constants";

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
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Cart data corrupted in localStorage:", error);
        return [];
    }
}

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export const addToCart = (productId) => {
    const cart = getCart();
    if (!cart.includes(productId)) {
        cart.push(productId);
        saveCart(cart);
    }
}

export const removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter(id => id !== productId);
  saveCart(cart);
};

export const isInCart = (productId) => {
  const cart = getCart();
  return cart.includes(productId);
};

// theme
