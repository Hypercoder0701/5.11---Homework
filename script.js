"use strict";
import data from "./data.json" assert { type: "json" };
const loadMore = document.querySelector(".btn-load");
const jobCaontainers = document.querySelectorAll(".job");
const switchTheme = document.querySelector(".label");
const rootStyles = getComputedStyle(document.querySelector(":root"));
const txeColor = document.querySelectorAll(".for-color");
const form = document.querySelector(".form");
const input = document.querySelectorAll(".input");
loadMore.addEventListener("click", (e) => {
  e.preventDefault();
  jobCaontainers.forEach((cnt) => {
    if (cnt.classList.contains("not-visible")) {
      setTimeout(() => {
        cnt.classList.toggle("not-visible");
      }, 300);
    }
    loadMore.classList.add("not-visible");
  });
});
function getJob(id, jobs) {
  for (let job of jobs) {
    if (job.id === id) return job;
  }
}
function generateItems(list) {
  return list
    .map((Item) => {
      return `<li class='list-item'><span class="forfont-color">${Item}</span></li>`;
    })
    .join(" ");
}
function renderHTMLTemplate(job) {
  const jobDetailTemplate = `<header class="header">
<div class="outer-wrapper">
  <div class="top-most">
  <img src="./assets/desktop/logo.svg" class="logo" />
    <div class="theme">
      <img src="./assets/desktop/icon-sun.svg" />
      <input type="checkbox" class="slider" id="theme-changer" />
      <label for="theme-changer" class="label"
        ><div class="ball"></div
      ></label>
      <img src="./assets/desktop/icon-moon.svg" />
    </div>
  </div>
</div>
<div class="upper-wrapper">
  <img src=${job.logo} style="background-color:${
    job.logoBackground
  }" alt="logo image" class="logo-img" />
  <div class="site-link">
    <div>
      <h3 class="for-switch">${job.company}</h3>
      <p class="forfont-color">${job.website}</p>
    </div>
    <button class="btn website-btn">Company Site</button>
  </div>
</div>
</header>
<section class="job-info">
<div class="role">
  <div>
    <p class="forfont-color">${job.postedAt} . ${job.contract}</p>
    <h2 class="for-switch">${job.position}</h2>
    <p class="forfont-color">${job.location}</p>
  </div>
  <button class="btn">Apply Now</button>
</div>
<p class="job-description forfont-color">
  ${job.description}
</p>
<h3 class="requirements for-switch">Requirements</h3>
<p class="below-requirements forfont-color">
  ${job.requirements.content}
</p>
<ul class="list-of-requirements">
${generateItems(job.requirements.items)}
</ul>
<h3 class="requirements for-switch">What You Will Do</h3>
<p class="below-requirements forfont-color">${job.role.content}</p>
<ol class="things-to-do">
     ${generateItems(job.role.items)}
</ol>
</section>
<div class="footer">
<div class="last-info">
  <h3><h2 class="for-switch">${job.position}</h2></h3>
  <p class="forfont-color">${job.company} Inc</p>
</div>
<button class="btn">Apply Now</button>
</div>
<footer class="page-footer">
      <div class="footer-container">
        <h4>Contact Us</h4>
        <div class="icons-wrapper">
          <img src="./assets/logos/icons8-facebook.svg" alt="img" />
          <img src="./assets/logos/icons8-twitter.svg" alt="img" />
          <img src="./assets/logos/icons8-instagram.svg" alt="img" />
          <img src="./assets/logos/icons8-youtube.svg" alt="img" />
        </div>
      </div>
    </footer>
`;
  return jobDetailTemplate;
}
const header = document.querySelector(".header");
console.log(header);
const allJobs = document.querySelectorAll(".job");
allJobs.forEach((job) => {
  job.addEventListener("click", (e) => {
    const jobId = Number(job.dataset.id);
    const actualJob = getJob(jobId, data);
    const returnedHTML = renderHTMLTemplate(actualJob);
    localStorage.setItem("lagerHTML", returnedHTML);
    open("job-detail.html");
  });
});
function changeTheme(theme) {
  document.body.style.backgroundColor = rootStyles.getPropertyValue(
    `--main-background-color-${theme}`
  );
  jobCaontainers.forEach(
    (el) =>
      (el.style.backgroundColor = rootStyles.getPropertyValue(
        `--jobcard-background-color-${theme}`
      ))
  );
  txeColor.forEach(
    (el) =>
      (el.style.color = rootStyles.getPropertyValue(`--text-color-${theme}`))
  );
  form.style.backgroundColor = rootStyles.getPropertyValue(
    `--jobcard-background-color-${theme}`
  );
  input.forEach((el) => {
    el.style.backgroundColor = rootStyles.getPropertyValue(
      `--jobcard-background-color-${theme}`
    );
    el.style.color = rootStyles.getPropertyValue(`--text-color-${theme}`);
  });
  localStorage.setItem("theme", theme);
}
switchTheme.addEventListener("click", () => {
  let theme = Number(localStorage.getItem("theme"));
  if (theme === 1) {
    theme = 2;
    changeTheme(theme);
    localStorage.setItem("theme", 2);
  } else {
    changeTheme(1);
    localStorage.setItem("theme", 1);
  }
});
function mantainTheme() {
  let x = Number(localStorage.getItem("theme"));
  if (x) {
    changeTheme(x);
  }
}
mantainTheme();
const filterOne = document.querySelector(".filter-1");
const countryFilter = document.querySelector(".filter-2");
const fullTime = document.querySelector(".time-span");
function renderRelevantJobs(data) {
  let queryJobs = data.map((job) => {
    return `<div class="job" data-id=${String(job.id)}>
    <img
      src="${job.logo}"
      class="job_logo"
      style="background-color:${job.logoBackground}"
    />
    <p class="postage-time">${job.postedAt} . ${job.contract}</p>
    <h4 class="job-name">${job.position}</h4>
    <p class="company-name">${job.company}</p>
    <p class="country-name">${job.location}</p>
    </div>`;
  });
  let size = queryJobs.length;
  return [size, queryJobs.join("").replace(/(\r\n|\n|\r)/gm, "")];
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = filterOne.value;
  let country = countryFilter.value.toLowerCase().replace(/ /g, "").trim();
  let filter2 = fullTime.checked;
  let searchToken = searchInput
    .toLowerCase()
    .split(" ")
    .filter((input) => {
      return input.trim() !== "";
    });
  if (searchToken.length) {
    let searchTermRegex = new RegExp(searchToken.join("|"), "gim");
    console.log(searchTermRegex);
    let filteredJobs = data.filter((job) => {
      let jobString = "";
      for (const key in job) {
        if (
          job.hasOwnProperty(key) &&
          job[key] !== "" &&
          ["company", "position"].includes(key)
        ) {
          jobString += job[key].toString().toLowerCase().trim() + " ";
        }
      }
      return jobString.match(searchTermRegex);
    });
    if (country) {
      filteredJobs = filteredJobs.filter((job) => {
        if (job["location"].toLowerCase().replace(/ /g, "") === country) {
          return job;
        }
      });
      if (filter2) {
        filteredJobs = filteredJobs.filter((job) => {
          if (job["contract"].toLowerCase().replace(/ /g, "") === "fulltime") {
            return job;
          }
        });
      }
    }
    const [queryResultSize, queryResult] = renderRelevantJobs(filteredJobs);
    localStorage.setItem("queryResult", queryResult);
    localStorage.setItem("resultNumber", queryResultSize);
    open("http:search-result.html");
  } else {
    header.insertAdjacentHTML(
      "afterend",
      `<div class="pop-up">
<p class="error-text">First input field cannot be empty</p>
</div>`
    );
    setTimeout(() => {
      const popUp = document.querySelector(".pop-up");
      popUp.style.display = "none";
    }, 3000);
  }
});
