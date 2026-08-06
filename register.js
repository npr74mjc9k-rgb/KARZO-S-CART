document.addEventListener("DOMContentLoaded", () => {

    const password = document.getElementById("password");
    const toggle = document.getElementById("toggle-password");
    const registerForm = document.getElementById("register-form");

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

    /* Register */

    if(registerForm){

        registerForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const user={

                name:document.getElementById("fullname").value.trim(),

                email:document.getElementById("email").value.trim(),

                password:password.value.trim()

            };

            localStorage.setItem(
                "karzosUser",
                JSON.stringify(user)
            );

            alert("🎉 Account created successfully!");

            registerForm.reset();

        });

    }

});