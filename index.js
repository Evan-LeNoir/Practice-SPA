import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
console.log("Requesting Data from API");

const router = new Navigo(window.location.origin);

// axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
//   state.Blog.posts.push(post);
// });
axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    headers: {
      "Access-Control-Allow-Origin": window.location.origin
    }
  })
  .then(response => {
    console.log("API response received");
    return response;
  })
  .then(response => {
    console.log("response.data", response.data);
    response.data.forEach(post => {
      state.Blog.posts.push(post);
    });
    const params = router.lastRouteResolved().params;
    console.log("params", params);
    if (params) {
      render(state[params.page]);
    }
  });

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
