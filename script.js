// Selecting the necessary elements from the HTML
const form = document.getElementById("timesheet-form");
const calculateButton = document.getElementById("calculate-btn");
const totalHoursDisplay = document.getElementById("total-hours");
const totalPayDisplay = document.getElementById("total-pay");


// Event listener for the "Calculate" button
calculateButton.addEventListener("click", () => {
  // Get the day sections
  const daySections = form.querySelectorAll(".day-entry");

  // Initialize variables for total hours and total pay
  let totalHours = 0;
  let totalPay = 0;

  // Loop through each day section and calculate hours and pay
  daySections.forEach(daySection => {
    // Find the input elements for start and end times within the day section
    const startTimeInput = daySection.querySelector("input[type='time']:first-of-type");
    const endTimeInput = daySection.querySelector("input[type='time']:last-of-type");

    // Check if both start and end times are provided
    if (startTimeInput.value && endTimeInput.value) {
      const currentDate = new Date();
      const startTime = new Date(currentDate.toDateString() + " " + startTimeInput.value);
      const endTime = new Date(currentDate.toDateString() + " " + endTimeInput.value);
      
      const hoursWorked = (endTime - startTime) / (1000 * 60 * 60);
      totalHours += hoursWorked;
      
      // Deduct lunch break hours (30 minutes)
      totalHours -= 0.5;
    }
  });

  // Calculate total pay (assuming $30 per hour)
  totalPay = totalHours * 30;

  // Display total hours and total pay
  totalHoursDisplay.textContent = totalHours.toFixed(2);
  totalPayDisplay.textContent = totalPay.toFixed(2);
});
