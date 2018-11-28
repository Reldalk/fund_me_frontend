import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

function authUser(user, path){
    return fetch(`${API_BASE_URL}/${path}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
        return res.json()
    })
    .catch(err => {
        return err;
    });
};


export {authUser};