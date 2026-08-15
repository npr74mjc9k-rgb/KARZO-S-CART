/* ==========================
   SUPABASE
========================== */

const SUPABASE_URL =
    "https://efqfljpruddxafhyzvod.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_idVrzmCyqarPHKefeZLg4Q_ntaeSLz6";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* ==========================
   ELEMENTS
========================== */

const loginSection =
    document.getElementById("admin-login");

const dashboard =
    document.getElementById("admin-dashboard");

const loginForm =
    document.getElementById("admin-login-form");

const loginError =
    document.getElementById("login-error");

const loginButton =
    document.getElementById("login-button");

const logoutButton =
    document.getElementById("logout-button");

const ordersList =
    document.getElementById("admin-orders-list");

const totalOrders =
    document.getElementById("total-orders");

const pendingOrders =
    document.getElementById("pending-orders");

const paidOrders =
    document.getElementById("paid-orders");

const totalRevenue =
    document.getElementById("total-revenue");

const refreshButton =
    document.getElementById("refresh-orders");


/* ==========================
   SHOW LOGIN
========================== */

function showLogin() {

    loginSection.style.display = "flex";

    dashboard.style.display = "none";

}


/* ==========================
   SHOW DASHBOARD
========================== */

function showDashboard() {

    loginSection.style.display = "none";

    dashboard.style.display = "block";

    loadOrders();

}


/* ==========================
   CHECK LOGIN
========================== */

async function checkAdminSession() {

    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();

    if (session) {

        showDashboard();

    } else {

        showLogin();

    }

}


/* ==========================
   LOGIN
========================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            loginError.textContent = "";

            loginButton.disabled = true;

            loginButton.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Signing In...`;


            const email =
                document
                    .getElementById("admin-email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("admin-password")
                    .value;


            const {
                error
            } = await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


            if (error) {

                console.error(
                    "Admin login error:",
                    error
                );

                loginError.textContent =
                    "Incorrect email or password.";

                loginButton.disabled = false;

                loginButton.innerHTML =
                    `<i class="fa-solid fa-right-to-bracket"></i> Sign In`;

                return;

            }


            loginButton.disabled = false;

            loginButton.innerHTML =
                `<i class="fa-solid fa-right-to-bracket"></i> Sign In`;

            showDashboard();

        }
    );

}


/* ==========================
   LOGOUT
========================== */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            await supabaseClient.auth.signOut();

            showLogin();

        }
    );

}


/* ==========================
   LOAD ORDERS
========================== */

async function loadOrders() {

    ordersList.innerHTML = `

        <div class="loading-orders">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <p>Loading orders...</p>

        </div>

    `;


    const {
        data,
        error
    } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Supabase orders error:",
            error
        );

        ordersList.innerHTML = `

            <div class="loading-orders">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <p>
                    Unable to load orders.
                </p>

            </div>

        `;

        return;

    }


    displayOrders(data || []);

}


/* ==========================
   DISPLAY ORDERS
========================== */

function displayOrders(orders) {

    totalOrders.textContent =
        orders.length;


    const pending =
        orders.filter(order =>

            String(
                order.payment_status || ""
            )
            .toLowerCase()
            .includes("pending")

        );


    const paid =
        orders.filter(order =>

            String(
                order.payment_status || ""
            )
            .toLowerCase() === "paid"

        );


    const revenue =
        paid.reduce(

            (sum, order) =>

                sum +
                Number(order.total || 0),

            0

        );


    pendingOrders.textContent =
        pending.length;


    paidOrders.textContent =
        paid.length;


    totalRevenue.textContent =
        "₦" +
        revenue.toLocaleString();


    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="loading-orders">

                <i class="fa-solid fa-box-open"></i>

                <p>
                    No orders yet.
                </p>

            </div>

        `;

        return;

    }


    ordersList.innerHTML = "";


    orders.forEach(order => {

        const paymentStatus =
            order.payment_status ||
            "Unknown";


        const statusClass =
            paymentStatus
                .toLowerCase()
                .includes("pending")
                ? "pending"
                : "paid";


        const items =
            Array.isArray(order.items)
                ? order.items
                : [];


        const itemsHTML =
            items
                .map(item => `

                    <div class="admin-order-item">

                        <span>
                            ${item.name || "Product"}
                        </span>

                        <strong>
                            ₦${Number(
                                item.price || 0
                            ).toLocaleString()}
                        </strong>

                    </div>

                `)
                .join("");


        ordersList.innerHTML += `

            <article class="admin-order-card">

                <div class="admin-order-top">

                    <div>

                        <small>
                            ORDER NUMBER
                        </small>

                        <h3>
                            ${order.order_number || "—"}
                        </h3>

                    </div>


                    <span
                        class="payment-status ${statusClass}">

                        ${paymentStatus}

                    </span>

                </div>


                <div class="admin-customer">

                    <div>

                        <small>
                            Customer
                        </small>

                        <strong>
                            ${order.customer_name || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Email
                        </small>

                        <strong>
                            ${order.customer_email || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Phone
                        </small>

                        <strong>
                            ${order.customer_phone || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Address
                        </small>

                        <strong>
                            ${order.customer_address || "—"}
                        </strong>

                    </div>

                </div>


                <div class="admin-products">

                    <h4>
                        Products
                    </h4>

                    ${itemsHTML}

                </div>


                <div class="admin-order-bottom">

                    <div>

                        <small>
                            Payment
                        </small>

                        <strong>
                            ${order.payment_method || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Order Status
                        </small>

                        <strong>
                            ${order.order_status || "—"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Total
                        </small>

                        <strong>
                            ₦${Number(
                                order.total || 0
                            ).toLocaleString()}
                        </strong>

                    </div>

                </div>

            </article>

        `;

    });

}


/* ==========================
   REFRESH
========================== */

if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        loadOrders
    );

}


/* ==========================
   START
========================== */

checkAdminSession();