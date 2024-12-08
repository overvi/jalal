moment.locale("en", { useGregorianParser: true });

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const reverse = weekDays.reverse();

const picker = new Litepicker({
  element: document.getElementById("litepicker"),

  setup: (picker) => {
    picker.on("render:month", (month, date) => {
      const year = month.querySelector(".month-item-year");
      const days = month.querySelector(".month-item-weekdays-row");

      days.innerHTML = "";

      reverse.forEach((day) => {
        let dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.classList.add("week-day");
        days.appendChild(dayDiv);
      });

      year.style.fontFamily = "Yekan";

      year.textContent = moment(
        String(Number(year.textContent) + 1),
        "YYYY/MM/DD"
      ).jYear();
    });
  },

  lang: "fa-IR", // Set the language to Persian (fa-IR)
  firstDay: 6, // Persian calendar starts on Saturday

  // Disable the conversion (we will handle it ourselves)
  format: {
    parse(date) {
      return moment(date, "en", "YYYY/MM/DD").toDate();
    },

    output(date) {
      return moment(date).format("YYYY/MM/DD");
    },
  },
});
