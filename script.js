document.addEventListener("DOMContentLoaded", function () {
  load_cart_items();

  theme_preference();

  categoryFilter_localstorage();
});

// active
function navActive() {
  let first_li = document.querySelector("nav ul li");
  let li = document.querySelectorAll("nav ul li");
  let liIcon = document.querySelectorAll("nav ul li div i");

  first_li.classList.add("active");

  li.forEach((li) => {
    li.addEventListener("click", function () {
      let divIcon = li.querySelector("div i");

      let inputsearch = document.querySelectorAll(".search input");
      let noproducts = document.querySelector("#no-products");

      let ul_li = li.parentElement.querySelectorAll("li");

      noproducts.style.display = "none";

      inputsearch.forEach((input) => {
        input.value = "";
      });

      ul_li.forEach((li) => {
        li.classList.remove("active");
      });

      liIcon.forEach((icon) => {
        icon.classList.remove("iconactive");
      });

      li.classList.add("active");

      divIcon.classList.add("iconactive");

      const selectedCategory = li.textContent.trim();

      localStorage.setItem("nav", selectedCategory);

      categoryFilter(selectedCategory);
    });
  });
}

navActive();

// category
function categoryFilter(selectedCategory) {
  let allProducts = document.querySelectorAll(".product");
  let productContainer = document.querySelector(".products");
  let loaderContainer = document.querySelector(".loader-container");

  loaderContainer.style.display = "block";
  productContainer.classList.add("filterproducts");

  allProducts.forEach((product) => {
    product.style.display = "none";
  });

  setTimeout(() => {
    if (selectedCategory === "all") {
      allProducts.forEach((product) => {
        product.style.display = "block";
      });

      productContainer.classList.remove("filterproducts");
    } else {
      allProducts.forEach((product) => {
        let productCategory = product
          .getAttribute("data-category")
          .toLowerCase();

        if (selectedCategory === productCategory) {
          product.style.display = "block";
        }
      });
    }

    loaderContainer.style.display = "none";
  }, 700);
}

//rating
function ratings() {
  let selectAllStars = document.querySelectorAll(".star");

  selectAllStars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-value");
      const product = star.closest(".product");
      const stars = product.querySelectorAll(
        ".product-price-rating .ratings .star"
      );
      const firstStar = stars[0];

      if (rating === "1") {
        // Check if the first star is selected and no other stars are selected
        const isFirstStarSelected = firstStar.classList.contains("selected");
        const areOtherStarsUnselected = Array.from(stars)
          .slice(1)
          .every((s) => !s.classList.contains("selected"));

        if (isFirstStarSelected && areOtherStarsUnselected) {
          firstStar.classList.remove("selected");
          return;
        }
      }

      stars.forEach((s) => s.classList.remove("selected"));

      // Add selected class up to the clicked star
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });
}

ratings();

// toggle
function themetoggle() {
  let toggle_icon = document.querySelector("#theme-toggle img");
  let body = document.body;

  toggle_icon.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    let theme_preference = body.classList.contains("dark-mode");

    localStorage.setItem("theme", theme_preference ? "dark" : "light");

    toggle_icon.style.transform = "scale(1.2)";
    toggle_icon.style.opacity = "0";

    setTimeout(() => {
      if (theme_preference) {
        toggle_icon.src = "moon.png";
      } else {
        toggle_icon.src = "contrast.png";
      }

      toggle_icon.style.transform = "scale(1)";
      toggle_icon.style.opacity = "1";
    }, 300);
  });
}

themetoggle();

// search filter
function searchfilter() {
  let productContainer = document.querySelector(".products");
  let noProducts = document.querySelector("#no-products");
  let inputSearch = document.querySelectorAll(".search input");
  let products = document.querySelectorAll(".product");
  let loaderContainer = document.querySelector(".loader-container");

  let firstLi = document.querySelector("nav ul li");
  let firstIcon = firstLi.querySelector("div i");
  let li = document.querySelectorAll("nav ul li");
  let liIcon = document.querySelectorAll("nav ul li div i");

  inputSearch.forEach((search) => {
    search.addEventListener("input", function () {
      loaderContainer.style.display = "block";
      noProducts.style.display = "none";
      productContainer.classList.add("filterproducts");

      products.forEach((product) => {
        product.style.display = "none";
      });

      const filter = this.value.toLowerCase().trim();

      let visibleCount = 0;

      setTimeout(() => {
        if (filter === "") {
          products.forEach((product) => {
            product.style.display = "block";
            productContainer.classList.remove("filterproducts");
          });

          li.forEach((li) => {
            li.classList.remove("active");
          });

          liIcon.forEach((icon) => {
            icon.classList.remove("iconactive");
          });

          firstLi.classList.add("active");

          firstIcon.classList.add("iconactive");
        } else {
          products.forEach((product) => {
            let title = product
              .querySelector(".product-title h2")
              .textContent.toLowerCase()
              .trim();

            if (title.includes(filter)) {
              product.style.display = "block";
              productContainer.classList.add("filterproducts");
              visibleCount++;
            } else {
              product.style.display = "none";
            }
          });

          if (visibleCount === 0) {
            noProducts.style.display = "block";
          } else {
            noProducts.style.display = "none";
          }
        }

        loaderContainer.style.display = "none";
      }, 700);
    });
  });
}

