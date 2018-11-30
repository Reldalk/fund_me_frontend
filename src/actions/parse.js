'use strict';
let parse = function(data, data_value){
  const key = Object.keys(data);
  const length = data[key].length;
  let object = [];
  for(let i = 0; i < length; i++){
    object.push( { x : i+1, y: Number(data[key][i][data_value]), name: data[key][i].name, url: data[key][i].url || null} )
  }
  return object;
}

export {parse};