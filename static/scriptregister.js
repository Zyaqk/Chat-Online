// const registerForm = document.getElementById('register-form');

// registerForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const {login, password, passwordRepeat} = registerForm;
//     if (password.value !== passwordRepeat.value) {
//         return alert('Пароль не совпадают!');
//     }

//     const user = JSON.stringify({
//         login: login.value,
//         password: password.value
//     });

//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/api/register');
//     xhr.send(user);
//     xhr.onload = () => alert(xhr.response);
// })


const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const {login, password} = registerForm;
    const passwordRepeat = document.getElementById('password-repeat'); // Получаем доступ к полю passwordRepeat
    if (password.value !== passwordRepeat.value) {
        return alert('Пароли не совпадают!');
    }

    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register');
    xhr.send(user);
    xhr.onload = () => alert(xhr.response);
});