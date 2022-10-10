const date = new Date();

const launchDates = [];

fetch(`https://api.spacexdata.com/v4/launches/upcoming`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      launchDates.push(new Date(item.date_local).toDateString());
    });
  })
  .then(() => {
    const calendarRender = () => {
      var monthNow = [];
      const currentDay = date.getDate();

      var currentMonth = date.getMonth();

      var monthCheck = currentMonth;

      launchDates.forEach((item) => {
        const x = new Date(item).getMonth();
        const y = new Date(item).getDate();
        if (monthCheck === x) {
          monthNow.push(y);
        }
      });
      console.log(monthNow);
      var currentDate = new Date().toDateString();

      const daysInCurrentMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

      const daysOfWeek = date.getDay();

      const indexFirstWeekDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getDay();

      // render the month and date in the calendar's header

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      document.querySelector(".headerContent h1").innerHTML =
        months[currentMonth];
      document.querySelector(".headerContent p").innerHTML = currentDate;

      // render the weekdays in the calendar's body

      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      let weekDaysHelper = "";

      weekDays.forEach((item) => {
        weekDaysHelper += `<div class='weekDay'><h2>${item}</h2></div>`;
        document.querySelector(".weekDays").innerHTML = weekDaysHelper;
      });

      // render the monthdays in the calendar's body

      let daysHelper = "";

      for (let days = 1; days < indexFirstWeekDay + 1; days++) {
        daysHelper += `<div class='monthDay'></div>`;
        document.querySelector(".monthDays").innerHTML = daysHelper;
      }

      for (let days = 1; days <= daysInCurrentMonth; days++) {
        if (days === currentDay && currentMonth === new Date().getMonth()) {
          daysHelper += `<div class='currentDay'><p>${days}</p></div>`;
          document.querySelector(".monthDays").innerHTML = daysHelper;
        } else if (monthNow.includes(days)) {
          daysHelper += `<div class='launchDay'><p>${days}</p></div>`;
          document.querySelector(".monthDays").innerHTML = daysHelper;
        } else {
          daysHelper += `<div class='monthDay'><p>${days}</p></div>`;
          document.querySelector(".monthDays").innerHTML = daysHelper;
        }
      }

      // debbuging logs

      console.log("indexFirstWeekDay", indexFirstWeekDay);

      console.log("currentDay", currentDay);

      console.log("daysOfWeek", daysOfWeek);

      console.log("currentMonth", currentMonth);

      console.log("currentDate", currentDate);

      console.log("daysInCurrentMonth", daysInCurrentMonth);

      console.log("launchDates", launchDates);
    };

    // render previous and next months

    document.querySelector(".previousMonth").addEventListener("click", () => {
      date.setMonth(date.getMonth() - 1);
      calendarRender();
    });

    document.querySelector(".nextMonth").addEventListener("click", () => {
      date.setMonth(date.getMonth() + 1);
      calendarRender();
    });

    calendarRender();
  });