searchfilter();

// nav open close
function nav_open_close() {
  let main_list = document.querySelector(".main-list");
  let list = document.querySelector(".main-list .list");
  let blur = document.querySelector(".main-list .blur");
  let bar = document.querySelector(".bar i");

  bar.addEventListener("click", function () {
    main_list.style.display="flex";
    setTimeout(()=>{
      list.style.marginLeft="0px";
    },50);
  });

  blur.addEventListener("click", function () {
    list.style.marginLeft="-300px";
    setTimeout(()=>{
      main_list.style.display="none";
    },200);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      list.style.marginLeft="-300px";
      setTimeout(()=>{
        main_list.style.display="none";
      },200);
    }
  });
}

nav_open_close();

// cart open close
function cartopen_close() {
  let main_cart = document.querySelector(".main-cartcontainer");
  let cart_container = document.querySelector(".main-cartcontainer .cart-container");
  let main_cart_blur = document.querySelector(".main-cartcontainer .cart-blur");
  let open = document.querySelector(".cart");
  let cart_close = document.querySelector(
    "  .cart-container .cart-title .close-cart i"
  );

  open.addEventListener("click", function () {
    // nav_cart(main_cart, "100", "100");
    main_cart.style.display="flex";
    setTimeout(()=>{
      cart_container.style.marginRight="0px";
    },50);
  });

  main_cart_blur.addEventListener("click", function () {
    cart_container.style.marginRight="-350px";
    setTimeout(()=>{
      main_cart.style.display="none";
    },300);
  });

  cart_close.addEventListener("click", function () {
    cart_container.style.marginRight="-480px";
    setTimeout(()=>{
      main_cart.style.display="none";
    },300);
    
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      cart_container.style.marginRight="-350px";
      setTimeout(()=>{
        main_cart.style.display="none";
      },200);
    }
  });
}

cartopen_close();

// set height,width for nav and cart
// function nav_cart(element, height, width) {
//   element.style.width = `${width}vw`;
//   element.style.height = `${height}vh`;
// }

//adding product to cart
let product_count = document.querySelector("#product-count");

