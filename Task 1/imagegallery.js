const galleryContainer = document.getElementById("gallery");

function handleImageClick(event) {
    const image = event.target;
    const container = image.parentElement;
    container.classList.toggle("zoomed");

    if (container.classList.contains("zoomed")) {
        const zoomedImg = document.createElement("div");
        zoomedImg.classList.add("zoomed-image");

        const img = document.createElement("img");
        img.src = image.src;
        img.addEventListener("click", () => {
            zoomedImg.remove();
            container.classList.remove("zoomed");
        });
        zoomedImg.appendChild(img);
        document.body.appendChild(zoomedImg);
    }
}

function addZoomableImageEventListener(image) {
    image.addEventListener("click", handleImageClick);
}

function goBack() {
    window.history.back();
}

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
        const breeds = Object.keys(data.message);

        breeds.forEach(breed => {
            const breedContainer = document.createElement("div");
            breedContainer.classList.add("breed-container");

            const heading = document.createElement("h2");
            heading.textContent = breed;
            breedContainer.appendChild(heading);

            fetch(`https://dog.ceo/api/breed/${breed}/images`)
                .then(response => response.json())
                .then(data => {
                    const images = data.message.slice(0, 20);

                    images.forEach(image => {
                        const img = document.createElement("img");
                        img.classList.add("gallery-image");
                        img.src = image;
                        addZoomableImageEventListener(img);
                        breedContainer.appendChild(img);
                    });

                    galleryContainer.appendChild(breedContainer);
                });
        });
    })
    .catch(error => {
        console.error("Error fetching dog images:", error);
    });
