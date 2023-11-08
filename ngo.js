function startCounters() {
  let valueDisplays = document.querySelectorAll(".num");

  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    
    // Calculate step based on data-val
    let step = Math.max(1, Math.floor(endValue / 520)); // Adjust as needed

    let counter = setInterval(function () {
      startValue += step;
      if (startValue > endValue) {
        // Ensure we reach the final value exactly
        startValue = endValue;
        clearInterval(counter);
      }
      valueDisplay.textContent = startValue;
    }, duration);
  });
}

// Set the interval
let interval =4000;


startCounters();
