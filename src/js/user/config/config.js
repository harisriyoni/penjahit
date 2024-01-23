import {
    setCookieWithExpireHour
} from 'https://jscroot.github.io/cookie/croot.js';

//token api
export function getTokenFromAPI() {
    const tokenUrl = "http://127.0.0.1:8080/ksi/users/login";
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

// post login
export function PostLogin() {
    const npm = document.getElementById("username").value;
    const passwordhash = document.getElementById("password").value;


    const data = {
        npm: npm,
        passwordhash: passwordhash,
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
        setCookieWithExpireHour('login', response.token, 2);
        window.location.href = 'https://harisriyoni.github.io/penjahit/public/dashboard.html';
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

        // Call the function to get user data after a successful login.
        GetUserDataByNPMAndName();

        // You can also redirect the user to the dashboard here.
        window.location.href = 'https://harisriyoni.github.io/penjahit/public/dashboard.html';
    } else {
        // Handle invalid login
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: 'NPM atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}

export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
    ResponsePostLogin(result)
}