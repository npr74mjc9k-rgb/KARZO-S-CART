document.addEventListener("DOMContentLoaded", () => {

    const orderNumber =
        document.getElementById("success-order");

    const latestOrder =
        JSON.parse(localStorage.getItem("latestOrder"));

    if(latestOrder){

        orderNumber.textContent =
            latestOrder.id;

    }

});