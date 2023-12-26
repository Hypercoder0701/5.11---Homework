const wholeBody = document.body;
function mantainTheme(ele0, ele1, ele2, ele3, ele4, ele5, ele6) {
  let theme = localStorage.getItem("theme");
  if (Number(theme) === 2) {
    ele0.style.backgroundColor = `rgb(18, 23, 33)`;
    ele1.style.backgroundColor = `rgb(25, 32, 45)`;
    ele2.style.backgroundColor = `rgb(25, 32, 45)`;
    ele3.style.backgroundColor = `rgb(25, 32, 45)`;
    ele4.style.backgroundColor = `rgb(25, 32, 45)`;
    ele5.style.backgroundColor = `rgb(25, 32, 45)`;
    ele6.forEach((ele) => {
      ele.style.color = `#fff`;
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  wholeBody.innerHTML = localStorage.getItem("lagerHTML");
  const upperWrapper = document.querySelector(".upper-wrapper");
  const jobsContainer = document.querySelector(".job-info");
  const pageFooter = document.querySelector(".footer");
  const siteLink = document.querySelector(".site-link");
  const jobRole = document.querySelector(".role");
  const headings = document.querySelectorAll(".for-switch");
  const websiteBtn = document.querySelector(".website-btn");
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", (e) => {
    open("index.html");
  });
  mantainTheme(
    wholeBody,
    upperWrapper,
    jobsContainer,
    pageFooter,
    siteLink,
    jobRole,
    headings
  );
  function changeTheme(input) {
    wholeBody.style.backgroundColor = input[0];
    upperWrapper.style.backgroundColor = input[1];
    jobsContainer.style.backgroundColor = input[1];
    pageFooter.style.backgroundColor = input[1];
    siteLink.style.backgroundColor = input[1];
    jobRole.style.backgroundColor = input[1];
    websiteBtn.style.backgroundColor = input[3];
    headings.forEach((ele) => {
      ele.style.color = input[2];
    });
  }
  const themeSwitch = document.querySelector(".label");
  themeSwitch.addEventListener("click", function () {
    let currentTheme = Number(localStorage.getItem("theme"));
    let colArr;
    currentTheme === 1
      ? (colArr = [
          `rgb(18, 23, 33)`,
          `rgb(25, 32, 45)`,
          `#fff`,
          `rgb(110, 128, 152)`,
        ])
      : (colArr = [
          `rgb(244,246 ,248 )`,
          `rgb(255, 255, 255)`,
          `#000`,
          `rgba(89, 100, 224, 1)`,
        ]);
    console.log(colArr);
    if (currentTheme === 1) {
      changeTheme(colArr);
      localStorage.setItem("theme", 2);
    } else {
      changeTheme(colArr);
      localStorage.setItem("theme", 1);
    }
  });
});
