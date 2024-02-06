// const form = document.querySelector('#trailer-form');
// const deleteBtn = document.querySelector('#deleteTrailer');

// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     for(let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//     }
//     const actionURL = this.action;
//     try {
//         const trailerNumber = formData.get('number');
//         const res = await fetch(actionURL, {
//             method: 'POST',
//             body: formData
//         });
//         const data = await res.json();
//         console.log(`The actual data: ${JSON.stringify(data)}`);
//         const trailerList = document.querySelector('#trailer-list');
//         const newTrailerItem = document.createElement('li');
//         newTrailerItem.innerHTML = `
//         <li class="list-group-item bg-dark text-light border border-0 d-flex justify-content-between px-3">
//         <p class="m-0 fw-bold">${trailerNumber}</p>
//         <button id="deleteTrailer" class="btn btn-sm btn-danger">Delete</button>
//     </li>
//         `;
//         trailerList.append(newTrailerItem);
//         form.reset();
//     } catch (e) {
//         console.error(e);
//     }
// });

// // This script would be included at the end of your trailer-count-form.ejs, before the closing body tag

// document.addEventListener('DOMContentLoaded', function() {
//     const addTrailerButton = document.getElementById('addTrailer'); // The button to add a trailer
//     const submitButton = document.getElementById('submitTrailers'); // The button to submit all trailers
//     const form = document.getElementById('trailer-form'); // Your form element
//     let trailers = []; // This will hold the list of trailers
  
//     addTrailerButton.addEventListener('click', function(e) {
//       e.preventDefault();
//       const formData = new FormData(form);
  
//       // Create a trailer object
//       const trailer = {};
//       for (let [key, value] of formData.entries()) {
//         trailer[key] = value;
//       }
  
//       // Add the trailer object to the trailers array
//       trailers.push(trailer);
  
//       // Update the DOM to show the trailer in the list
//       updateTrailerList(trailers);
  
//       // Clear the form fields
//       form.reset();
//     });
  
//     submitButton.addEventListener('click', function(e) {
//       e.preventDefault();
//       // Send the trailers array to the server
//       fetch('/yards/:id/trailers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ trailers }), // Send trailers array in the request body
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         // Handle the response from the server
//         // For example, redirect to a confirmation page or show a success message
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//     });
  
//     function updateTrailerList(trailers) {
//       const trailerList = document.getElementById('trailer-list');
//       trailerList.innerHTML = ''; // Clear the current list
  
//       trailers.forEach((trailer, index) => {
//         const trailerItem = document.createElement('li');
//         trailerItem.textContent = `${trailer.number} - ${trailer.type}`;
//         // Add a delete button or link here if you want to allow removing trailers
//         trailerList.appendChild(trailerItem);
//       });
//     }
//   });