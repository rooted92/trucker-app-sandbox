const form = document.querySelector('#trailer-form');
const yardId = form.getAttribute('data-yard-id');
const trailerList = document.querySelector('#trailer-list');
const addTrailerBtn = document.querySelector('#addTrailerBtn');
const submitBtn = document.querySelector('#submitBtn');

let trailers = [];

addTrailerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    form.classList.remove('was-validated');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const trailer = {};
        for (let [key, value] of formData.entries()) {
            trailer[key] = value;
        }
        trailers.push(trailer);
        updateTrailerList(trailers);
        form.reset();
    } else {
        form.classList.add('was-validated');
    }
});



function updateTrailerList(trailers) {
    trailerList.innerHTML = '';
    trailers.forEach((trailer, index) => {
        const trailerItem = document.createElement('li');
        trailerItem.className = 'list-group-item-dark d-flex justify-content-between px-3 mb-3';
        trailerItem.innerHTML = `
        <p id="trailerNumber" data-trailer-number="${trailer.number}" class="m-0 fw-bold">${trailer.number}</p>
        <button class="btn btn-sm btn-danger" type="button">Delete</button>
        `;
        let deleteBtn = trailerItem.querySelector('.btn-danger');
        deleteBtn.addEventListener('click', function () {
            trailers = trailers.filter(t => { return t.number !== trailer.number });
            updateTrailerList(trailers);
        });
        trailerList.appendChild(trailerItem);
    });
};