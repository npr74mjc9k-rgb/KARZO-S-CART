document.addEventListener("DOMContentLoaded", () => {

    const ordersList =
        document.getElementById("orders-list");


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
            (order.status === "Paid"
                ? "Confirmed"
                : "Pending");


        const statusClass =
            paymentStatus
                .toLowerCase()
                .includes("pending")
                ? "pending"
                : "confirmed";


        const itemsHTML =
            (order.items || [])
            .map(item => `

                <div class="order-item">

                    <span>
                        ${item.name}
                    </span>

                    <strong>
                        ₦${Number(item.price).toLocaleString()}
                    </strong>

                </div>

            `)
            .join("");


        ordersList.innerHTML += `

            <article class="order-card">

                <div class="order-top">

                    <div>

                        <span class="order-label">
                            ORDER NUMBER
                        </span>

                        <h2>
                            ${order.id}
                        </h2>

                    </div>


                    <span class="order-status ${statusClass}">

                        ${
                            statusClass === "pending"
                            ? "Pending Verification"
                            : "Confirmed"
                        }

                    </span>

                </div>


                <div class="order-details">

                    <div>

                        <small>Date</small>

                        <strong>
                            ${order.date || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>Payment Method</small>

                        <strong>
                            ${paymentMethod}
                        </strong>

                    </div>


                    <div>

                        <small>Payment Status</small>

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

                    <span>
                        Order Total
                    </span>

                    <strong>
                        ₦${Number(order.total).toLocaleString()}
                    </strong>

                </div>

            </article>

        `;

    });

});