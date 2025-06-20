//Константи

export const STORAGE_KEYS = {};
export const WISHLIST_KEY = 'wishlist';


export const categoriesList = document.querySelector('ul.categories');
export const categoryButtons = () => categoriesList.querySelectorAll("button.categories__btn");
export const productsList = document.querySelector('ul.products');
export const notFoundDiv = document.querySelector('div.not-found');
export const modal = document.querySelector('.modal');
export const modalProduct = document.querySelector('.modal-product');
export const searchForm = document.querySelector(".search-form");
export const searchInput = document.querySelector(".search-form__input");
export const clearSearchBtn = document.querySelector(".search-form__btn-clear");
export const wishButton = document.querySelector(".modal-product__btn--wishlist");
export const navCount = document.querySelector("[data-wishlist-count]");