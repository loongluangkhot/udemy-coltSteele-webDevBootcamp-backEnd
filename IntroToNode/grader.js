function average(scoreArr) {
    let sum = scoreArr.reduce((x,y) => x + y)
    return Math.round(sum/scoreArr.length)
}

console.log(average([]))