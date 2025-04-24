let total = 556;

let alt = [197, 204, 232];

let history = [];

let historyindex = 0;

let changing = false;

let justDidAlt = false;

function randomise() {
  return Math.floor(Math.random() * (total - 3)) + 3;
}

function pickSlide(number, backwards, add) {
  changing = true;

  number = number % total || total;

  let useAlt = false;
  let last = parseInt(window.location.hash.substring(7), 10);

  if (alt.includes(last) && history.length != 0 && !backwards) {
    number = last;
    useAlt = true;
    justDidAlt = true;
  } else {
    justDidAlt = false;
  }

  // alert(alt);

  document.getElementById("imagetransition").src =
    "slides/" + (useAlt ? "alt/" : "") + "quotes-" + number.toString() + ".png";
  document.getElementById("image").style.animation =
    "transition" +
    (backwards ? "1" : "0") +
    " 1s ease-in-out forwards" +
    (backwards ? " reverse" : "");
  document.getElementById("imagetransition").style.animation =
    "transition" +
    (backwards ? "0" : "1") +
    " 1s ease-in-out forwards" +
    (backwards ? " reverse" : "");
  document.getElementById("imagetransition").style.display = "block";

  setTimeout(() => {
    document.getElementById("image").src =
      document.getElementById("imagetransition").src;
    setTimeout(() => {
      document.getElementById("imagetransition").style.display = "none";
      document.getElementById("image").style.animation = "none";
      document.getElementById("imagetransition").style.animation = "none";
      changing = false;
    }, 10);
    if (add) {
      history.splice(historyindex, 0, number);
    }
    console.log(history, historyindex);
  }, 1000);

  document.getElementById("title").innerText =
    "Daily Dose of GPS QUotes (" + number.toString() + ")";

  window.location.hash = "slide-" + (useAlt ? "alt-" : "") + number.toString();
}

document.getElementById("icon").href =
  "https://dailydoseofgpsquotes.com/icons/DDOGPSQICONZ-" +
  ((Math.floor(Math.random() * 420) + 1) % 42).toString() +
  ".jpg";

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDailyRandom(min = 0, max = 1) {
  const date = new Date();
  const seed =
    date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate();
  const rand = seededRandom(seed);
  return Math.floor(rand * (max - min + 1)) + min;
}

setTimeout(() => {
  document.getElementById("loader").style.animation =
    "loader 1s ease-in-out forwards";
}, 2.5 /* seconds */ * 1e3);

// function slideAnimation() {}

const today = new Date();
const formattedDate = `${String(today.getMonth() + 1).padStart(
  2,
  "0"
)}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

if (window.location.hash) {
  const hash = window.location.hash.substring(1);
  if (hash.startsWith("slide-")) {
    let string = 6;
    if (hash.includes("alt")) {
      string = 10;
    }
    const slideNumber = parseInt(hash.substring(string), 10);
    if (!isNaN(slideNumber)) {
      pickSlide(slideNumber, false, true);
    }
  }
} else {
  pickSlide(getDailyRandom(0, total * 1e64), false, true);
}

function daysSinceDate(dateString) {
  const now = new Date();
  const pastDate = new Date(dateString);
  now.setHours(0, 0, 0, 0);
  pastDate.setHours(0, 0, 0, 0);
  const timeDifference = now.getTime() - pastDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

window.addEventListener("keyup", function (event) {
  if (!changing) {
    if (event.key === "ArrowRight") {
      if (historyindex + 1 < history.length) {
        console.log("case 1");
        let last = window.location.hash.includes("alt-")
          ? 0
          : parseInt(window.location.hash.substring(7), 10);

        if (alt.includes(last) && history.length != 0 && !justDidAlt) {
          pickSlide(last, false, false);
          console.log("alt");
        } else {
          pickSlide(history[historyindex + 1], false, false);
          console.log("not alt");
          if (!justDidAlt) {
            historyindex++;
            console.log("index up");
          }
        }
      } else {
        console.log("case 2");
        let last = window.location.hash.includes("alt-")
          ? 0
          : parseInt(window.location.hash.substring(7), 10);

        if (alt.includes(last) && history.length != 0 && !justDidAlt) {
          console.log("alt");
          pickSlide(last, false, false);
        } else {
          pickSlide(randomise(), false, true);
          console.log("not alt");
          if (!justDidAlt) {
            console.log("index up");
            historyindex++;
          }
        }
      }
    } else if (event.key === "ArrowLeft") {
      if (historyindex - 1 >= 0) {
        historyindex--;
        pickSlide(history[historyindex], true, false);
      }
    } else if (event.key === " ") {
      imageClick();
    } else if (event.key === "q") {
      alert(
        "Daily Dose of GPS QUotes Help\nClick / Space: New slide\nRight arrow: Next slide\nLeft arrow: Last slide\nEnter: Daily quote info\nQ: Help\nThanks for checking it out! :DD"
      );
    } else if (event.key === "Enter") {
      alert(
        formattedDate +
          "'s quote is daily quote #" +
          daysSinceDate("2025-04-21") +
          " (since the site started), and slide #" +
          (getDailyRandom(0, total * 1e64) % total) +
          "!"
      );
    }
    // alert(historyindex);
  }
});

function imageClick() {
  let last = window.location.hash.includes("alt-")
    ? 0
    : parseInt(window.location.hash.substring(7), 10);

  if (alt.includes(last) && history.length != 0 && !justDidAlt) {
    pickSlide(last, false, false);
  } else {
    pickSlide(randomise(), false, true);
    if (!justDidAlt) {
      historyindex++;
    }
  }
}
