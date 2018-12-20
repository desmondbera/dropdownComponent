console.log('FilterList.js module being executed.');

let resultsToShow = [];

let filteredItems = [];
let arrOfCountyId = [];
let arrOfStateId = [];
let arrOfRegionId = [];



function getStates(items, currentItem) {
  for(let b = 0; b < items.length; b++) {
    if(items[b]['parent'] === parseInt(currentItem)) {
      resultsToShow.push(items[b]);
      getCounties(items, items[b]['id'])
    }
  }
}

function getCounties(items, stateParentId) {
  for(let c = 0; c < items.length; c++) {
    if(items[c]['parent'] === parseInt(stateParentId)) {
      resultsToShow.push(items[c])
    }
  }
}

function getRegions(items) {
  for(let a = 0; a < items.length; a++) {
    if(items[a]['parent'] === null) {
      resultsToShow.push(items[a])
      getStates(items, a)
    }
  }
}

export function filterListFromInput(input, ...args) {
  resultsToShow = [];

  let regex = new RegExp(input, 'gi')

  let countyWeWant = args[0].filter( function(x) {
    if(x.name.match(regex)) {
      return x.name
    }
  })

  let parentsToGet = []
  for(var x = 0; x < countyWeWant.length; x++) {
    parentsToGet.push(countyWeWant[x]['parent'])
  }



  let statesWeNeed = [];
  for(let y = 0; y < args[0].length;y++) {
    for(let z = 0; z < parentsToGet.length; z++) {
      if(args[0][y]['id'] === parentsToGet[z]) {
        statesWeNeed.push(args[0][y])
      }
    }
  }

let regionsToGet = [];
for(let j = 0; j < statesWeNeed.length; j++) {
  regionsToGet.push(statesWeNeed[j]['parent']);
}


let regionsWeNeed = [];
for(let h = 0; h < args[0].length; h++) {
  for(let g = 0 ; g < regionsToGet.length; g++) {
    if(args[0][h]['id'] === regionsToGet[g]) {
      regionsWeNeed.push(args[0][h])
    }
  }
}

filteredItems = [ ...regionsWeNeed, ...statesWeNeed, ...countyWeWant];

let final = Array.from(new Set(filteredItems));
getRegions(final)

return resultsToShow;
}
