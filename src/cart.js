//Логіка сторінки Cart
import { fetchProductsById } from "./js/products-api";
import { renderProducts, renderProductInModal } from "./js/render-function";
import { productsList, notFoundDiv, modal, cartButton, navCountCart, cartCount, cartPrice, cartSummaryButton } from "./js/constants";
import { getCart, addToCart, removeFromCart, isInCart } from "./js/storage";
import iziToast from "izitoast";
import { changeTheme } from "./js/helpers";
    
    
// Функція оновлення кількості у навігації
const updateNavCountCart = () => {
  const cart = getCart();
  navCountCart.textContent = cart.length;
};

// Функція оновлення кнопки Cart в модалці
const updateCartButton = (productId) => {
  if (isInCart(productId)) {
    cartButton.textContent = 'Remove from Cart';
  } else {
    cartButton.textContent = 'Add to Cart';
  }
};


// Оновлення Total Items та Total Price
const updatecartSummary = async () => {
    const cart = getCart();


    if (cart.length === 0) {
        cartCount.textContent = "0";
        cartPrice.textContent = "$0.00";
        return;
    }
    
    try {
        const productPromises = cart.map(id => fetchProductsById(id));
        const products = await Promise.all(productPromises);

        cartCount.textContent = products.length;

        const total = products.reduce((sum, product) => sum + (product.price || 0), 0);
            
        cartPrice.textContent = `$${total.toFixed(2)}`;
    } catch (error) {
    console.error('Помилка при підрахунку Total:', error);
    cartCount.textContent = '0';
    cartPrice.textContent = '$0.00';
  }
}


// Завантажити продукти з cart та відрендерити їх
const loadCartProducts = async () => {
  const cart = getCart();

  if (cart.length === 0) {
    notFoundDiv.classList.add('not-found--visible');
    productsList.innerHTML = '';
    return;
  }

  try {
    const productPromises = cart.map(id => fetchProductsById(id));
    const products = await Promise.all(productPromises);

    notFoundDiv.classList.remove('not-found--visible');
    renderProducts(products);
  } catch (error) {
    console.error('Помилка при завантаженні cart:', error);
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

    updateCartButton(productId);

    // Логіка додавання/видалення до Wishlist
    cartButton.onclick = () => {
      if (isInCart(productId)) {
        removeFromCart(productId);
      } else {
        addToCart(productId);
      }
        updateCartButton(productId);
        updateNavCountCart();
        loadCartProducts(); // Оновлюємо список на сторінці Wishlist після видалення
        updatecartSummary();
    };

  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});

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

  localStorage.removeItem('cart'); // очищаємо cart
  await loadCartProducts();
  updateNavCountCart();
  await updatecartSummary();
});

// Закриття модалки
modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.classList.contains("modal__close-btn")) {
    modal.classList.remove("modal--is-open");
  }
});


document.addEventListener('DOMContentLoaded', () => {
    loadCartProducts();
    updateNavCountCart(); // оновлення лічильника при завантаженні сторінки
    updatecartSummary(); 
});

changeTheme();