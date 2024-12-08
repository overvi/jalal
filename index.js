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

      console.log(year.textContent);
      year.textContent = moment(
        String(Number(year.textContent) + 1),
        "YYYY/MM/DD"
      ).jYear();
    });

    picker.on("selected", (date) => {
      // Convert selected Gregorian date to Jalali
      const jalaliDate = moment(date).format("jYYYY/jMM/jDD");
      // Display Jalali date in input field
      document.getElementById("litepicker").value = jalaliDate;
    });
  },

  lang: "fa-IR", // Set the language to Persian (fa-IR)
  firstDay: 6, // Persian calendar starts on Saturday

  // Disable the conversion (we will handle it ourselves)
  format: {
    parse(date) {
      // Parse the date manually as Jalali if it's in string format
      if (typeof date === "string") {
        // Use moment to parse the date and set a default day (e.g., '01')
        return moment(date, "jYYYY/jMM/jDD").date(1).toDate(); // Defaults the day to 1
      }
      return date;
    },

    output(date) {
      // Convert date back to Jalali format when outputting
      // Format as "jYYYY/jMM/DD" with the default day (e.g., "1402/09/01")
      return moment(date).format("jYYYY/jMM/DD"); // Use the default day in the output
    },
  },
});
