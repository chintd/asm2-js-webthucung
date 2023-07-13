"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const deleteBtn = document.querySelector(".btn-danger");
const tbody = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");
let petArr = JSON.parse(getFromStorage("pet_array"));

let data;
const nav = document.querySelector("#sidebar");
// them su kien cho nav
nav.addEventListener("mouseover", function () {
  nav.classList.toggle("active");
});

nav.addEventListener("mouseout", function () {
  nav.classList.add("active");
});
// function dùng để render breed option
function renderBreed(arr) {
  for (let i = 0; i < arr.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = arr[i];
    breedInput.appendChild(option);
  }
}
// ren
renderBreed(breedOption);
//
const validate = function () {
  if (idInput.value == "") {
    alert("Fill in ID!");
    return false;
  } else if (nameInput.value == "") {
    alert("Fill in pet name!");
    return false;
  } else if (typeInput.value == "Select Type") {
    alert("Fill in type!");
    return false;
  } else if (breedInput.value == "Select Breed") {
    alert("Fill in breed!");
    return false;
  } else {
    return true;
  }
};
// them su kien cho findbtn
let petArrayFiltered;
findBtn.addEventListener("click", function () {
  data = {
    id: idInput.value,
    petname: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  if (validate) {
    petArrayFiltered = petArr.filter((el) => {
      console.log(el.id.includes(data.id));
      if (
        el.id.includes(data.id) &&
        el.petname == data.petname &&
        el.type == data.type &&
        el.breed == data.breed &&
        el.vaccinated == data.vaccinated &&
        el.dewormed == data.dewormed &&
        el.sterilized == data.sterilized
      ) {
        console.log(el);
        return el;
      }
    });
    console.log(petArrayFiltered);
    renderTableData(petArrayFiltered);
  }
});
// reset lai input form
function clearInput() {
  idInput.value = "";
  typeInput.value = "Select Type";
  nameInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
// hien thi table chua du lieu pet
function renderTableData(petArr) {
  tbody.innerHTML = "";
  for (let pet = 0; pet < petArr.length; pet++) {
    const row = document.createElement("tr");

    row.innerHTML = `<th scope="row">${petArr[pet].id}
    <td>${petArr[pet].petname}</td>
    <td>${petArr[pet].age}</td>
    <td>${petArr[pet].type}</td>
    <td>${petArr[pet].weight} kg</td>
    <td>${petArr[pet].length} cm</td>
    <td>${petArr[pet].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[pet].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[pet].vaccinated == true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      petArr[pet].dewormed == true ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[pet].sterilized == true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    } "></i></td>
    <td>${petArr[pet].date}</td>
    `;
    tbody.appendChild(row);
  }
}
