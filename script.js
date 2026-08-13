document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       PRODUCTS
    ========================== */

    const products = [

    {
        id:1,
        name:"Rolex Submariner",
        category:"Luxury Watches",
        price:12500000,
        rating:"★★★★★",
        image:"rolex.jpg",
        description:"A timeless luxury watch crafted with precision and premium materials."
    },

    {
        id:2,
        name:"iPhone 17 Pro",
        category:"Electronics",
        price:1800000,
        rating:"★★★★★",
        image:"iPhone.jpg",
        description:"Apple's newest flagship smartphone with incredible performance."
    },

    {
        id:3,
        name:"MacBook Air",
        category:"Electronics",
        price:2100000,
        rating:"★★★★★",
        image:"macbook.jpg",
        description:"Ultra-light laptop built for creators and professionals."
    },

    {
        id:4,
        name:"AirPods Pro",
        category:"Electronics",
        price:450000,
        rating:"★★★★☆",
        image:"airpods.jpg",
        description:"Premium wireless earbuds with immersive sound."
    },

    {
        id:5,
        name:"Nike Air Max",
        category:"Fashion",
        price:280000,
        rating:"★★★★☆",
        image:"nike.jpg",
        description:"Comfortable sneakers with iconic Nike style."
    },

    {
        id:6,
        name:"TAG Heuer Carrera",
        category:"Luxury Watches",
        price:4500000,
        rating:"★★★★★",
        image:"tagheuer.jpg",
        description:"Swiss craftsmanship with timeless elegance."
    }

];



    /* ==========================
       VARIABLES
    ========================== */

    const productGrid = document.getElementById("product-grid");
    const searchInput = document.getElementById("search-input");

    const cartIcon = document.querySelector(".cart-icon");
    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const placeOrder =
    document.getElementById("place-order");
  
    const productModal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalCategory = document.getElementById("modal-category");
    const modalName = document.getElementById("modal-name");
    const modalRating = document.getElementById("modal-rating");
    const modalPrice = document.getElementById("modal-price");
    const modalDescription = document.getElementById("modal-description");
    const modalCart = document.getElementById("modal-cart");
    const closeModal = document.getElementById("close-modal");

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  const sideMenu =
    document.getElementById("side-menu");

const closeMenu =
    document.getElementById("close-menu");

