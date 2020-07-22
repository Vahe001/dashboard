import axios from "axios";
import config from "../../config/config";

async function login(idToken) {
    const { data } = await axios(config.URLS.login, {
        method: 'post',
        data: { googleToken: idToken },
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const { user, token } = data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
}


export {
    login
}