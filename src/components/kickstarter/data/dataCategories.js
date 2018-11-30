const kickstarter_data = [
  {'_id' : 1, 'value' : 'backers_count', 'name': 'Total Backers'},
  {'_id' : 2, 'value' : 'goal', 'name' :'Goal'},
  {'_id' : 3, 'value' : 'usd_pledged', 'name': 'USD Pledged'},
];

const indiegogo_data = [
  {'_id' : 1, 'value' : 'goal', 'name':'Goal'},
  {'_id' : 2, 'value' : 'usd_pledged', 'name': 'USD Pledged'}
]

const compare_data = [
  {'_id' : 1, 'name' : 'goal'},
  {'_id' : 2, 'name' : 'usd_pledged'}
]

const dict_names = {
  'backers_count' : 'Total Backers: ',
  'goal' : 'Project Goal: ',
  'usd_pledged' : 'Total USD Pledged: '
}

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

export {setCategory, dict_names}