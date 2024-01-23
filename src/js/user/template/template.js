export let URLPost = `https://lap-umkm.herokuapp.com/ksi/users/register`
export let URLLogin = `https://lap-umkm.herokuapp.com/ksi/users/login`
export let token = 'token';
export function getTokenFromCookies(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
}