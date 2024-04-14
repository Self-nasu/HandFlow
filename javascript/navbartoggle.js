// Select the first element with class "left-bar" (assuming only one)
var leftBar = document.getElementsByClassName("left-bar")[0];

// Initial state (left-bar hidden)
let isLeftBarVisible = false;

function toggleLeftBar() {
  // Toggle visibility based on current state
  leftBar.style.display = isLeftBarVisible ? "none" : "flex";

  // Update state for next toggle
  isLeftBarVisible = !isLeftBarVisible;
}

// Attach click event listener to the toggle button
document.querySelector(".navlink.toggle-btn").addEventListener("click", toggleLeftBar);
