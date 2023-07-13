"use strict";
const submitBtn = document.querySelector("#submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
let main = document.getElementById("main");
let editForm = document.getElementById("container-form");
let editData = JSON.parse(getFromStorage("pet_array"));

const nav = document.querySelector("#sidebar");
// them su kien cho nav
nav.addEventListener("mouseover", function () {
  nav.classList.toggle("active");
});

nav.addEventListener("mouseout", function () {
  nav.classList.add("active");
});
// chuc nang render table body
renderTableData(editData);
function renderTableData(editData) {
  tbody.innerHTML = "";
  for (let pet = 0; pet < editData.length; pet++) {
    let row = document.createElement("tr");

    row.innerHTML = `<th scope="row">${editData[pet].id}
    <td>${editData[pet].petname}</td>
    <td>${editData[pet].age}</td>
    <td>${editData[pet].type}</td>
    <td>${editData[pet].weight} kg</td>
    <td>${editData[pet].length} cm</td>
    <td>${editData[pet].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${editData[pet].color}"></i>
    </td>
    <td><i class="bi ${
      editData[pet].vaccinated == true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    } "></i></td>
    <td><i class="bi ${
      editData[pet].dewormed == true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      editData[pet].sterilized == true
        ? "bi-check-circle-fill"
        : "bi-x-circle-fill"
    } "></i></td>
    <td>${editData[pet].date}</td>
    <td>
      <button

        type="button"
        class="btn btn-warning edit-btn"
        onclick="startEditPet('${editData[pet].id}')"
      >
        Edit
      </button>
    </td>`;
    tbody.appendChild(row);
  }

  // them su kien cho editbtn
  let editBtn = document.getElementsByClassName("edit-btn");
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", function () {
      editForm.classList.remove("hide");
    });
  }
}
// tim pet can edit va them dl vao form
function startEditPet(petId) {
  let pet = editData.filter((el) => {
    console.log(el.id, petId);
    if (el.id == petId) {
      console.log(el);
      idInput.value = el.id;
      nameInput.value = el.petname;
      ageInput.value = el.age;
      typeInput.value = el.type;
      weightInput.value = el.weight;
      lengthInput.value = el.length;
      colorInput.value = el.color;
      if (typeInput.value == "Dog") {
        breedInput.innerHTML = "";
        renderBreed(breedOption);
      } else if (typeInput.value == "Cat") {
        breedInput.innerHTML = "";
        renderBreed(catBreed);
      }
      breedInput.value = el.breed;
      vaccinatedInput.checked = el.vaccinated;
      dewormedInput.checked = el.dewormed;
      sterilizedInput.checked = el.sterilized;
    }
  });
}

const breedOption = [
  "Select Breed",
  "Husky",
  "Mixed Breed",
  "Doberman Pinscher",
];

const catBreed = [
  "Select Breed",
  "Tabby",
  "Domestic Medium Hair",
  "Mixed Breed",
];
// hien thi breed array
function renderBreed(arr) {
  for (let i = 0; i < arr.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = arr[i];
    breedInput.appendChild(option);
  }
}
// GOI EVENT CHO TYPE ADD FUNCTION RENDER BREED
typeInput.addEventListener("change", function (value) {
  if (typeInput.value == "Dog") {
    breedInput.innerHTML = "";
    renderBreed(breedOption);
  } else if (typeInput.value == "Cat") {
    breedInput.innerHTML = "";
    renderBreed(catBreed);
  }
});

//submit btn
let data;
submitBtn.addEventListener("click", function () {
  data = {
    id: idInput.value,
    petname: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date().toDateString(),
  };
  if (validate) {
    editData.filter((el, i) => {
      if (el.id == data.id) {
        el = Object.assign({}, data);
        editData[i] = el;
      }
    });
    renderTableData(editData);
    saveToStorage("pet_array", JSON.stringify(editData));
    editForm.classList.add("hide");
  } else {
    validate(data);
  }
});
// kiem tra input
function validate() {
  if (idInput.value == "" || nameInput.value == "") {
    alert("Please fill in the form");
    return false;
  } else if (data.type === "Select Type") {
    alert("Please select Type");
    return false;
  } else if (ageInput.value < 1 || ageInput.value > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("be between 1 and 100!");
    return false;
  }
}
