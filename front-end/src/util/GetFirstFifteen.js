console.log('GetFirstFifteen.js module being executed.');

export function getFifteen(...args) {
  // console.log('---Inside of function getFifteen---')
  return args[0].slice(0, 15)
}
