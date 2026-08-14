document.addEventListener("DOMContentLoaded", () => {

    const ordersList =
        document.getElementById("orders-list");


    /* ==========================
       DARK MODE
    ========================== */

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    /* ==========================
       GET ORDERS
    ========================== */

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    /* ==========================
       EMPTY ORDERS
    ========================== */

    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <div class="empty-icon">

                    <i class="fa-solid fa-box-open"></i>

                </div>

                <h2>No Orders Yet</h2>

                <p>
                    You haven't placed any orders yet.
                    Start shopping to see your orders here.
                </p>

                <a href="index.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;

    }


    /* ==========================
       DISPLAY ORDERS
    ========================== */

    ordersList.innerHTML = "";


    [...orders].reverse().forEach(order => {

        const paymentMethod =
            order.paymentMethod || "Paystack";


        const paymentStatus =
            order.paymentStatus ||
            (
                order.status === "Paid"
                    ? "Confirmed"
                    : "Pending"
            );


        const statusClass =
            paymentStatus
                .toLowerCase()
                .includes("pending")
                ? "pending"
                : "confirmed";


        /* ==========================
           PRODUCTS
        ========================== */

        const itemsHTML =
            (order.items || [])
            .map(item => `

                <div class="order-item">

                    <div class="order-item-name">

                        ${item.name}

                    </div>

                    <div class="order-item-price">

                        ₦${Number(item.price).toLocaleString()}

                    </div>

                </div>

            `)
            .join("");


        /* ==========================
           ORDER CARD
        ========================== */

        ordersList.innerHTML += `

            <article class="order-card">

                <div class="order-top">

                    <div>

                        <span class="order-label">

                            ORDER NUMBER

                        </span>

                        <h2>

                            ${order.id || "—"}

                        </h2>

                        <span class="order-date">

                            ${order.date || "—"}

                        </span>

                    </div>


                    <span class="order-status ${statusClass}">

                        <i class="fa-solid fa-circle"></i>

                        ${
                            statusClass === "pending"
                            ? "Pending Verification"
                            : "Confirmed"
                        }

                    </span>

                </div>


                <div class="order-details">

                    <div>

                        <small>

                            Payment Method

                        </small>

                        <strong>

                            ${paymentMethod}

                        </strong>

                    </div>


                    <div>

                        <small>

                            Payment Status

                        </small>

                        <strong>

                            ${paymentStatus}

                        </strong>

                    </div>

                </div>


                <div class="order-products">

                    <h3>

                        Products

                    </h3>

                    ${itemsHTML}

                </div>


                <div class="order-bottom">

                    <div>

                        <span class="order-total-label">

                            Order Total

                        </span>

                    </div>

                    <strong class="order-total">

                        ₦${Number(order.total || 0).toLocaleString()}

                    </strong>

                </div>

            </article>

        `;

    });

});