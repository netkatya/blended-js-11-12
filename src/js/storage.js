//Робота з loacalStorage
import { WISHLIST_KEY } from "./js/constants";

export const detWishList = () => {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveWishList = (wishlist) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export const addToWishlist = (productId) => {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishList(wishlist);
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