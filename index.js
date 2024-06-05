let container = document.getElementById("container");
      let showbutton = document.getElementById("showAllButton");
      showbutton.style.display = "none";

      async function searchResults() {
        let value = document.getElementById("text").value;
        let array = await fetchedData(value);
        showDetails(array);
        let showAllButton = document.createElement("button");
        showAllButton.id = "showAllButton";
        showAllButton.innerText = "Show All";

        showbutton.appendChild(showAllButton);
        showbutton.style.display = "block";
        showAllButton.addEventListener("click", function () {
          showFullDetails(array);
          showbutton.remove();
        });
        return array;
      }

      function showDetails(filteredArray) {
        container.innerHTML = "";
        for (let i = 0; i < 8; i++) {
          let element = filteredArray[i];
          let card = `<div class="card">
                <img src="${element.image}" alt="${element.slug}">
                <div>${element.slug}</div>
                <h3>There are many variations of passages of available, but the majority have suffered</h3>
                <button class="showDesc" onclick="showDesc('${element.slug}', '${element.image}', '${element.brand}')">SHOW DETAILS</button>
            </div>`;
          container.innerHTML += card;
        }
      }

      function showFullDetails(filteredArray) {
        container.innerHTML = "";
        filteredArray.forEach((element) => {
          let card = `<div class="card">
                <img src="${element.image}" alt="${element.slug}">
                <div>${element.slug}</div>
                <h3>There are many variations of passages of available, but the majority have suffered</h3>
                <button class="showDesc" onclick="showDesc('${element.slug}', '${element.image}', '${element.brand}')">SHOW DETAILS</button>
            </div>`;
          container.innerHTML += card;
        });
      }

      async function fetchedData(searchText) {
        let data = await fetch(
          `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        );
        let res = await data.json();
        return res.data;
      }

      function showDesc(slug, image, brand) {
        let modal = document.getElementById("modal");
        let modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
            <img src="${image}" alt="${slug}">
            <h2>${slug}</h2>
            <p><strong>Brand:</strong> ${brand}</p>
            <p><strong>Storage:</strong> 64GB/256GB/512GB storage, no card slot</p>
        <p><strong>Display Size:</strong> 5.8 inches, 84.4 cm2 (~82.1% screen-to-body ratio)</p>
        <p><strong>Chipset:</strong> Apple A13 Bionic (7 nm+)</p>
        <p><strong>Memory:</strong> 64GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM</p>
        <p><strong>Sensors:</strong> Face ID, accelerometer, gyro, proximity, compass, barometer</p>
        <p><strong>Released:</strong> 2019, September 20</p>
        `;
        modal.style.display = "block";
      }

      function closeModal() {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
      }

      // Close the modal when clicking outside of it
      window.onclick = function (event) {
        let modal = document.getElementById("modal");
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };