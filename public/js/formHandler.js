const form = document.querySelector('#trailer-form');
const deleteBtn = document.querySelector('#deleteTrailer');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    for(let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    const actionURL = this.action;
    try {
        const trailerNumber = formData.get('number');
        const res = await fetch(actionURL, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        console.log(`The actual data: ${JSON.stringify(data)}`);
        const trailerList = document.querySelector('#trailer-list');
        const newTrailerItem = document.createElement('li');
        newTrailerItem.innerHTML = `
        <li class="list-group-item bg-dark text-light border border-0 d-flex justify-content-between px-3">
        <p class="m-0 fw-bold">${trailerNumber}</p>
        <button id="deleteTrailer" class="btn btn-sm btn-danger">Delete</button>
    </li>
        `;
        trailerList.append(newTrailerItem);
        form.reset();
    } catch (e) {
        console.error(e);
    }
});