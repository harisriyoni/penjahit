import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

let userToken;

//token api
export function getTokenFromAPI() {
    const tokenUrl = "https://lap-umkm.herokuapp.com/ksi/users/login";
    fetch(tokenUrl)
        .then(response => response.json())
        .then(tokenData => {
            if (tokenData.token) {
                userToken = tokenData.token;
                console.log('Token dari API:', userToken);
            }
        })
        .catch(error => console.error('Gagal mengambil token:', error));
}

//get data 
export function GetDataForm() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;

    const data = {
        username: username,
        password: password,
        role: role
    };
    return data
}

// post login
export function PostLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const data = {
        username: username,
        password: password,
        role: role
    };
    return data;
}

// alert post 
export function AlertPost(value) {
    Swal.fire({
        icon: 'success',
        title: 'Daftar Berhasil',
        text: 'Anda telah berhasil daftar!',
    });
    window.location.href = "login.html"
}

function validateLogin(callback) {
    // Implement your login validation logic here
    // Make asynchronous API calls if needed

    // Example: Simulating asynchronous behavior
    setTimeout(() => {
        const isValid = true; // Replace with your actual validation logic
        callback(isValid);
    }, 1000); // Simulating a delay of 1 second
}

// response post login
function ResponsePostLogin(response) {
    if (response && response.token) {
        setCookieWithExpireHour('Login', response.token, 2);
        window.location.href = 'https://pakarbi.vaidiq.cloud/pages/dashboard.html';
        Swal.fire({
            icon: 'success',
            title: 'Masuk Berhasil',
            text: 'Anda telah berhasil masuk!',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: 'NPM atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}

// handle login
export function HandleLogin() {
    // Assuming you have a function to validate the login credentials.
    const isValidLogin = validateLogin(ResponsePostLogin);

    if (isValidLogin) {
        // Set npm and nama based on your login logic.
        username = document.getElementById("username").value;

        // You can also redirect the user to the dashboard here.
        window.location.href = 'https://harisriyoni.github.io/penjahit/public/dashboard.html';
    } else {
        // Handle invalid login
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: 'Username atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}

export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
    ResponsePostLogin(result)
}