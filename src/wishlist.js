//Логіка сторінки Wishlist

import { wishButton } from "./js/constants";


wishButton.addEventListener("click", async (event) => {
    const productItem = event.target.closest("li.products__item");
    if (!productItem) return;

    const productId = productItem.dataset.id;
    if (!productId) return;
})