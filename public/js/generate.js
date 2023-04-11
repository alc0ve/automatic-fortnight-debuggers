// console.log("test");
const apps = [
  "Youtube",
  "TikTok",
  "Uber",
  "Twitter",
  "Instagram",
  "Facebook",
  "To-do list",
  "News app",
  "Spotify",
  "Pinterest",
  "Snapchat",
  "Dating app",
  "WhatsApp",
  "Blog",
  "Search engine",
  "Maps",
  "Airbnb",
  "Instacart",
];

const descriptions = [
  "Programmers",
  "Dogs",
  "Dancers",
  "Dog owners",
  "Wedding planners",
  "Athletes",
  "Teachers",
  "Doctors",
  "Scientists",
  "the elderly",
  "Social workers",
  "Musicians",
  "Mechanics",
  "Foodies",
  "Influencers",
];

const generateButton = document.getElementById("generateButton");
console.log(generateButton);
generateButton.addEventListener("click", () => {
  // program to get a random item from an array

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }
  const randomApp = getRandomItem(apps);
  console.log(randomApp);
  const randomDescription = getRandomItem(descriptions);
  console.log(randomDescription);
  const message = `The ${randomApp} for ${randomDescription}`;
  const generatedIdea = document.getElementById("generatedIdea");
  generatedIdea.innerText = message;
});

const saveIdea = document.getElementById("saveIdea");
saveIdea.addEventListener("click", async () => {
  const description = document.getElementById("generatedIdea").value;
  const response = await fetch("/api/ideas/", {
    method: "POST",
    body: JSON.stringify({ description }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to create your idea!");
  }
  console.log(response);
});

// const saveBtn = document.getElementById("saveIdea");
// saveBtn.addEventListener("click", async () => {
//   const response = await fetch("/api/ideas", {
//     method: "GET",
//   });
//   console.log("got ideas", response);
// });
