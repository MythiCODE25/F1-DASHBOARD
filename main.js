import loadConstructors from "./js/constructors.js";
import loadDrivers from "./js/drivers.js"


export function showLoader(){
    // document.getElementById("content").innerHTML = "Loading..."
    document.getElementById("loader-container").className = "loader"
}
export function showError() {
  let loader = document.getElementById("loader-container");
  loader.classList.remove("loader")
  loader.innerHTML = `<p style="text-align:center">Something went wrong ❌</p>`;
}

document.getElementById("driversTab").addEventListener("click",loadDrivers)
document.getElementById("constructorsTab").addEventListener("click",loadConstructors)