const menuOverlay =
    document.getElementById("menu-overlay");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
      /* ==========================
       DISPLAY PRODUCTS
    ========================== */

    function displayProducts(productArray){

        productGrid.innerHTML = "";

        productArray.forEach(product=>{

            productGrid.innerHTML += `

            <article class="product-card" data-id="${product.id}">

                <button class="product-wishlist">

                    <i class="fa-regular fa-heart"></i>

                </button>

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>

                <div class="product-details">

                    <span class="product-category">

                        ${product.category}

                    </span>

                    <h3>${product.name}</h3>

                    <div class="product-rating">

                        ${product.rating}

                    </div>

                    <div class="product-price">

                        ₦${product.price.toLocaleString()}

                    </div>

                    <button
                        class="add-cart"
                        data-id="${product.id}">

                        Add To Cart

                    </button>

                </div>

            </article>

            `;

        });

        attachButtons();

    }



    /* ==========================
       PRODUCT MODAL
    ========================== */

    function openProductModal(product){

        modalImage.src = product.image;

        modalImage.alt = product.name;

        modalCategory.textContent = product.category;

        modalName.textContent = product.name;

        modalRating.textContent = product.rating;

        modalPrice.textContent =
            "₦" + product.price.toLocaleString();

        modalDescription.textContent =
            product.description;

        productModal.classList.add("active");

        document.body.style.overflow = "hidden";

        modalCart.onclick = ()=>{

            addToCart(product.id);

        };

    }

    function closeProductModal(){

        productModal.classList.remove("active");

        document.body.style.overflow = "";

    }



    /* ==========================
       SEARCH
    ========================== */

    if(searchInput){

        searchInput.addEventListener("input",()=>{

            const value =
                searchInput.value.toLowerCase();

            const filtered = products.filter(product=>{

                return(

                    product.name
                    .toLowerCase()
                    .includes(value)

                    ||

                    product.category
                    .toLowerCase()
                    .includes(value)

                );

            });

            displayProducts(filtered);

        });

    }
      /* ==========================
       BUTTONS & EVENTS
    ========================== */

    function attachButtons(){

        /* Wishlist */

document
.querySelectorAll(".product-wishlist")
.forEach(button=>{

    button.onclick=(event)=>{

        event.stopPropagation();

        const card =
            button.closest(".product-card");

        const id =
            Number(card.dataset.id);

        const product =
            products.find(item=>item.id===id);

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const exists =
            wishlist.some(item=>item.id===id);

        const icon =
            button.querySelector("i");

        if(exists){

            wishlist =
                wishlist.filter(item=>item.id!==id);

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }else{

            wishlist.push(product);

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
      console.log(wishlist);

alert("Wishlist saved: " + wishlist.length + " item(s)");

    };

});


        /* Add To Cart */

        document
        .querySelectorAll(".add-cart")
        .forEach(button=>{

            button.onclick=(event)=>{

                event.stopPropagation();

                addToCart(
                    Number(button.dataset.id)
                );

            };

        });


        /* Product Card Click */

        document
        .querySelectorAll(".product-card")
        .forEach(card=>{

            card.onclick=()=>{

                const id =
                    Number(card.dataset.id);

                const product =
                    products.find(
                        item=>item.id===id
                    );

                if(product){

                    openProductModal(product);

                }

            };

        });

    }



    /* ==========================
       ADD TO CART
    ========================== */

    function addToCart(id){

        const product =
            products.find(
                item=>item.id===id
            );

        if(!product) return;

        cart.push(product);

        updateCart();

        openCart();

    }



    /* ==========================
       CART
    ========================== */

    function openCart(){

        cartPanel.classList.add("active");

        cartOverlay.classList.add("active");

        document.body.style.overflow="hidden";

    }

    function closeCartPanel(){

        cartPanel.classList.remove("active");

        cartOverlay.classList.remove("active");

        document.body.style.overflow="";

    }



    function updateCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    cartItems.innerHTML="";

        let total=0;

        if(cart.length===0){

            cartItems.innerHTML=`
                <div class="empty-cart">

                    <h3>Your cart is empty</h3>

                    <p>Add some premium products.</p>

                </div>
            `;

        }

        cart.forEach((item,index)=>{

            total+=item.price;

            cartItems.innerHTML+=`

                <div class="cart-product">

                    <div>

                        <h4>${item.name}</h4>

                        <strong>

                            ₦${item.price.toLocaleString()}

                        </strong>

                    </div>

                    <button
                        class="remove-cart"
                        data-index="${index}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;

        });

        cartTotal.textContent =
            "₦"+total.toLocaleString();
      /* ==========================
   UPDATE CHECKOUT
========================== */

if(checkoutItems){

    checkoutItems.innerHTML = "";

    if(cart.length===0){

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

    }else{

        cart.forEach(item=>{

            checkoutItems.innerHTML += `

                <div class="checkout-product">

                    <span>${item.name}</span>

                    <strong>

                        ₦${item.price.toLocaleString()}

                    </strong>

                </div>

            `;

        });

    }

}

if(checkoutTotal){

    checkoutTotal.textContent =
        "₦"+total.toLocaleString();

}

        updateCartCount();

        attachRemoveButtons();

    }



    function attachRemoveButtons(){

        document
        .querySelectorAll(".remove-cart")
        .forEach(button=>{

            button.onclick=()=>{

                cart.splice(
                    Number(button.dataset.index),
                    1
                );

                updateCart();

            };

        });

    }



    function updateCartCount(){

        const badge =
            document.querySelector(".cart-count");

        if(badge){

            badge.textContent =
                cart.length;

        }

    }



    /* ==========================
       EVENTS
    ========================== */

    cartIcon.onclick=openCart;

    closeCart.onclick=closeCartPanel;

    cartOverlay.onclick=closeCartPanel;

    closeModal.onclick=closeProductModal;

    productModal.onclick=(event)=>{

        if(event.target===productModal){

            closeProductModal();

        }

    };

  /* ==========================
   SIDE MENU
========================== */

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        sideMenu.classList.add("active");

        menuOverlay.classList.add("active");

    });

}

if(closeMenu){

    closeMenu.addEventListener("click",()=>{

        sideMenu.classList.remove("active");

        menuOverlay.classList.remove("active");

    });

}

if(menuOverlay){

    menuOverlay.addEventListener("click",()=>{

        sideMenu.classList.remove("active");

        menuOverlay.classList.remove("active");

    });

}
if(sideMenu){

    sideMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            sideMenu.classList.remove("active");

            if(menuOverlay){
                menuOverlay.classList.remove("active");
            }

        });

    });

}

/* ==========================
   CATEGORY FILTERS
========================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category =
            button.dataset.category;

        if(category==="All"){

            displayProducts(products);

            return;

        }

        const filtered =
            products.filter(product=>{

                return product.category===category;

            });

        displayProducts(filtered);

    });

});
  /* ==========================
   SORT PRODUCTS
========================== */

const sortProducts =
    document.getElementById("sort-products");

if(sortProducts){

    sortProducts.addEventListener("change",()=>{

        let sorted = [...products];

        switch(sortProducts.value){

            case "low":

                sorted.sort((a,b)=>a.price-b.price);

                break;

            case "high":

                sorted.sort((a,b)=>b.price-a.price);

                break;

            case "rating":

                sorted.sort((a,b)=>
                    b.rating.length-a.rating.length
                );

                break;

            default:

                sorted=[...products];

        }

        displayProducts(sorted);

    });

}
  /* ==========================
   PLACE ORDER — PAYSTACK
========================== */

if(placeOrder){

    placeOrder.addEventListener("click", (event) => {

    event.preventDefault();

        const name =
            document.getElementById("customer-name").value.trim();

        const email =
            document.getElementById("customer-email").value.trim();

        const phone =
            document.getElementById("customer-phone").value.trim();

        const address =
            document.getElementById("customer-address").value.trim();


        /* CHECK CART */

        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }


        /* CHECK CUSTOMER INFORMATION */

        if(
            !name ||
            !email ||
            !phone ||
            !address
        ){

            alert("Please complete all required fields.");

            return;

        }


        /* CALCULATE TOTAL */

        const total =
            cart.reduce(
                (sum, item) => sum + item.price,
                0
            );


        /*
           Paystack uses the smallest
           currency unit.

           ₦1 = 100 Kobo
        */

        const amountInKobo =
            total * 100;


        /* GENERATE ORDER NUMBER */

        const orderNumber =
            "KC" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        /* OPEN PAYSTACK */

        const paystack = new Paystack();


        paystack.newTransaction({

            key: "pk_test_488ff59df0a36af01cc88bc63d52f138f18479e2",

            email: email,

            amount: amountInKobo,

            currency: "NGN",

            reference: orderNumber,

            firstName: name,

            phone: phone,

            metadata: {

                customer_name: name,

                phone: phone,

                address: address,

                products: cart.map(item => item.name)

            },


            onSuccess: (transaction) => {

                console.log(
                    "Payment successful:",
                    transaction
                );


                /* GET EXISTING ORDERS */

                const orders =
                    JSON.parse(
                        localStorage.getItem("orders")
                    ) || [];


                /* CREATE ORDER */

                const newOrder = {

                    id: orderNumber,

                    paymentReference:
                        transaction.reference,

                    date:
                        new Date().toLocaleDateString(),

                    status: "Paid",

                    customer: {

                        name: name,

                        email: email,

                        phone: phone,

                        address: address

                    },

                    items: [...cart],

                    total: total

                };


                /* SAVE ORDER */

                orders.push(newOrder);


                localStorage.setItem(
                    "orders",
                    JSON.stringify(orders)
                );


                localStorage.setItem(
                    "latestOrder",
                    JSON.stringify(newOrder)
                );


                /* CLEAR CART */

                cart = [];

                localStorage.removeItem("cart");


                /* GO TO SUCCESS PAGE */

                window.location.href =
                    "success.html";

            },


            onCancel: () => {

                alert(
                    "Payment was cancelled."
                );

            },


            onError: (error) => {

                console.error(
                    "Paystack error:",
                    error
                );

                alert(
                    "Payment could not be completed. Please try again."
                );

            }

        });

    });

}
  /* ==========================
   DARK MODE
========================== */

const darkToggle =
    document.getElementById("dark-toggle");

const savedTheme =
    localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

}

if(darkToggle){

    darkToggle.addEventListener("click",(e)=>{

        e.preventDefault();

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

        }else{

            localStorage.setItem("theme","light");

        }

    });

}
  /* ==========================
   NAVBAR WISHLIST
========================== */

const navHeart = document.getElementById("nav-heart");

if(navHeart){

    navHeart.addEventListener("click",()=>{

        navHeart.classList.toggle("fa-solid");
        navHeart.classList.toggle("fa-regular");

        navHeart.classList.toggle("liked");

    });

}
/* ==========================
   BANK TRANSFER PAYMENT
========================== */

const bankTransferBtn =
    document.getElementById("bank-transfer-btn");

const copyAccountBtn =
    document.getElementById("copy-account");


/* COPY ACCOUNT NUMBER */

if(copyAccountBtn){

    copyAccountBtn.addEventListener("click", async () => {

        const accountNumber =
            document
            .getElementById("account-number")
            .textContent
            .trim();

        try{

            await navigator.clipboard.writeText(accountNumber);

            copyAccountBtn.textContent = "Copied!";

            setTimeout(() => {

                copyAccountBtn.textContent = "Copy";

            }, 2000);

        }catch(error){

            alert("Unable to copy account number.");

        }

    });

}


/* I'VE MADE THE TRANSFER */

if(bankTransferBtn){

    bankTransferBtn.addEventListener("click", () => {

        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }


        const name =
            document
            .getElementById("customer-name")
            .value
            .trim();

        const email =
            document
            .getElementById("customer-email")
            .value
            .trim();

        const phone =
            document
            .getElementById("customer-phone")
            .value
            .trim();

        const address =
            document
            .getElementById("customer-address")
            .value
            .trim();


        if(!name || !email || !phone || !address){

            alert(
                "Please complete your shipping information first."
            );

            return;

        }


        const total =
            cart.reduce(
                (sum, item) => sum + item.price,
                0
            );


        const orderNumber =
            "KC" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        const orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        const newOrder = {

            id: orderNumber,

            paymentMethod: "Bank Transfer",

            paymentStatus: "Pending Verification",

            date:
                new Date().toLocaleDateString(),

            status:
                "Awaiting Payment Verification",

            customer: {

                name: name,

                email: email,

                phone: phone,

                address: address

            },

            items: [...cart],

            total: total

        };


        orders.push(newOrder);


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        localStorage.setItem(
            "latestOrder",
            JSON.stringify(newOrder)
        );


        cart = [];

        localStorage.removeItem("cart");


        window.location.href =
            "success.html";

    });

}
    /* ==========================
       START APP
    ========================== */

    displayProducts(products);

    updateCart();

});
