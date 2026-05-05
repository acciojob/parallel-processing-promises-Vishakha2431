const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// 🔹 Single image promise
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load ${url}`);
    });
}


function downloadImages() {


    loading.style.display = "block";
    errorDiv.textContent = "";
    output.innerHTML = "";

    const promises = images.map(img => downloadImage(img.url));

    Promise.all(promises)
        .then((imgs) => {
           
            loading.style.display = "none";

       
            imgs.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch((err) => {
         
            loading.style.display = "none";

          
            errorDiv.textContent = err;
        });
}

btn.addEventListener("click", downloadImages);