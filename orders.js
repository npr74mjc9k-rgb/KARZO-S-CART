document.addEventListener("DOMContentLoaded", () => {

    const ordersList =
        document.getElementById("orders-list");

    if (!ordersList) return;

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        ordersList.innerHTML = `
        <div class="empty-orders">

            <i class="fa-solid fa-box-open"></i>

            <h2>No Orders Yet</h2>

            <p>Your completed orders will appear here.</p>

        </div>
        `;

        return;
    }

    ordersList.innerHTML = "";

    orders.forEach(order => {

        let productsHTML = "";

        order.items.forEach(item => {

            productsHTML += `
            <div class="order-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="order-product-image"
                >

                <div class="order-product-info">

                    <span>${item.name}</span>

                    <strong>
                        $${item.price.toLocaleString()}
                    </strong>

                </div>

            </div>
            `;

        });

        ordersList.innerHTML += `

        <div class="order-card">

            <div class="order-top">

                <h3>
                    Order #${order.id}
                </h3>

                <span class="order-status">
                    ${order.status}
                </span>

            </div>

            <p>
                <strong>Date:</strong>
                ${order.date}
            </p>

            <p>
                <strong>Items:</strong>
                ${order.items.length}
            </p>

            <div class="order-products">

                ${productsHTML}

            </div>

            <div class="order-total">

                <span>Total:</span>

                <strong>
                    $${order.total.toLocaleString()}
                </strong>

            </div>

            <button
                class="view-order-btn"
                data-order-id="${order.id}">

                View Order Details

            </button>

        </div>

        `;

    });


    /* ==========================
       VIEW ORDER DETAILS
    ========================== */

    const viewOrderButtons =
        document.querySelectorAll(".view-order-btn");

    viewOrderButtons.forEach(button => {

        button.addEventListener("click", () => {

            const orderId =
                button.dataset.orderId;

            const selectedOrder =
                orders.find(order =>
                    order.id === orderId
                );

            if (!selectedOrder) {

                alert("Order not found.");

                return;

            }

            localStorage.setItem(
                "selectedOrder",
                JSON.stringify(selectedOrder)
            );

            window.location.href =
                "order-details.html";

        });

    });

});