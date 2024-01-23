export function GetDataForm() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;

    const data = {
        username: username,
        password: password,
        role: role
    };
    return data;
}

export function PostLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        username: username,
        password: password,
    };
    return data;
}

export function AlertPost() {
    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
    }).then(() => {
        window.location.href = "login.html";
    });
}

export function ResponseLogin(result) {
    if (result.status) {
        Swal.fire({
            icon: "success",
            title: "Login Successful",
        }).then(() => {
            window.location.href = 'dashboard.html';
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: "Username atau Password Tidak Ditemukan",
        });
    }
}


export function ResponsePost(result) {
    AlertPost(result);
}