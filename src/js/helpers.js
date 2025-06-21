//Допоміжні функції

import { fetchProducts, fetchProductsByCategory } from './products-api';
import { renderProducts } from './render-function';
import { productsList, loadButton, loader, themeToggle } from './constants';
import iziToast from 'izitoast';


let currentPage = 1;
const limit = 12;
let currentCategory = "All";

export const resetPagination = (newCategory = "All") => {
    currentPage = 1;
    currentCategory = newCategory;
    productsList.innerHTML = '';
};

export const loadMoreProducts = async () => {
    loader.style.display = 'block';
    try {
        currentPage += 1;
        let products;
        if (currentCategory === "All") {
            products = await fetchProducts(currentPage, limit);
        } else {
            products = await fetchProductsByCategory(currentCategory, currentPage, limit);
        }

        if (products.length === 0) {
            loadButton.style.display = 'none';
            iziToast.info({
                title: 'Info',
                message: 'No more products to load.',
                position: 'topRight'
            });
        } else {
            renderProducts(products);
        }
    } catch (error) {
        console.error('Error loading more products:', error);
    } finally {
        loader.style.display = 'none';
    }
};

// theme 
export function changeTheme() {
const savedTheme = localStorage.getItem('theme') || 'light';

document.body.classList.add(`${savedTheme}-theme`);

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
    }
});
}
