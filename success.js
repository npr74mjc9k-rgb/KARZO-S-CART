document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       GET LATEST ORDER
    ========================== */

    const latestOrder =
        JSON.parse(
            localStorage.getItem("latestOrder")
        );


    /* ==========================
       ELEMENTS
    ========================== */

    const successIcon =
        document.getElementById("success-icon");

    const successStatus =
        document.getElementById("success-status");

    const successTitle =
        document.getElementById("success-title");

    const successMessage =
        document.getElementById("success-message");

    const successOrder =
        document.getElementById("success-order");

    const paymentStatus =
        document.getElementById("payment-status");

    const paymentMethod =
        document.getElementById("payment-method");


    /* ==========================
       NO ORDER FOUND
    ========================== */

    if(!latestOrder){

        successStatus.textContent =
            "ORDER STATUS";

        successTitle.textContent =
            "No Recent Order Found";

        successMessage.textContent =
            "We couldn't find a recent order on this device.";

        successOrder.textContent =
            "—";

        paymentStatus.textContent =
            "Unknown";

        paymentMethod.textContent =
            "Unknown";

        return;

    }


    /* ==========================
       ORDER NUMBER
    ========================== */

    successOrder.textContent =
        latestOrder.id || "KC000000";


    /* ==========================
       BANK TRANSFER
    ========================== */

    if(
        latestOrder.paymentMethod ===
        "Bank Transfer"
    ){

        /* ICON */

        successIcon.innerHTML =
            `<i class="fa-solid fa-clock"></i>`;


        /* STATUS */

        successStatus.textContent =
            "PAYMENT PENDING VERIFICATION";


        /* TITLE */

        successTitle.textContent =
            "Order Received!";


        /* MESSAGE */

        successMessage.textContent =
            "We've received your order. Your bank transfer is pending verification. Your order will be confirmed once the payment has been verified.";


        /* PAYMENT STATUS */

        paymentStatus.textContent =
            "Pending Verification";


        /* PAYMENT METHOD */

        paymentMethod.textContent =
            "Bank Transfer";
            successIcon.style.background = "#fff7ed";

successIcon.querySelector("i").style.color = "#f59e0b";

paymentStatus.style.color = "#f59e0b";


    }else{


        /* ==========================
           PAYSTACK / PAID ORDER
        ========================== */

        successIcon.innerHTML =
            `<i class="fa-solid fa-circle-check"></i>`;


        successStatus.textContent =
            "ORDER CONFIRMED";


        successTitle.textContent =
            "Thank You For Your Purchase!";


        successMessage.textContent =
            "Your payment has been confirmed and your order has been placed successfully. We'll notify you once it has been shipped.";


        paymentStatus.textContent =
            "Confirmed";


        paymentMethod.textContent =
            "Paystack";

    }

});