//Логіка сторінки Wishlist

import { fetchProductsById } from "./js/products-api";
import { renderProducts } from "./js/render-function";
import { productsList, notFoundDiv } from "./js/constants";

const WISHLIST_KEY = 'wishlist';

const getWishlist = () => {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

const loadWishlistProducts = async () => {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
    return;
  }

  try {
    const productPromises = wishlist.map(id => fetchProductsById(id));
    const products = await Promise.all(productPromises);

    notFoundDiv.classList.remove('not-found--visible');
    renderProducts(products);
  } catch (error) {
    console.error('Помилка при завантаженні wishlist:', error);
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
  }
};

document.addEventListener('DOMContentLoaded', loadWishlistProducts);


