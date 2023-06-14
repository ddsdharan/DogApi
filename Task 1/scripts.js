fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        const breeds = data.message;
        const breedContainer = document.querySelector('.breed-container');
        const subBreedContainer = document.querySelector('.subbreed-container');
        const sortedBreeds = Object.keys(breeds).sort();
        const sortedBreedsWithSubBreeds = sortedBreeds.filter(breed => breeds[breed].length > 0);
        const sortedBreedsWithoutSubBreeds = sortedBreeds.filter(breed => breeds[breed].length === 0);
        const sortedBreedsCombined = sortedBreedsWithoutSubBreeds.concat(sortedBreedsWithSubBreeds);

        sortedBreedsCombined.forEach(breed => {
            const subBreeds = breeds[breed];
            const capitalizedBreed = capitalizeString(breed);
            const breedLi = document.createElement('li');
            breedLi.textContent = capitalizedBreed;

            if (subBreeds.length > 0) {
                const subBreedsUl = document.createElement('ul');
                const subBreedLi = document.createElement('ul');
                subBreedLi.textContent = 'Sub-breed:';
                subBreedsUl.appendChild(subBreedLi);

                subBreeds.forEach(subBreed => {
                    const capitalizedSubBreed = capitalizeString(subBreed);
                    const subBreedLi = document.createElement('ul');
                    subBreedLi.textContent = capitalizedSubBreed + " " + capitalizedBreed;
                    subBreedsUl.appendChild(subBreedLi);
                });

                const breedContainerLi = document.createElement('p');
                breedContainerLi.appendChild(breedLi);
                breedContainerLi.appendChild(subBreedsUl);
                subBreedContainer.appendChild(breedContainerLi);
            } else {
                breedContainer.appendChild(breedLi);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function goBack() {
    window.history.back();
}

const apiUrl = 'https://dogapi.dog/api/v2/facts';

function fetchFact() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const fact = data.data[0].attributes.body;
            const leadElements = document.querySelectorAll('.fact');
            leadElements.forEach(element => {
                element.textContent = fact;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
fetchFact();
setInterval(fetchFact, 10000);