//step 1: get DOM
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let mainSectionDom = document.querySelector(".mainsection .wrapper");
let secondSectionDom = document.querySelector(".secondsection .wrapper");
let timeDom = document.querySelector(".carousel .time");

let timeRunning = 3000;
let timeAutoNext = 7000;

const apiKey = "04c35731a5ee918f014970082a0088b1";

//Popular
const url_popular =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
//Top Rated
const url_toprate = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
//Now Playing
const url_nowplay =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
//Upcoming
const url_upcomming =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
//Collections
const url_collection =
  "https://api.themoviedb.org/3/collection/collection_id?language=en-US";
//Image Path
const imagePath = "https://image.tmdb.org/t/p/w1280";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTU1NzdiYzBkNjNkODMzNGFjMTRkMTE5Y2NlMzdjNCIsInN1YiI6IjY1YWZmNTEyNmFmOGY4MDBhZjhhZGFiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w8Y35_b-4Bkgey3BfOSWAmdwOAHp3BFvSlBpMzHyEgA",
  },
};

async function fetchMovieData(url) {
  const response = await fetch(url, options);
  const resData = await response.json().then((res) => res);
  return resData.results;
}

const upCommingMovies = async () => {
  let data = await fetchMovieData(url_upcomming);
  data.map((element) => {
    // console.log(imagePath + element.poster_path);
    SliderDom.innerHTML += `<div class="item">
    <img src="${imagePath + element.backdrop_path}" />
    <div class="content">
      <div class="author">UPCOMMING MOVIES</div>
      
      <div class="topic">${element.title}</div>
      <div class="des">
      ${element.overview}
      </div>
      <div class="buttons">
        <button>SEE MORE</button>
        <button>SUBSCRIBE</button>
      </div>
    </div>
  </div>`;
    thumbnailBorderDom.innerHTML += `<div class="item">
    <img src="${imagePath + element.poster_path}" />
    <div class="content">
      <div class="title">${element.title}</div>
      
      <div class="description">
      <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg></div>
      <div class="rating"> ${+element.vote_average.toFixed(1)}</div>
     </div>
    </div>
  </div>`;
  });
};

const popularMovies = async () => {
  let data = await fetchMovieData(url_popular);
  data.map((element) => {
    // console.log(element);
    mainSectionDom.innerHTML += ` <div class="card">
    <img src="${imagePath + element.poster_path}" />
    <div class="descriptions">
      <h1>${element.title}</h1>
      <p>
      ${element.overview}
      </p>
      <button>
        <i class="fab fa-youtube"></i>
        See More
      </button>
    </div>
  </div>`;
  });
};

const topRatedMovies = async () => {
  let data = await fetchMovieData(url_toprate);
  data.map((element) => {
    // console.log(element);
    secondSectionDom.innerHTML += ` <div class="card">
    <img src="${imagePath + element.poster_path}" />
    <div class="descriptions">
      <h1>${element.title}</h1>
      <p>
      ${element.overview}
      </p>
      <button>
        <i class="fab fa-youtube"></i>
        See More
      </button>
    </div>
  </div>`;
  });
};

upCommingMovies();
popularMovies();
topRatedMovies();

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}
