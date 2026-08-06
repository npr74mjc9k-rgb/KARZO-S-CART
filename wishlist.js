const wishlistItems =
document.getElementById("wishlist-items");

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

function displayWishlist(){

    if(wishlist.length===0){

        wishlistItems.innerHTML=`

        <div class="empty-wishlist">

            <i class="fa-regular fa-heart"></i>

            <h2>Your wishlist is empty</h2>

            <p>Save your favorite products and they'll appear here.</p>

        </div>

        `;

        return;
    }

    wishlistItems.innerHTML="";

    wishlist.forEach((product,index)=>{

        wishlistItems.innerHTML+=`

        <div class="wishlist-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>$${product.price.toLocaleString()}</p>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>

        </div>

        `;

    });

    document.querySelectorAll(".remove-btn").forEach(button=>{

        button.onclick=()=>{

            wishlist.splice(button.dataset.index,1);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            displayWishlist();

        };

    });

}

displayWishlist();