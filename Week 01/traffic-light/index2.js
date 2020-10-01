function light(color, delay) {
  return new Promise(resolve => {
    console.log(`${color} light`);
    setTimeout(() => resolve(), delay * 1000);
  })
}

async function trafficLight() {
  await light('green', 10);
  await light('yellow', 2);
  await light('red', 5);
  trafficLight();
}

trafficLight();