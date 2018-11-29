import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

function submitQuery(user, path){
    return fetch(`${API_BASE_URL}/query`, {
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


export {submitQuery};