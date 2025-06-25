import { fetchProductsById } from "./js/products-api";
import { renderProducts, renderProductInModal } from "./js/render-function";
import { productsList, notFoundDiv, modal, cartButton, navCountCart, cartCount, cartPrice, cartSummaryButton, navCount } from "./js/constants";
import { getCart, addToCart, removeFromCart, isInCart, getWishlist, saveCart } from "./js/storage";
import iziToast from "izitoast";
import { changeTheme } from "./js/helpers";

// Оновлюємо лічильник в навігації для Wishlist
const updateNavCount = () => {
  const wishlist = getWishlist();
  navCount.textContent = wishlist.length;
};

// Оновлюємо лічильник в навігації для Cart
const updateNavCountCart = () => {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  navCountCart.textContent = totalCount;
};

// Оновлення тексту кнопки Cart у модальному вікні
const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    cartButton.textContent = 'Remove from Cart';
  } else {
    cartButton.textContent = 'Add to Cart';
  }
};

// Оновлення підсумку по кількості товарів та ціні у кошику
const updatecartSummary = async () => {
  const cart = getCart();

  if (cart.length === 0) {
    cartCount.textContent = "0";
    cartPrice.textContent = "$0.00";
    return;
  }

  const validCartItems = cart.filter(item => typeof item.id !== 'undefined');

  if (validCartItems.length === 0) {
    cartCount.textContent = "0";
    cartPrice.textContent = "$0.00";
    return;
  }

  try {
    const products = await Promise.all(validCartItems.map(item => fetchProductsById(item.id)));
    const totalCount = validCartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    const totalPrice = products.reduce((sum, product) => {
      const matchingItems = validCartItems.filter(i => i.id === product.id);
      const quantity = matchingItems.reduce((qSum, i) => qSum + i.quantity, 0);
      return sum + product.price * quantity;
    }, 0);
    cartPrice.textContent = `$${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.error('Помилка при оновленні підсумку кошика:', error);
    cartCount.textContent = "0";
    cartPrice.textContent = "$0.00";
  }
};

// Завантаження та відображення товарів з кошика
const loadCartProducts = async () => {
  const cart = getCart();

  if (cart.length === 0) {
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
    return;
  }

  // filtre valid id
  const validCartItems = cart.filter(item => typeof item.id !== 'undefined');

  if (validCartItems.length === 0) {
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
    return;
  }

  try {
    const products = await Promise.all(validCartItems.map(item => fetchProductsById(item.id)));
    const productsWithQuantity = products.map(product => {
      const cartItem = validCartItems.find(i => i.id === product.id);
      return { ...product, quantity: cartItem ? cartItem.quantity : 1 };
    });

    notFoundDiv.classList.remove('not-found--visible');
    renderProducts(productsWithQuantity);

    const quantityElements = document.querySelectorAll(".product-quantity-product");
    quantityElements.forEach(el => el.classList.remove("hidden"));
  } catch (error) {
    console.error('Помилка при завантаженні продуктів кошика:', error);
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
  }
};


// open modal
productsList.addEventListener("click", async (event) => {
    const target = event.target;

    if (target.classList.contains('quantity-button')) {
    return; // Просто виходимо з обробника
  }

  const productItem = target.closest("li.products__item");
  if (!productItem) return;

  const productId = Number(productItem.dataset.id);
  if (!productId) return;

  try {
    const product = await fetchProductsById(productId);
    renderProductInModal(product);
    modal.classList.add("modal--is-open");

    updateCartButton(productId);

    cartButton.onclick = async () => {
      if (isInCart(productId)) {
        removeFromCart(productId);
      } else {
        addToCart(productId);
      }
      updateCartButton(productId);
      updateNavCountCart();
      await loadCartProducts();
      await updatecartSummary();
    };
  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});

// buy button
cartSummaryButton.addEventListener('click', async () => {
  const cart = getCart();

  if (cart.length === 0) {
    iziToast.warning({
      title: 'Oops!',
      message: 'Your cart is empty!',
      position: "topLeft"
    });
    return;
  }

  iziToast.success({
    title: 'Success!',
    message: 'Products purchased successfully!',
    position: "topLeft"
  });

  localStorage.removeItem('cart'); // Очищуємо корзину
  await loadCartProducts();
  updateNavCountCart();
  await updatecartSummary();
});

// close modal
modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.classList.contains("modal__close-btn")) {
    modal.classList.remove("modal--is-open");
  }
});

// first load page
document.addEventListener('DOMContentLoaded', () => {
  loadCartProducts();
  updateNavCountCart();
  updateNavCount();
  updatecartSummary();
  changeTheme();
});

document.addEventListener("click", async (event) => {
  const plusBtn = event.target.closest(".plus-button");
  const minusBtn = event.target.closest(".minus-button");

  if (plusBtn || minusBtn) {
    const productDiv = event.target.closest(".product");

    if (!productDiv) return;

    const productId = productDiv.dataset.id;
    if (!productId) return;

const input = productDiv.querySelector(".quantity-input");
if (!input) return;

let quantity = parseInt(input.value, 10) || 0;

if (plusBtn) {
  quantity += 1;
} else if (minusBtn && quantity > 0) {
  quantity -= 1;
}

input.value = quantity;

    if (quantity > 0) {
      updateCartItem(productId, quantity);
    } else {
      removeFromCart(productId);
     
    }

    // Refresh cart after quantity change
    
    await updatecartSummary();
    updateNavCountCart();
  }
});

export const updateCartItem = (productId, quantity) => {
  const id = Number(productId); // ⬅ Normalize to number
  let cart = getCart();
  const itemIndex = cart.findIndex(p => Number(p.id) === id);

  if (itemIndex !== -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else {
      cart.splice(itemIndex, 1);
    }
  } else if (quantity > 0) {
    cart.push({ id, quantity });
  }

  saveCart(cart);
};