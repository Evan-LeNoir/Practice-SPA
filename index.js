import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

// const render = st => { //this can also be initiated as (const render = (st = state.Home) => {})
//   document.querySelector("#root").innerHTML = `
//    ${Header(st)}
//    ${Nav(state.Links)}
//    ${Main(st)}
//    ${Footer(state.Footer)}`;
// };
//render();

// an alternative way to write out the render function.
function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
`;
  addNavToggle();
  addEventListener();
  addPicOnSubmit();
}
render(state.Home);

function addEventListener() {
  document.querySelectorAll("nav a").forEach(navLink => {
    navLink.addEventListener("click", event => {
      event.preventDefault();
      //      render(state[event.target.textContent]); This does the same thing as belore but as one line instead of multiple
      let page = event.target.textContent;
      let pieceOfState = state[page];
      render(pieceOfState);
    });
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
dogPictures.forEach(pic => {
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
