//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist } from './js/storage';
import { navCount, wishButton, productsList, modal } from "./js/constants";
import { fetchProductsById } from './js/products-api';
import { renderProductInModal } from './js/render-function';

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

// При відкритті модалки:
productsList.addEventListener("click", async (event) => {
  const productItem = event.target.closest("li.products__item");
  if (!productItem) return;

  const productId = productItem.dataset.id;
  if (!productId) return;

  try {
    const product = await fetchProductsById(productId);
    renderProductInModal(product);
    modal.classList.add("modal--is-open");

    // Оновлюємо кнопку Wishlist:
    updateWishlistButton(productId);

    // Логіка додавання/видалення при кліку:
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