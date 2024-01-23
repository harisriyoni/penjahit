import {setCookieWithExpireHour} from 'https://jscroot.github.io/cookie/croot.js';

let userToken;

export function getTokenFromAPI() {
    const tokenUrl = "https://lap-umkm.herokuapp.com/ksi/users/login";
    fetch(tokenUrl)
        .then(response => response.json())
        .then(tokenData => {
            if (tokenData) {
                userToken = tokenData;
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

    const data = {
        username: username,
        password: password,
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


function ResponsePostLogin(response) {
    if (response && response.data) {
        // Set the 'Login' cookie with a 2-hour expiry
        setCookieWithExpireHour('login', response.data, 2);

        // Redirect to the dashboard page
        window.location.href = 'https://harisriyoni.github.io/penjahit/public/dashboard.html';

        // Display a success message
        Swal.fire({
            icon: 'success',
            title: 'Masuk Berhasil',
            text: 'Anda telah berhasil masuk!',
        });
    } else {
        // Display an error message
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