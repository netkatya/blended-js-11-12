//Логіка сторінки Home

import { fetchCategories, fetchProducts, fetchProductsByCategory, fetchProductsById, searchProducts } from "./js/products-api";
import { renderCategories, renderProducts, renderProductInModal } from "./js/render-function";
import { categoriesList, productsList, notFoundDiv, modal, searchForm, searchInput, categoryButtons, clearSearchBtn, wishButton, navCount } from "./js/constants";
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist } from './js/storage';

let currentPage = 1;
const limit = 12;

// Оновлення кількості в навігації
const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

// Функція для оновлення кнопки в модалці:
const updateWishlistButton = (productId) => {
  if (isInWishlist(productId)) {
    wishButton.textContent = 'Remove from Wishlist';
  } else {
    wishButton.textContent = 'Add to Wishlist';
  }
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const categories = await fetchCategories();
        renderCategories(categories);

        const products = await fetchProducts(currentPage, limit);
        renderProducts(products);

        updateNavCount(); // Показати кількість в wishlist при завантаженні
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

categoryButtons().forEach(btn => {
    btn.classList.remove("categories__btn--active");
});

categoriesList.addEventListener("click", async (event) => {
    const button = event.target.closest("button.categories__btn");
    if (!button) return;

    const category = button.textContent.trim();

    categoryButtons().forEach(btn => btn.classList.remove("categories__btn--active"));
    button.classList.add("categories__btn--active");

    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    try {
        const products = category === "All"
            ? await fetchProducts(currentPage, limit)
            : await fetchProductsByCategory(category, currentPage, limit);

        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
        }
    } catch (error) {
        console.error('Помилка при завантаженні продуктів:', error);
        notFoundDiv.classList.add('not-found--visible');
        productsList.innerHTML = '';
    }
});

productsList.addEventListener("click", async (event) => {
    const productItem = event.target.closest("li.products__item");
    if (!productItem) return;

    const productId = productItem.dataset.id;
    if (!productId) return;

    try {
        const product = await fetchProductsById(productId);
        renderProductInModal(product);
        modal.classList.add("modal--is-open");

        updateWishlistButton(productId);

        // Додаємо логіку кліку на wishlist кнопку у модалці:
        wishButton.onclick = () => {
            if (isInWishlist(productId)) {
                removeFromWishlist(productId);
            } else {
                addToWishlist(productId);
            }
            updateWishlistButton(productId);
            updateNavCount();
        };

    } catch (error) {
        console.error('Помилка при завантаженні продукту:', error);
    }
});

modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.classList.contains("modal__close-btn")) {
        modal.classList.remove("modal--is-open");
    }
});

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const products = await searchProducts(query, currentPage, limit);
        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
        }
    } catch (error) {
        console.error('Помилка при завантаженні продуктів:', error);
        notFoundDiv.classList.add('not-found--visible');
        productsList.innerHTML = '';
    }
});

searchInput.addEventListener('input', () => {
    clearSearchBtn.classList.toggle('hidden', searchInput.value.trim() === '');
});

clearSearchBtn.addEventListener("click", async () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    try {
        const products = await fetchProducts(currentPage, limit);
        renderProducts(products);
    } catch (error) {
        console.error('Помилка при завантаженні всіх продуктів:', error);
        productsList.innerHTML = '';
        notFoundDiv.classList.add('not-found--visible');
    }
});
