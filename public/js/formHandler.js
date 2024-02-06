const form = document.querySelector('#trailer-form');
const yardId = form.getAttribute('data-yard-id');
const trailerList = document.querySelector('#trailer-list');
const addTrailerBtn = document.querySelector('#addTrailerBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const submitBtn = document.querySelector('#submitBtn');

let trailers = [];

addTrailerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const trailer = {};
    for (let [key, value] of formData.entries()) {
        console.log(`In for loop: ${key}: ${value}`);
        trailer[key] = value;
    }
    console.log(trailer);
    trailers.push(trailer);
    console.log(trailers);
    updateTrailerList(trailers);
    form.reset();
});

function updateTrailerList(trailers) {
    trailerList.innerHTML = '';
    trailers.forEach((trailer, index) => {
        const trailerItem = document.createElement('li');
        trailerItem.innerHTML = `
        <li class="list-group-item bg-dark text-light border border-0 d-flex justify-content-between px-3">
        <p class="m-0 fw-bold">${trailer.number}</p>
        <button id="deleteBtn" class="btn btn-sm btn-danger">Delete</button>
        </li>
        `;
        trailerList.appendChild(trailerItem);
    });
};