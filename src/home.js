//Логіка сторінки Home

import { fetchCategories, fetchProducts, fetchProductsByCategory, fetchProductsById, searchProducts, fetchTotalProductsCount } from "./js/products-api";
import { renderCategories, renderProducts, renderProductInModal } from "./js/render-function";
import { categoriesList, productsList, notFoundDiv, modal, searchForm, searchInput, categoryButtons, clearSearchBtn, wishButton, navCount, cartButton, navCountCart, loader, loadButton, paginationContainer, } from "./js/constants";
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist, getCart, addToCart, removeFromCart, isInCart } from './js/storage';
import { resetPagination, initPagination, loadProductsByPage, changeTheme } from "./js/helpers";

changeTheme();

let currentPage = 1;
const limit = 12;

const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

const updateNavCountCart = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  navCountCart.textContent = totalQuantity;
};

const updateWishlistButton = (productId) => {
  wishButton.textContent = isInWishlist(productId) ? 'Remove from Wishlist' : 'Add to Wishlist';
};

const updateCartButton = (productId) => {
  cartButton.textContent = isInCart(productId) ? 'Remove from Cart' : 'Add to Cart';
};

document.addEventListener("DOMContentLoaded", async () => {
    loader.style.display = 'block';
    try {
        const categories = await fetchCategories();
        renderCategories(categories);

        const products = await fetchProducts(currentPage, limit);
        renderProducts(products);

        updateNavCount();
        updateNavCountCart();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        loader.style.display = 'none';
    }
});

categoriesList.addEventListener("click", async (event) => {
    const button = event.target.closest("button.categories__btn");
    if (!button) return;

    loader.style.display = 'block';

    const category = button.textContent.trim();
    resetPagination(category);

    categoryButtons().forEach(btn => btn.classList.remove("categories__btn--active"));
    button.classList.add("categories__btn--active");

    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    try {
        let products;
        if (category === "All") {
            products = await fetchProducts(1, limit);
        } else {
            products = await fetchProductsByCategory(category, 1, limit);
        }

        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
            paginationContainer.style.display = 'none';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
            // paginationContainer.style.display = 'flex';
            if (productCartQuantity) {
                productCartQuantity.style.display = "none";
            }
        }
    } catch (error) {
        console.error('Error loading category:', error);
    } finally {
        loader.style.display = 'none';
    }
});

productsList.addEventListener("click", async (event) => {
    const target = event.target;

    const productItem = target.closest("li.products__item");
    if (!productItem) return;

    const productId = productItem.dataset.id;
    if (!productId) return;

    loader.style.display = 'block';

    try {
        const product = await fetchProductsById(productId);
        renderProductInModal(product);
        modal.classList.add("modal--is-open");

        updateWishlistButton(productId);
        updateCartButton(productId);

        wishButton.onclick = () => {
            isInWishlist(productId) ? removeFromWishlist(productId) : addToWishlist(productId);
            updateWishlistButton(productId);
            updateNavCount();
        };

        cartButton.onclick = () => {
            isInCart(productId) ? removeFromCart(productId) : addToCart(productId);
            updateCartButton(productId);
            updateNavCountCart();
        };

    } catch (error) {
        console.error('Error loading product:', error);
    } finally {
        loader.style.display = 'none';
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

    loader.style.display = 'block';

    try {
        const products = await searchProducts(query, currentPage, limit);
        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
            loadButton.style.display = 'none';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
            

        }
    } catch (error) {
        console.error('Error searching products:', error);
        notFoundDiv.classList.add('not-found--visible');
        productsList.innerHTML = '';
    } finally {
        loader.style.display = 'none';
    }
});

searchInput.addEventListener('input', () => {
    clearSearchBtn.classList.toggle('hidden', searchInput.value.trim() === '');
});

clearSearchBtn.addEventListener("click", async () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    loader.style.display = 'block';

    try {
        const products = await fetchProducts(1, limit);
        renderProducts(products);
        loadButton.style.display = 'block';
    } catch (error) {
        console.error('Error loading all products:', error);
        productsList.innerHTML = '';
        notFoundDiv.classList.add('not-found--visible');
    } finally {
        loader.style.display = 'none';
    }
});

// Load More button
// loadButton.addEventListener('click', loadMoreProducts);




const scrollUpButton = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUpButton.classList.remove('hidden');
    } else {
        scrollUpButton.classList.add('hidden');
    }
});

scrollUpButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});




document.addEventListener('DOMContentLoaded', async () => {
    resetPagination();
    changeTheme();

    // Get total items count for pagination
    const totalItems = await fetchTotalProductsCount(); // implement this based on your API
    initPagination(totalItems);

    // Load first page
    loadProductsByPage(1);
});


changeTheme();