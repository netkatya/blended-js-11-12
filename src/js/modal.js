//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist, getCart, addToCart, removeFromCart, isInCart } from './js/storage';
import { navCount, wishButton, productsList, modal, navCountCart, cartButton } from "./js/constants";
import { fetchProductsById } from './js/products-api';
import { renderProductInModal } from './js/render-function';

// Оновлення кількості в навігації wishlist
const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

// Оновлення кількості в навігації cart
const updateNavCountCart = () => {
  const cart = getCart();
  navCountCart.textContent = cart.length;
};

// Функція для оновлення кнопки wishlist в модалці:
const updateWishlistButton = (productId) => {
  if (isInWishlist(productId)) {
    wishButton.textContent = 'Remove from Wishlist';
  } else {
    wishButton.textContent = 'Add to Wishlist';
  }
};

// Функція для оновлення кнопки cart в модалці:
const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    cartButton.textContent = 'Remove from Cart';
  } else {
    cartButton.textContent = 'Add to Cart';
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
// Оновлюємо кнопку Cart:
    updateCartButton(productId);

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
      
      cartButton.onclick = () => {
      if (isInCart(productId)) {
        removeFromCart(productId);
      } else {
        addToCart(productId);
      }
      updateCartButton(productId);
      updateNavCountCart();
    };

  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});



