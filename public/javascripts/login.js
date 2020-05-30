"use strict";
print = console.log;

let alF = () => {alert('Account created now login');}

let link = document.querySelector('#change_form a');

link.addEventListener('click', (e) =>{

    e.preventDefault();
    let button = document.querySelector('#button');

    if (link.innerHTML === 'Signup'){
        let cp = document.querySelector('.txt_field');

        let clon = cp.cloneNode(true);

        let input = clon.children[0];
        let label = clon.children[2];

        input.name = "email";
        input.type = "email";
        label.innerHTML = "Email";

        cp.before(clon);

        link.innerHTML = "Login";
        button.innerHTML = "Signup";

    }

    else{

        let cp = document.querySelector('.txt_field');
        cp.remove();

        link.innerHTML = "Signup";
        button.innerHTML = "Login";

    }


    

});
