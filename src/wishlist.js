//Логіка сторінки Wishlist

import { fetchProductsById } from "./js/products-api";
import { renderProducts, renderProductInModal } from "./js/render-function";
import { productsList, notFoundDiv, modal, wishButton, navCount, cartButton, navCountCart } from "./js/constants";
import { getWishlist, addToWishlist, removeFromWishlist, isInWishlist, addToCart, isInCart, removeFromCart, getCart } from "./js/storage";
import { changeTheme } from "./js/helpers";

    
    
// Функція оновлення кількості у навігації
const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

const updateNavCountCart = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  navCountCart.textContent = totalQuantity;
}

// Функція оновлення кнопки Wishlist в модалці
const updateWishlistButton = (productId) => {
  if (isInWishlist(productId)) {
    wishButton.textContent = 'Remove from Wishlist';
  } else {
    wishButton.textContent = 'Add to Wishlist';
  }
};


// Завантажити продукти з wishlist та відрендерити їх
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

// При кліку на продукт відкриваємо модалку
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
    updateCartButton(productId); // make sure to also update cart button

    // --- Wishlist Button Logic ---
    wishButton.onclick = () => {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
      updateWishlistButton(productId);
      updateNavCount();
      loadWishlistProducts();
    };

    // --- Cart Button Logic ---
    cartButton.onclick = () => {
      if (isInCart(productId)) {
        removeFromCart(productId);
      } else {
        addToCart(productId);

        // Remove from wishlist if added to cart
        if (isInWishlist(productId)) {
          removeFromWishlist(productId);
          updateNavCount();
          loadWishlistProducts();
        }
      }

      updateCartButton(productId);
      updateNavCountCart();
    };

  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});

// --- Move helper function outside the listener ---
const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    cartButton.textContent = "Remove from Cart";
  } else {
    cartButton.textContent = "Add to Cart";
  }
};


// Закриття модалки
modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.classList.contains("modal__close-btn")) {
        modal.classList.remove("modal--is-open");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadWishlistProducts();
    updateNavCount(); // оновлення лічильника при завантаженні сторінки
    updateNavCountCart();
});

changeTheme();