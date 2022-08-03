const baseURL = 'https://fakestoreapi.com';

const postLogin = async () => {
    return fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({// using hard coded values in order to get a token from the API
            username: 'mor_2314',
            password: '83r5^_'
        })
    }).then(res => res.json());
}

const LoginService = {
    postLogin
};

export default LoginService;