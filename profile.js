document.addEventListener("DOMContentLoaded", () => {

    const name =
        document.getElementById("profile-name");

    const email =
        document.getElementById("profile-email");

    const user =
        JSON.parse(localStorage.getItem("karzosUser"));

    if(user){

        name.textContent =
            user.name;

        email.textContent =
            user.email;

    }

    const editProfile =
        document.getElementById("edit-profile");

    if(editProfile){

        editProfile.addEventListener("click",()=>{

            alert("Profile editing will be added soon.");

        });

    }

    const logout =
        document.getElementById("logout");

    if(logout){

        logout.addEventListener("click",()=>{

            localStorage.removeItem("karzosUser");

            alert("Logged out successfully!");

            window.location.href="login.html";

        });

    }

});