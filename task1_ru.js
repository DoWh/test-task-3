// субъективную оценку сложности 2/10
// предварительную оценку трудозатрат 30 мин
// фактические трудозатраты - 15 мин
// оценка сложности - O(N)

let array = ['1.5', '3', '6', '1.5']

const OnePice = array.reduce((sum, cur) => sum + Number(cur), 0) / 100
array = array.map(item => (item / OnePice).toFixed(3))

console.log(array)
