import {API_BASE_URL} from '../config';
import {parse} from './parse'

function fetch_database(database_value, extra_query, data_value){
  if(database_value !== 'Compare'){
    console.log(API_BASE_URL +'/'+ database_value + "?value=" + extra_query + '&data_value=' + data_value)
    return fetch(API_BASE_URL +'/'+ database_value + "?value=" + extra_query + '&data_value=' + data_value)
    .then(res => res.json()
    )
    .then(repos => {
      return parse(repos, data_value)
    })
    .then(array => {
      return array;
    })
  }
}

export {fetch_database};