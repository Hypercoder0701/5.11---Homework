import data from "./data.json" assert { type: "json" };
const displayHere = document.querySelector(".jobs");
const rootStyles = getComputedStyle(document.querySelector(":root"));
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
function mantainTheme(ele0, ele1, ele2, ele3) {
  let theme = localStorage.getItem("theme");
  if (Number(theme) === 2) {
    ele0.style.backgroundColor = `rgb(18, 23, 33)`;
    ele1.forEach((ele) => {
      ele.style.backgroundColor = `rgb(25, 32, 45)`;
    });
    ele2.style.backgroundColor = `rgb(25, 32, 45)`;
    ele2.style.color = `#fff`;
    ele3.forEach((ele) => {
      ele.style.color = `#fff`;
    });
  }
}
document.addEventListener("DOMContentLoaded", function (e) {
  displayHere.innerHTML = localStorage.getItem("queryResult");
  const resultsEl = document.querySelector(".results");
  const resNumber = localStorage.getItem("resultNumber");
  resultsEl.innerHTML = `Search Results   (${resNumber})`;
  const wholeBody = document.body;
  const results = document.querySelector(".results");
  const allJobs = document.querySelectorAll(".job");
  const jobName = document.querySelectorAll(".job-name");
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", (e) => {
    open("index.html");
  });
  mantainTheme(wholeBody, allJobs, results, jobName);
  allJobs.forEach((job) => {
    job.addEventListener("click", function () {
      const jobId = Number(job.dataset.id);
      console.log(jobId);
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
    allJobs.forEach(
      (el) =>
        (el.style.backgroundColor = rootStyles.getPropertyValue(
          `--jobcard-background-color-${theme}`
        ))
    );
    jobName.forEach(
      (el) =>
        (el.style.color = rootStyles.getPropertyValue(`--text-color-${theme}`))
    );
    results.style.backgroundColor = rootStyles.getPropertyValue(
      `--jobcard-background-color-${theme}`
    );
    results.style.color = rootStyles.getPropertyValue(`--text-color-${theme}`);
    localStorage.setItem("theme", theme);
  }
  const themeSwitch = document.querySelector(".label");
  themeSwitch.addEventListener("click", (e) => {
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
});
