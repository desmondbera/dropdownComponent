console.log('Sort.js module being executed.');

let sorted = [];

function getCounty(items, currentY) {
  // console.log('Inside of getCounty');
  for(let z = 0; z < items.length; z++) {
    if(items[z]['parent'] === parseInt(currentY)) {
      sorted.push(items[z])
    }
  }
  // console.log('Done with getCounty')
}

function getStates(items, currentX) {
  // console.log('Inside of getStates function')

  for(let y = 0; y < items.length; y++) {
    if(items[y]['parent'] === parseInt(currentX)) {
      sorted.push(items[y])
      getCounty(items, y)
    }
  }
  // console.log('Done with getStates');
}

function getRegions(items) {
  for(let x in items[0]) {
    if(items[0][x]['parent'] === null) {
      sorted.push(items[0][x])
      getStates(items[0], x)
    }
  }
}

export function createSorter(...args) {
  getRegions([args[0]])
  return sorted;
}
