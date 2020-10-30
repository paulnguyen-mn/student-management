/*

setTimeout: do something after a period of time
setTimeout(() => {}, 1000);

setInterval: do something repeatedly every period of time

*/

// setTimeout(() => {
//   console.log("Hello timeout 1");
// });

// function abc() {
//   const name = "Hau";
//   console.log("Hello 4");

//   setTimeout(() => {
//     console.log("Hello timeout 2", name);
//   });
// }
// abc();

// console.log("Hello 1");
// console.log("Hello 2");
// console.log("Hello 3");

// let count = 30;

const countDown = (count) => {
  console.log(count);

  // Stop count down when count reach zero
  if (count <= 0) return;

  setTimeout(() => {
    countDown(count - 1);
  }, 1000);
};

// countDown(30);

const countDownInterval = (count) => {
  const countdownElement = document.querySelector("#countdown");

  const interval = setInterval(() => {
    console.log(count);
    countdownElement.textContent = `Remaining: ${count}s`;

    // Stop count down
    if (count <= 0) clearInterval(interval);

    // Decrease 1
    count -= 1;
  }, 1000);
};
// countDownInterval(10);

const bindClock = () => {
  const clockElement = document.querySelector("#clock");

  setInterval(() => {
    // get current time
    const now = new Date();
    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);
    const seconds = `0${now.getSeconds()}`.slice(-2);

    // build time string
    const timeString = `Time: ${hours}:${minutes}:${seconds}`;

    // update dom
    clockElement.textContent = timeString;
  }, 1000);
};
bindClock();

const getData = () => {
  // return fetch(
  //   "https://js-post-api.herokuapp.com/api/students"
  // ).then((response) => response.json());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "Easy Frontend" };
      resolve(data);
      // reject(new Error("hk thich success :P"));
    }, 3000);
  });
};

// console.log(getData());
console.log("Show loading");
// getData();
getData()
  .catch((error) => {
    console.log("Oops loi roi: ", error);
    console.log("Hide loading");
    console.log("Show error popup");
  })
  .then((data) => {
    console.log("Data: ", data);
    // throw new Error("Error from then 1");
    return ["hello"];
  })
  .then((data) => {
    console.log("Data 2: ", data);
    console.log("Hide loading");
  });

// console.log("Before get data");
// getData().then((data) => {
//   console.log("After get dat");
// });

// async function main() {
//   try {
//     console.log("Before get data");
//     const data = await getData();
//     console.log("After get data", data);
//   } catch (error) {
//     console.log("Catch error:", error);
//   }
// }

const main = async () => {
  try {
    console.log("Before get data");
    const data = await getData();
    console.log("After get data", data);
  } catch (error) {
    console.log("Catch error:", error);
  }
};
// main();

(async () => {
  try {
    console.log("Before get data");
    const data = await getData();
    console.log("After get data", data);
  } catch (error) {
    console.log("Catch error:", error);
  }
})();
