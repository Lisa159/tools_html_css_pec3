let openedSidenav = false;

const chaptersBook1 = [3, 11, 23, 36, 46, 54, 61, 64, 68, 72];
const chaptersBook2 = [12, 27, 40, 48, 63];
const chaptersBook3 = [8, 23, 27, 42, 57, 71];
const chaptersBook5 = [2, 11, 16, 23, 30, 36, 43, 50, 52, 71];

function openSidenav() {
  const display = openedSidenav ? "none" : "inline";
  const transforValue = openedSidenav ? "translateX(100vw)" : "translateX(0px)";
  document
    .getElementById("responsive")
    .getElementsByClassName("sidenav")[0].style.transform = transforValue;
  document
    .getElementById("responsive")
    .getElementsByClassName("overlay")[0].style.display = display;
  openedSidenav = !openedSidenav;
}

function setChapters() {
  try {
    let list = document
      .getElementById("about")
      .getElementsByClassName("chapters")[0];
    if (list !== null && list !== undefined) {
      if (window.location.href.includes("details-libro1")) {
        _setChaptersList(chaptersBook1, list);
      } else if (window.location.href.includes("details-libro2")) {
        _setChaptersList(chaptersBook2, list);
      } else if (window.location.href.includes("details-libro3")) {
        _setChaptersList(chaptersBook3, list);
      } else if (window.location.href.includes("details-libro5")) {
        _setChaptersList(chaptersBook5, list);
      }
    }
  } catch (err) {}
}

function _setChaptersList(chaptersList, list) {
  chaptersList.map((el) => {
    const item = document.createElement("li");
    item.innerHTML = `Capítulo ${el}`;
    list.appendChild(item);
  });
}

let counterCarousel = 0;

function nextBook() {
  if (window.location.href.includes("category")) {
    let el = document.getElementsByClassName("btnList")[1];
    el.addEventListener(
      "click",
      function () {
        let arr = document.querySelectorAll(".elementCat");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].classList.contains("selected")) {
            arr[i].classList.remove("selected");
            if (i + 1 <= arr.length - 1) {
              arr[i + 1].classList.add("selected");
            }
            break;
          }
        }
        counterCarousel += -230;
        arr.forEach((el) => {
          el.style.transform =
            "translateX(" +
            counterCarousel +
            "px) scale(var(--scale-carousel))";
        });
        _setDisabledBtnCarousel();
      },
      false
    );
  }
}

function prevBook() {
  if (window.location.href.includes("category")) {
    let el = document.getElementsByClassName("btnList")[0];
    el.addEventListener(
      "click",
      function () {
        let arr = document.querySelectorAll(".elementCat");
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[i].classList.contains("selected")) {
            arr[i].classList.remove("selected");
            if (i - 1 >= 0) {
              arr[i - 1].classList.add("selected");
            }
            break;
          }
        }
        counterCarousel += 230;
        arr.forEach((el) => {
          el.style.transform =
            "translateX(" +
            counterCarousel +
            "px) scale(var(--scale-carousel))";
        });
        _setDisabledBtnCarousel();
      },
      false
    );
  }
}

function _setDisabledBtnCarousel() {
  let prev = document.getElementsByClassName("btnList")[0];
  let next = document.getElementsByClassName("btnList")[1];
  const arr = document.querySelectorAll(".elementCat");
  if (arr[0].classList.contains("selected")) {
    prev.classList.add("disabled");
  } else if (arr[arr.length - 1].classList.contains("selected")) {
    next.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
    next.classList.remove("disabled");
  }
}

function setCarousel() {
  if (window.location.href.includes("category")) {
    document.querySelectorAll(".elementCat").forEach((el) => {
      if (el.classList.contains("selected")) {
        el.style.marginLeft = "20%";
        el.style.transform =
          "translateX(" + counterCarousel + "px) scale(var(--scale-carousel))";
      }
    });
    _setDisabledBtnCarousel();
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (window.innerWidth < 768) {
        entry.target.classList.add("mobile-animation");
      }
    }
  });
});

try {
  observer.observe(document.querySelector("#details"));
  observer.observe(document.querySelector("#about"));
} catch (error) {}

//Animation for the carousel
setCarousel();
nextBook();
prevBook();

//Display chapters
setChapters();
