//Константи

export const STORAGE_KEYS = {};
export const WISHLIST_KEY = 'wishlist';
export const CART_KEY = 'cart';
export const THEME_KEY = 'theme';


export const categoriesList = document.querySelector('ul.categories');
export const categoryButtons = () => categoriesList.querySelectorAll("button.categories__btn");
export const productsList = document.querySelector('ul.products');
export const loadButton = document.querySelector(".load-more")
export const notFoundDiv = document.querySelector('div.not-found');
export const modal = document.querySelector('.modal');
export const modalProduct = document.querySelector('.modal-product');
export const searchForm = document.querySelector(".search-form");
export const searchInput = document.querySelector(".search-form__input");
export const clearSearchBtn = document.querySelector(".search-form__btn-clear");
export const wishButton = document.querySelector(".modal-product__btn--wishlist");
export const navCount = document.querySelector("[data-wishlist-count]");
export const cartButton = document.querySelector(".modal-product__btn--cart");
export const navCountCart = document.querySelector("[data-cart-count]");
export const cartCount = document.querySelector("[data-count]");
export const cartPrice = document.querySelector("[data-price]");
export const cartSummaryButton = document.querySelector(".cart-summary__btn");
export const loader = document.querySelector('.loader');
export const themeToggle = document.querySelector(".theme-toggle");
export const minusButton = document.querySelector(".minus-button");
export const plusButton = document.querySelector(".plus-button");
export const quantityInput = document.querySelector(".quantity-input");
export const paginationContainer = document.querySelector(".tui-pagination") 