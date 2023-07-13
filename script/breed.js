"use strict";

const tbody = document.querySelector("#tbody");
const breedInput = document.querySelector("#input-breed");
const submitBtn = document.getElementById("submit-btn");
const type = document.getElementById("input-type");
const nav = document.querySelector("#sidebar");
let data;
let breedArray;
// them su kien cho nav
nav.addEventListener("mouseover", function () {
  nav.classList.toggle("active");
});

nav.addEventListener("mouseout", function () {
  nav.classList.add("active");
});
// kiem tra breedArray co ton tai trong localstorage chua
if (getFromStorage("pet_breed") === null) {
  // neu chua co data breed thi tao []
  saveToStorage("pet_breed", "[]");
} else {
  breedArray = JSON.parse(getFromStorage("pet_breed"));
  console.log(breedArray);
  // neu co data breed thi render
  renderBreedTable(breedArray);
}
// tao id tang dan
function getNewId(arr) {
  if (arr.length > 0) {
    return Number(arr[arr.length - 1].id) + 1;
  } else {
    return 1;
  }
}
// clear function
const clearBreed = function () {
  breedInput.value = "";
  type.value = "Select Type";
};
// kiem tra input co du lieu chua
const validateBreed = function (data) {
  if (type.value == "Select Type") {
    alert("please fill in the form!");
    return false;
  } else if (data.breedInput == "") {
    alert("please fill in breed!");
  } else {
    return true;
  }
};

// them su kien cho nut submitBTn
submitBtn.addEventListener("click", function () {
  data = {
    id: getNewId(breedArray),
    breed: breedInput.value,
    type: type.value,
  };

  if (validateBreed(data)) {
    //lay du lieu tu localstorage
    if (isJsonString(getFromStorage("pet_breed"))) {
      // chuyen doi kieu du lieu tu string ve object
      breedArray = JSON.parse(getFromStorage("pet_breed"));
    } else {
      // neu ko co du lieu thi array rong
      breedArray = [];
    }
    breedArray.push(data);
    console.log(breedArray);
    renderBreedTable(breedArray);
    // luu data moi vao localstorage
    saveToStorage("pet_breed", JSON.stringify(breedArray));
    clearBreed();
  } else {
    validateBreed(data);
  }
});

// tao ham delete dua theo Id
function deleteRow(petId) {
  if (confirm("Are you sure?")) {
    let petIndex = breedArray.filter(function (element, index) {
      if (petId == element.id) {
        breedArray = JSON.parse(getFromStorage("pet_breed"));
        breedArray.splice(index, 1);
        renderBreedTable(breedArray);
        saveToStorage("pet_breed", JSON.stringify(breedArray));
      }
    });
  }
}

// ham render breedtable
function renderBreedTable(breedArray) {
  tbody.innerHTML = "";
  for (let pet = 0; pet < breedArray.length; pet++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="col">${breedArray[pet].id}</th>
<th scope="col">${breedArray[pet].breed}</th>
<th scope="col">${breedArray[pet].type}</th>
<th scope="col">
<button
  type="button"
  class="btn btn-danger"
  onclick="deleteRow('${breedArray[pet].id}')"
>
  Delete
</button>
</th>`;
    tbody.appendChild(row);
  }
}
