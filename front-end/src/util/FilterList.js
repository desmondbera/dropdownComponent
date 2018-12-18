console.log('FilterList.js module being executed.');

let filteredItems = [];
let arrOfCountyId = [];
let arrOfStateId = [];
let arrOfRegionId = [];


// function getRegionId(id, args) {
//   console.log('Inside of getRegionId')
//
//   for(let z = 0; z < args.length; z++) {
//     for(let l = 0; l < id.length; l++) {
//       if(args[z]['id'] === id[l]) {
//         arrOfRegionId.push(id[l])
//       }
//     }
//
//   }
//
//   return [arrOfCountyId, arrOfStateId, arrOfRegionId]
// }
//
// function getParentIdofState(args, id) {
//   console.log('Inside of getParentIdofState')
//   console.log('id is: '+ id.length)
//   // console.log('Args length is: ' + args.length)
//   let stateParentIds = []
//   for(let y = 0; y < args.length; y++) {
//     for(let k = 0; k < id.length; k++) {
//       if(args[y]['id'] === id[k]) {
//         console.log("we are inside of if statement inside of thegetparentidofstate")
//         stateParentIds.push(args[y]['parent'])
//         arrOfStateId.push(args[y]['id'])
//       }
//     }
//   }
//   console.log('stateParentIds is: ', stateParentIds)
//   // arrOfStateId = [...stateParentIds]
//   console.log( [arrOfCountyId, arrOfStateId])
//   // return getRegionId(stateParentIds, args)
// }


export function filterListFromInput(input, ...args) {
  console.log('---Inside of function filterListFromInput---')

  let regex = new RegExp(input, 'gi')


  let countyWeWant = args[0].filter( function(x) {
    if(x.name.match(regex)) {
      return x.name
    }
  })
  console.log('county(ies) we want are: ',countyWeWant);

  let parentsToGet = []
  for(var x = 0; x < countyWeWant.length; x++) {
    parentsToGet.push(countyWeWant[x]['parent'])
  }

  console.log('states to get are: ', parentsToGet)

  let statesWeNeed = [];
  for(let y = 0; y < args[0].length;y++) {
    for(let z = 0; z < parentsToGet.length; z++) {
      if(args[0][y]['id'] === parentsToGet[z]) {
        statesWeNeed.push(args[0][y])
      }
    }
  }
  console.log('states we need is: ', statesWeNeed)

let regionsToGet = [];
for(let j = 0; j < statesWeNeed.length; j++) {
  regionsToGet.push(statesWeNeed[j]['parent']);
}

console.log('regionsToGet is: ', regionsToGet);

let regionsWeNeed = [];
for(let h = 0; h < args[0].length; h++) {
  for(let g = 0 ; g < regionsToGet.length; g++) {
    if(args[0][h]['id'] === regionsToGet[g]) {
      regionsWeNeed.push(args[0][h])
    }
  }
}
console.log('regions we need is: ', regionsWeNeed)

filteredItems = [ ...regionsWeNeed, ...statesWeNeed, ...countyWeWant];

console.log(filteredItems);
console.log('cleaning up - checking for no duplicates...')

let final = Array.from(new Set(filteredItems))


return final;
}
