window.onload = function () {
  const location = window.location.href;
  const url = new URL(location);
  const searchParams = new URLSearchParams(url.search);

  if (!searchParams.has("id") || searchParams.get("id") == "") {
    window.location.href = "./";
  }
  fetch(
    `https://api.unsplash.com/photos/${searchParams.get(
      "id"
    )}?client_id=${API_KEY}`
  )
    .then(convert_to_json)
    .then(function (data) {
      loadDetail(data);
    });

  const downloadButton = document.querySelector(".DownloadButton");
  downloadButton.addEventListener("click", downloadImage);
};

function loadDetail(data) {
  console.log(data);
  document.getElementById("detailFor").innerText = data.description;
  document.getElementById("detailImage").src = data.urls.regular;
  document.getElementById("detailImage").style.borderColor = data.color;
  document.getElementById("descriptionText").innerText = data.alt_description;
  document.getElementById("username").innerText = data.user.name;
  document.getElementById("likes").innerText = data.likes;
  document.getElementById("date").innerText = data.updated_at.slice(0, 10);
  const imageURL = document.getElementById("detailImage").src;
}
function downloadImage() {
  const imageURL = document.getElementById("detailImage").src;
  const downloadLink = document.createElement("a");
  downloadLink.download = "image";
  downloadLink.href = imageURL;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
