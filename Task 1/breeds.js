const apiKey = 'H82YIBvawrWPm0WTfU6QPQXeQaCBtQDMTssiHrcR';
const breedsUrl = 'https://dog.ceo/api/breeds/list/all';
const dogInfoUrl = 'https://api.api-ninjas.com/v1/dogs?name=';

function goBack() {
    window.history.back();
}

async function fetchDogBreeds() {
    try {
        const response = await fetch(breedsUrl);
        const data = await response.json();

        if (data.status === 'success') {
            const breeds = Object.keys(data.message);
            await fetchDogInfo(breeds);
        } else {
            console.log('Failed to fetch dog breeds.');
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

async function fetchDogInfo(breeds) {
    try {
        const container = document.getElementById('cardContainer');

        for (const breed of breeds) {
            const response = await fetch(`${dogInfoUrl}${breed}`, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });
            const data = await response.json();
            if (data.length > 0) {
                const dogInfo = data[0];
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3');
                card.style.maxWidth = '50%';
                const row = document.createElement('div');
                row.classList.add('row', 'g-0');
                card.appendChild(row);
                const imageCol = document.createElement('div');
                imageCol.classList.add('col-md-4');
                row.appendChild(imageCol);
                const image = document.createElement('img');
                image.classList.add('img-fluid', 'rounded-start');
                image.src = dogInfo.image_link;
                image.alt = dogInfo.name;
                imageCol.appendChild(image);
                const contentCol = document.createElement('div');
                contentCol.classList.add('col-md-8');
                row.appendChild(contentCol);
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                contentCol.appendChild(cardBody);
                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = dogInfo.name;
                cardBody.appendChild(title);
                const text = document.createElement('p');
                text.classList.add('card-text');
                text.innerHTML = `Life expectancy: ${dogInfo.min_life_expectancy}-${dogInfo.max_life_expectancy} Years<br>Weight:(male) ${dogInfo.min_weight_male}-${dogInfo.max_weight_male} (female) ${dogInfo.min_weight_female}-${dogInfo.max_weight_female} Pound<br>
                Height:(male) ${dogInfo.min_height_male}-${dogInfo.max_height_male} (female) ${dogInfo.min_height_female}-${dogInfo.max_height_female} Inch`;
                cardBody.appendChild(text);
                const breedDesciption = document.createElement('p');
                breedDesciption.classList.add('card-text');
                const breedDesciptionSmall = document.createElement('small');
                breedDesciptionSmall.classList.add('text-body-secondary');
                breedDesciptionSmall.innerHTML = `Kids Friendly: ${dogInfo.good_with_children}<br>Dog Friendly: ${dogInfo.good_with_other_dogs}<br>Coat: ${dogInfo.coat_length}<br>Trainability: ${dogInfo.trainability}<br>Protectiveness: ${dogInfo.protectiveness}`;
                breedDesciption.appendChild(breedDesciptionSmall);
                cardBody.appendChild(breedDesciption);
                container.appendChild(card);
            } else {
                console.log(`No information available for breed: ${breed}`);
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}
fetchDogBreeds();