const kickstarter_data = [
  {'_id' : 1, 'name' : 'goal'},
  {'_id' : 2, 'name' : 'usd_pledged'},
  {'_id' : 3, 'name' : 'backers_count'},
];

const indiegogo_data = [
  {'_id' : 1, 'name' : 'goal'},
  {'_id' : 2, 'name' : 'usd_pledged'}
]

const compare_data = [
  {'_id' : 1, 'name' : 'goal'},
  {'_id' : 2, 'name' : 'usd_pledged'}
]

let setCategory = function(database){
  if(database === 'Kickstarter'){
    return kickstarter_data;
  }
  else if(database === 'Indiegogo')
  {
    return indiegogo_data;
  }
  else if(database === 'Compare')
  {
    return compare_data;
  }
  return [
    {
      '_id' : 0,
      'name': 'Select your filter'
    }
  ]
}

export {setCategory}