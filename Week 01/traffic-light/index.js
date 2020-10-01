function round() {
  new Promise((resolve, reject) => {
    console.log('green light');
    setTimeout(() => resolve(), 10 *  1000);
  }).then(() => {
    return new Promise((resolve, reject) => {
      console.log('yellow light');
      setTimeout(() => resolve(), 2 * 1000);
    })
  }).then(() => {
    console.log('red light');
    setTimeout(() => {}, 5 * 1000);
  })
}

function trafficLight() {
  round();
  setInterval(() => {
    round();
  }, 17 * 1000);
}

trafficLight();