function addproduct_tocart() {
  let btn = document.querySelectorAll(".add button");

  btn.forEach((button) => {
    button.addEventListener("click", function () {
      let cart_container = document.querySelector(".cart-container");
      let product = this.closest(".product");
      let imageSrc = product.querySelector("img").src;
      let title = product.querySelector(".product-title h2").textContent;
      let price = product.querySelector(".price").textContent.trim();
      let selectedRating = product.querySelectorAll(
        ".ratings .star.selected"
      ).length;

      button.classList.add("clicked");

      setTimeout(() => {
        this.innerHTML = `<span>Add <i class="fas fa-check-circle" style="font-size: 16px; margin-left: 3px;"></i></span>`;
        button.classList.remove("clicked");
      }, 400);

      // Create a cart item element

      let cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <div class="cart-image">
          <img src="${imageSrc}" alt="${title}">
          <div class="cart-rating">
            <span class="rating-value">&#9733;</span> ${selectedRating} / 5
          </div>
        </div>
        <div class="cart-details">
          <h4>${title}</h4>
          <div class="cart-price">
            <span class="price">${price}</span>
          </div>
          <div class="quantity-container">
            <input type="number" value="1" min="1" class="quantity-input">
            <span class="total-price">${price}</span>
          </div>
          <button class="delete-item">
            <i class="fas fa-trash-alt"></i>
          </button> 
        </div>
      `;

      let addProductToCart = cart_container.querySelector(".cart-products");

      // Adding product to cart
      addProductToCart.appendChild(cartItem);

      product_count.textContent = document.querySelectorAll(
        ".cart-products .cart-item"
      ).length;

      updateCartMessage();

      // creating custom property for keep tracking of original and cart products
      product.cartItemReference = cartItem;

      // Disable the "Add to Cart" button for the added product
      button.disabled = true;

      // Select the quantity input and total price span
      let quantityInput = cartItem.querySelector(".quantity-input");
      let priceSpan = cartItem.querySelector(".price");
      let totalPriceSpan = cartItem.querySelector(".total-price");

      quantityInput.addEventListener("change", function () {
        updateTotalPrice(quantityInput, priceSpan, totalPriceSpan);
      });

      // Handle the cart item deletion
      // let cartItem = document.createElement('div'); passing parameter to deletecartproduct function

      let remove_element = cartItem.querySelector(".delete-item");

      remove_element.addEventListener("click", function () {
        deleteCartProduct(cartItem, button);
      });

      updateCartTotal();

      updateLocalStorage();

      product_count.textContent = document.querySelectorAll(
        ".cart-products .cart-item"
      ).length;

      addRatingEventListeners();
    });
  });
}

addproduct_tocart();

// delete product
function deleteCartProduct(cartItem, button) {
  // if (confirm(`Are you sure to remove item?`)) {

  cartItem.style.transform = "translateX(100%)";

  setTimeout(() => {
    cartItem.remove(); // Remove the cart item

    updateCartTotal();

    updateLocalStorage();

    // Decrease the cart counter correctly
    product_count.textContent = document.querySelectorAll(
      ".cart-products .cart-item"
    ).length;

    // Enable the "Add to Cart" button again
    button.disabled = false;
    button.innerHTML = `<span>add <i class="fa-solid fa-cart-shopping"></i></span>`;

    updateCartMessage();

    // deleteing the product rating
    let product_ratingRemove = button
      .closest(".product")
      .querySelectorAll(".ratings .star.selected");

    product_ratingRemove.forEach((rating) => {
      rating.classList.remove("selected");
    });
  }, 500);
}

// set localstorage
function updateLocalStorage() {
  let cartItems = [];
  let cart_container = document.querySelector(".cart-container");
  let select_cartitem = cart_container.querySelectorAll(
    ".cart-products .cart-item"
  );

  select_cartitem.forEach((cartItem) => {
    let cart_rating = cartItem.querySelector(".cart-rating");
    let ratingContent = cart_rating.textContent
      .replace(cart_rating.querySelector(".rating-value").textContent, "")
      .trim();
    let ratingValue = ratingContent.split("/")[0];

    let item = {
      imageSrc: cartItem.querySelector(".cart-image img").src,
      title: cartItem.querySelector(".cart-details h4").textContent,
      price: cartItem.querySelector(".cart-price .price").textContent.trim(),
      quantity: cartItem.querySelector(".quantity-input").value,
      selectedRating: ratingValue,
    };

    cartItems.push(item);
  });

  localStorage.setItem("cart_products", JSON.stringify(cartItems));
}

// function to update cart empty msg
function updateCartMessage() {
  let empty_msg = document.querySelector(".cart-container .emptymsg ");
  let cart_products = document.querySelector(".cart-container .cart-products");
  let cart_total = document.querySelector(".cart-container .cart-total");
  let btn = document.querySelector(".clear button");

  if (cart_products.children.length === 0) {
    empty_msg.style.display = "flex";
    cart_total.style.display = "none";
    btn.style.display = "none";
  } else {
    if (cart_products.children.length > 1) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }

    empty_msg.style.display = "none";
    cart_total.style.display = "block";
  }
}

// Function to update the total price of all cart items
function updateCartTotal() {
  let total = 0;

  let cartItem = document.querySelectorAll(".cart-item");

  cartItem.forEach((item) => {
    // used regulae expression inside replace  /  delimiter /
    let itemTotal = parseFloat(
      item.querySelector(".total-price").textContent.replace(/₹|,/g, "").trim()
    );

    total += itemTotal;
  });

  let display_totalamt = document.querySelector(".total-amount");

  display_totalamt.textContent = "₹ " + total.toLocaleString();
}

// Function to update the total price based on quantity
function updateTotalPrice(quantityInput, priceSpan, totalPriceSpan) {
  // used regulae expression inside replace /  delimiter /
  let price = parseFloat(priceSpan.textContent.replace(/₹|,/g, "").trim());

  let quantity = parseInt(quantityInput.value);

  let total = price * quantity;
  totalPriceSpan.textContent = "₹ " + total.toLocaleString();

  updateCartTotal();

  updateLocalStorage();
}

// open expand
function openExpand() {
  let selectAllImage = document.querySelectorAll(".product .image img");
  let expand_container = document.querySelector(".expand-container");
  let close_expnad = document.querySelector(".close-expand i");
  let body = document.querySelector("body");
  let expand_imgcont = document.querySelector(
    ".expand-img-container .expand-image img"
  );
  let expand_imgdetails = document.querySelector(".expand-imgdetails p");
  let sampleimgs = document.querySelector(
    ".expand-container .expand-productdetails .expand-imgdetails .sampleimgs"
  );
  let expand_productDetails=document.querySelector(".expand-container .expand-productdetails");

  selectAllImage.forEach((img) => {
    img.addEventListener("click", function () {
      sampleimgs.innerHTML = "";

      expand_container.style.display = "flex";
      body.style.overflow = "hidden";

      setTimeout(()=>{
        expand_productDetails.style.transform="translateY(0%)";

      },200);

      let storeImgSrc = img.src;
      expand_imgcont.src = storeImgSrc;

      let imgDetail = img
        .closest(".product")
        .querySelector(".productdetails p").textContent;
      expand_imgdetails.textContent = imgDetail;

      let suggest_img = img
        .closest(".product")
        .querySelectorAll(".productdetails .productimages .sampleimage img");

      suggest_img.forEach((img) => {
        let storeSrc = img.src;

        let newElement = document.createElement("div");

        newElement.classList.add("sampleimage");

        newElement.innerHTML = `<img src="${storeSrc}" alt="">`;

        sampleimgs.appendChild(newElement);

        let changeImg = newElement.querySelector("img");

        let first_suggestImg = changeImg
          .closest(".sampleimgs")
          .querySelector(".sampleimage img");

        first_suggestImg.classList.add("sampleactive");

        changeImg.addEventListener("click", function () {
          expand_imgcont.src = this.src;

          let selectingAllSampleImg = changeImg
            .closest(".sampleimgs")
            .querySelectorAll(".sampleimage img");

          selectingAllSampleImg.forEach((img) => {
            img.classList.remove("sampleactive");
          });

          changeImg.classList.add("sampleactive");
        });
      });
    });
  });

  close_expnad.addEventListener("click", function () {
    expand_container.style.display = "none";
    body.style.overflow = "";
    expand_productDetails.style.transform="translateY(-200%)";

  });
}

openExpand();

// clear cart
function clearCart() {
  let clearbtn = document.querySelector(".clear button");

  let empty_msg = document.querySelector(".cart-container .emptymsg ");
  let cart_total = document.querySelector(".cart-container .cart-total");

  clearbtn.addEventListener("click", function () {
    let cartItems = document.querySelectorAll(".cart-products .cart-item");

    if (confirm("Are You Sure to clear Cart ")) {
      if (cartItems.length > 0) {
        cartItems.forEach((cartItem) => {
          cartItem.remove();
        });

        product_count.textContent = document.querySelectorAll(
          ".cart-products .cart-item"
        ).length;

        updateCartTotal();

        updateLocalStorage();

        empty_msg.style.display = "none";

        cart_total.style.display = "none";

        clearbtn.style.display = "none";

        let allBtn = document.querySelectorAll(".add button");

        allBtn.forEach((button) => {
          button.disabled = false;
          button.innerHTML =
            '<span>add <i class="fa-solid fa-cart-shopping"></i></span>';
        });

        let selectAllStars = document.querySelectorAll(".star");

        selectAllStars.forEach((s) => s.classList.remove("selected"));

        // Show loader
        let loaderContainer = document.querySelector(".loader-container2");

        setTimeout(() => {
          loaderContainer.style.display = "flex";
        }, 50);

        setTimeout(() => {
          loaderContainer.style.display = "none";
          empty_msg.style.display = "flex";
        }, 750);
      }
    }
  });
}

clearCart();

// Call local storage data when page reloads

function categoryFilter_localstorage() {
  const liElements = document.querySelectorAll("nav ul li");

  let savedCategory = localStorage.getItem("nav");

  if (savedCategory) {
    liElements.forEach((li) => {
      let divIcon = li.querySelector("div i");

      if (li.textContent.trim() === savedCategory) {
        li.classList.add("active");

        divIcon.classList.add("iconactive");
      } else {
        li.classList.remove("active");

        divIcon.classList.remove("iconactive");
      }
    });

    categoryFilter(savedCategory);
  } else {
    liElements[0].classList.add("active");
    categoryFilter("all");
  }
}

function theme_preference() {
  let selected_theme = localStorage.getItem("theme");

  if (selected_theme === "dark") {
    let toggle_icon = document.querySelector("#theme-toggle img");
    let body = document.body;
    body.classList.add("dark-mode");
    toggle_icon.src = "moon.png";
  }
}

function load_cart_items() {
  let storedCartProducts =
    JSON.parse(localStorage.getItem("cart_products")) || [];

  storedCartProducts.forEach((item) => {
    renderCartItem(item);
  });

  updateCartMessage();

  product_count.textContent = document.querySelectorAll(
    ".cart-products .cart-item"
  ).length;

  addRatingEventListeners();
}

function renderCartItem(item) {
  let cartContainer = document.querySelector(".cart-container .cart-products");
  let product = document
    .querySelector(`.product img[src="${item.imageSrc}"]`)
    .closest(".product");

  let cartItem = document.createElement("div");

  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
    <div class="cart-image">
      <img src="${item.imageSrc}" alt="${item.title}">
      <div class="cart-rating">
        <span class="rating-value">&#9733;</span> ${item.selectedRating}/5
      </div>
    </div>
    <div class="cart-details">
      <h4>${item.title}</h4>
      <div class="cart-price">
        <span class="price">${item.price}</span>
      </div>
      <div class="quantity-container">
        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
        <span class="total-price">${item.price}</span>
      </div>
      <button class="delete-item">
        <i class="fas fa-trash-alt"></i>
      </button> 
    </div>
  `;

  cartContainer.appendChild(cartItem);

  // Set the reference from the product to the cart item
  product.cartItemReference = cartItem;

  updateCartLoadRating(item.imageSrc, item.selectedRating);

  let productButton = document
    .querySelector(`.product img[src="${item.imageSrc}"]`)
    .closest(".product")
    .querySelector(".add button");
  productButton.disabled = true;
  productButton.innerHTML = `<span>Add <i class="fas fa-check-circle" style="font-size: 16px; margin-left: 3px;"></i></span>`;

  updateCartMessage();

  let quantityInput = cartItem.querySelector(".quantity-input");
  let priceSpan = cartItem.querySelector(".price");
  let totalPriceSpan = cartItem.querySelector(".total-price");

  updateTotalPrice(quantityInput, priceSpan, totalPriceSpan);

  quantityInput.addEventListener("change", function () {
    updateTotalPrice(quantityInput, priceSpan, totalPriceSpan);
  });

  let removeElement = cartItem.querySelector(".delete-item");

  removeElement.addEventListener("click", function () {
    // if (confirm('Are you sure to remove the item?')) {
    cartItem.style.transform = "translateX(100%)";

    setTimeout(() => {
      cartItem.remove();

      product_count.textContent = document.querySelectorAll(
        ".cart-products .cart-item"
      ).length;

      updateLocalStorage();

      updateCartTotal();

      updateCartMessage();

      productButton.disabled = false;
      productButton.innerHTML = `<span>add <i class="fa-solid fa-cart-shopping"></i></span>`;

      updateCartLoadRating(item.imageSrc, item.selectedRating);

      deleteCartLoadRating(item.imageSrc, item.selectedRating);
    }, 500);

    // }
  });

  updateCartTotal();
}

function updateCartLoadRating(img, rating) {
  let productImage = document.querySelector(`.product img[src="${img}"]`);

  if (productImage) {
    let product = productImage.closest(".product");
    let stars = product.querySelectorAll(".ratings .star");

    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }
}

function deleteCartLoadRating(img, rating) {
  let productImage = document.querySelector(`.product img[src="${img}"]`);

  if (productImage) {
    let product = productImage.closest(".product");
    let stars = product.querySelectorAll(".ratings .star");

    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.remove("selected");
      }
    });
  }
}

function addRatingEventListeners() {
  let stars = document.querySelectorAll(".ratings .star");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      let product = this.closest(".product");

      let selectedRating = product.querySelectorAll(
        ".ratings .star.selected"
      ).length;

      if (product.cartItemReference) {
        let cartItem = product.cartItemReference;
        let reference = cartItem.querySelector(".cart-rating");
        reference.innerHTML = `<span class="rating-value">&#9733;</span> ${selectedRating} / 5`;

        updateLocalStorage();
      }
    });
  });
}
