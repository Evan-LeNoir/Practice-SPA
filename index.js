import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import { auth, db } from "./firebase";
console.log("Requesting Data from API");

const router = new Navigo(window.location.origin);

axios
  .get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  .then(response => console.log(response.data));

// axios weather maps
//   .get(
//     "http://api.openweathermap.org/data/2.5/weather?lat=38.63&lon=-90.2&appid=83584418c514b5e3441dc1e28901d462"
//   )
//   .then(response => {
//     const data = response.data;
//     console.log("saving weather data to state");
//     state.Home.weather.city = data.name;
//     console.log(state.Home);
//     state.Home.weather.temp = data.main.temp;
//     console.log(data.weather);
//     state.Home.weather.description = data.weather[0].main;
//   })
//   .then(() => console.log(state.Home));

// axios
//   .get(
//     "http://api.openweathermap.org/data/2.5/weather?q=wentzville&appid=6b702ac57cb454e830d28e3290ce7d68"
//   )
//   .then(response => {
//     const data = response.data;
//     state.Home.weather.city = data.name;
//     state.Home.weather.temp = data.main.temp;
//     state.Home.weather.description = data.weather[0].main;
//   })
//   .then(() => console.log(state.Home));

// axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
//   state.Blog.posts.push(post);
// });

// axios
//   .get("https://jsonplaceholder.typicode.com/posts", {
//     headers: {
//       "Access-Control-Allow-Origin": window.location.origin
//     }
//   })
//   .then(response => {
//     console.log("API response received");
//     return response;
//   })
//   .then(response => {
//     console.log("response.data", response.data);
//     response.data.forEach(post => {
//       state.Blog.posts.push(post);
//     });
//     const params = router.lastRouteResolved().params;
//     console.log("params", params);
//     if (params) {
//       render(state[params.page]);
//     }
//   });

// const render = st => { //this can also be initiated as (const render = (st = state.Home) => {})
//   document.querySelector("#root").innerHTML = `
//    ${Header(st)}
//    ${Nav(state.Links)}
//    ${Main(st)}
//    ${Footer(state.Footer)}`;
// };
//render();

// an alternative way to write out the render function.
function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
`;
  router.updatePageLinks();
  addNavToggle();
  //addEventListener();
  addPicOnSubmit();
  listenForRegister();
}
router
  .on({
    "/": () => render(),
    ":page": params => {
      const enteredRoute = params.page;
      const formattedRoute = capitalize(enteredRoute);
      const pieceOfState = state[formattedRoute];
      render(pieceOfState);
    }
  })
  .resolve();

// function addEventListener() {
//   document.querySelectorAll("nav a").forEach(navLink => {
//     navLink.addEventListener("click", event => {
//       event.preventDefault();
//       //      render(state[event.target.textContent]); This does the same thing as belore but as one line instead of multiple
//       let page = event.target.textContent;
//       let pieceOfState = state[page];
//       render(pieceOfState);
//     });
//   });
// }

function listenForRegister(st) {
  if (st.view === "Register") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let firstName = inputs[0];
      let lastName = inputs[1];
      let email = inputs[2];
      let password = inputs[3];

      auth.createUserWithEmailAndPassword(email, password).then(() => {});
    });
  }
}
function addUserToState(username, email) {
  state.User.username = username;
  state.User.email = email;
  state.User.loggedin = true;
}
function addUserToDb(username, email) {
  db.collection("users").add({
    username: username,
    email: email,
    loggedin: loggedin
  });
}

function addNavToggle() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

// array of pictures for gallery

// populating gallery with pictures
const gallerySection = document.querySelector("#gallery");
pictures.forEach(pic => {
  let img = document.createElement("img");
  img.src = pic.url;
  img.alt = pic.title;
  gallerySection.appendChild(img);
});

function addPicOnSubmit() {
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    let inputs = event.target.elements;
    let newPic = {
      url: inputs[0].value,
      title: inputs[1].value
    };
    state.Gallery.pictures.push(newPic);
    render(state.Gallery);
  });
}
