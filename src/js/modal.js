//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlist, getCart, addToCart, removeFromCart, isInCart } from './js/storage';
import { navCount, wishButton, productsList, modal, navCountCart, cartButton } from "./js/constants";
import { fetchProductsById } from './js/products-api';
import { renderProductInModal } from './js/render-function';

// update wishlist navigation
const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

// update cart navigation
const updateNavCountCart = () => {
  const cart = getCart();
  navCountCart.textContent = cart.length;
};

// update wishlist buttom in modal:
const updateWishlistButton = (productId) => {
  if (isInWishlist(productId)) {
    wishButton.textContent = 'Remove from Wishlist';
  } else {
    wishButton.textContent = 'Add to Wishlist';
  }
};

// update cart buttom in modal:
const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    cartButton.textContent = 'Remove from Cart';
  } else {
    cartButton.textContent = 'Add to Cart';
  }
};

// Open modal:
productsList.addEventListener("click", async (event) => {
  const productItem = event.target.closest("li.products__item");
  if (!productItem) return;

  const productId = productItem.dataset.id;
  if (!productId) return;

  try {
    const product = await fetchProductsById(productId);
    renderProductInModal(product);
    modal.classList.add("modal--is-open");

// update Wishlist button:
    updateWishlistButton(productId);
// update Cart button:
    updateCartButton(productId);

// add/remove on click:
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



