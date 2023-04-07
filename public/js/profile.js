const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#idea-desc").value.trim();

  if (description) {
    const response = await fetch(`/api/ideas`, {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create your idea!");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/ideas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete idea.");
    }
  }
};

document
  .querySelector(".new-idea-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".idea-list")
  .addEventListener("click", delButtonHandler);
