document.addEventListener("DOMContentLoaded",()=>{

    const loginForm =
        document.getElementById("login-form");

    const password =
        document.getElementById("password");

    const toggle =
        document.getElementById("toggle-password");

    /* Show / Hide Password */

    if(toggle){

        toggle.addEventListener("click",()=>{

            if(password.type==="password"){

                password.type="text";
                toggle.classList.replace("fa-eye","fa-eye-slash");

            }else{

                password.type="password";
                toggle.classList.replace("fa-eye-slash","fa-eye");

            }

        });

    }

    /* Login */

    if(loginForm){

        loginForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const userPassword =
                password.value.trim();

            const savedUser =
                JSON.parse(localStorage.getItem("karzosUser"));

            if(!savedUser){

                alert("No account found. Please register first.");

                return;

            }

            if(
                email===savedUser.email &&
                userPassword===savedUser.password
            ){

                alert("✅ Login Successful!");

                window.location.href="index.html";

            }else{

                alert("❌ Incorrect email or password.");

            }

        });

    }

});