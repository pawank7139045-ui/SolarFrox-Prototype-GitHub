const pages = [
  ...document.querySelectorAll(".page")
];

const navButtons = [
  ...document.querySelectorAll("[data-page]")
];

const title = document.getElementById("pageTitle");

const titles = {
  dashboard: "Good afternoon, Farmer 👋",
  history: "History & Analytics",
  alerts: "Alerts & Notifications",
  settings: "Storage Settings"
};


/* PAGE NAVIGATION */

function go(page) {

  pages.forEach(function(p) {

    p.classList.toggle(
      "active",
      p.id === page
    );

  });


  navButtons.forEach(function(button) {

    button.classList.toggle(
      "active",
      button.dataset.page === page
    );

  });


  if (titles[page]) {
    title.textContent = titles[page];
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


navButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {
      go(button.dataset.page);
    }
  );

});


/* ALERT BUTTON */

document
  .querySelectorAll("[data-page-jump]")
  .forEach(function(button) {

    button.addEventListener(
      "click",
      function() {
        go(button.dataset.pageJump);
      }
    );

  });


/* TOAST */

const toast =
  document.getElementById("toast");


function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(function() {

    toast.classList.remove("show");

  }, 2500);

}


/* COOLING SYSTEM */

let systemOn = true;

const fan =
  document.getElementById("fanRing");

const power =
  document.getElementById("powerBtn");

const state =
  document.getElementById("coolState");


power.addEventListener(
  "click",
  function() {

    systemOn = !systemOn;


    if (systemOn) {

      state.textContent =
        "SYSTEM ON";

      power.innerHTML =
        "<span>⏻</span> Turn system OFF";

      showToast(
        "Cooling system turned ON"
      );

    }

    else {

      state.textContent =
        "SYSTEM OFF";

      power.innerHTML =
        "<span>⏻</span> Turn system ON";

      showToast(
        "Cooling system turned OFF"
      );

    }

  }
);


/* SAVE SETTINGS */

document
  .getElementById("saveSettings")
  .addEventListener(
    "click",
    function() {

      showToast(
        "Settings saved successfully"
      );

    }
  );


/* MARK ALL ALERTS */

document
  .getElementById("readAll")
  .addEventListener(
    "click",
    function() {

      document
        .getElementById("alertCount")
        .textContent = "0";


      showToast(
        "All alerts marked as read"
      );

    }
  );


/* LOGOUT */

document
  .getElementById("logoutBtn")
  .addEventListener(
    "click",
    function() {

      showToast(
        "Prototype mode: logout disabled"
      );

    }
  );


/* SIMPLE SVG CHART */

function line(points, color) {

  const path = points
    .map(function(point, index) {

      return (
        (index === 0 ? "M" : "L") +
        point[0] +
        " " +
        point[1]
      );

    })
    .join(" ");


  return `
    <path
      d="${path}"
      fill="none"
      stroke="${color}"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `;

}


function createChart(
  svgId,
  large = false
) {

  const svg =
    document.getElementById(svgId);


  if (!svg) return;


  const width =
    large ? 920 : 760;

  const height =
    large ? 330 : 260;


  let grid = "";


  for (let i = 1; i < 6; i++) {

    const y =
      (height / 6) * i;


    grid += `
      <line
        x1="0"
        y1="${y}"
        x2="${width}"
        y2="${y}"
        stroke="#e8efeb"
        stroke-width="1"
      />
    `;

  }


  const temp = [
    [0,140],
    [80,135],
    [160,145],
    [240,125],
    [320,110],
    [400,118],
    [480,130],
    [560,120],
    [640,140],
    [720,132]
  ];


  const humidity = [
    [0,200],
    [80,190],
    [160,205],
    [240,180],
    [320,175],
    [400,195],
    [480,170],
    [560,190],
    [640,200],
    [720,185]
  ];


  const battery = [
    [0,240],
    [80,238],
    [160,235],
    [240,230],
    [320,225],
    [400,210],
    [480,195],
    [560,180],
    [640,170],
    [720,160]
  ];


  svg.innerHTML =
    grid +
    line(temp, "#2776a5") +
    line(humidity, "#298052") +
    line(battery, "#c69022");

}


/* CREATE CHARTS */

createChart(
  "mainChart"
);

createChart(
  "historyChart",
  true
);


/* LIVE DATA SIMULATION */

setInterval(
  function() {

    if (!systemOn) {
      return;
    }


    const temperature =
      (4 + Math.random() * 0.7)
        .toFixed(1);


    const humidity =
      Math.round(
        80 + Math.random() * 5
      );


    const battery =
      Math.round(
        74 + Math.random() * 4
      );


    const solar =
      Math.round(
        300 + Math.random() * 60
      );


    document
      .getElementById("tempValue")
      .textContent =
        temperature;


    document
      .getElementById("humidityValue")
      .textContent =
        humidity;


    document
      .getElementById("batteryValue")
      .textContent =
        battery;


    document
      .getElementById("solarValue")
      .textContent =
        solar;

  },

  5000
);


/* EXPORT CSV */

document
  .getElementById("exportBtn")
  .addEventListener(
    "click",
    function() {

      const rows = [

        [
          "Time",
          "Temperature",
          "Humidity",
          "Battery"
        ],

        [
          "00:00",
          "4.1",
          "80",
          "78"
        ],

        [
          "06:00",
          "4.0",
          "81",
          "77"
        ],

        [
          "12:00",
          "4.4",
          "84",
          "76"
        ],

        [
          "18:00",
          "4.7",
          "82",
          "75"
        ]

      ];


      const csv =
        rows
          .map(
            function(row) {
              return row.join(",");
            }
          )
          .join("\n");


      const blob =
        new Blob(
          [csv],
          {
            type: "text/csv"
          }
        );


      const url =
        URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = url;

      
