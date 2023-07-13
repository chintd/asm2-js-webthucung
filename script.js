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
const healthyBtn = document.querySelector("#healthy-btn");
const deleteBtn = document.querySelector(".btn-danger");
const tbody = document.getElementById("tbody");
let breedArr;
if (getFromStorage("pet_breed") === null) {
  saveToStorage("pet_breed","[]");
} else {
  breedArr = JSON.parse(getFromStorage("pet_breed"));   
  console.log(breedArr, "breedArr")
}
let petArr;
let data;
let breedData;

if (typeof Storage !== "undefined") {
  console.log("co local storage");
} else {
  console.log("no support");
}
// asm2
// ktra co data luu trong localstorage (pet-array) chua
if (getFromStorage("pet_array") === null) {
  saveToStorage("pet_array", "[]");
} else {
  petArr = JSON.parse(getFromStorage("pet_array"));
  console.log(petArr);
  renderTableData(petArr);
}

const nav = document.querySelector("#sidebar");
// them su kien cho nav
nav.addEventListener("mouseover", function () {
  nav.classList.toggle("active");
});

nav.addEventListener("mouseout", function () {
  nav.classList.add("active");
});

// kiểm tra id đã tồn tại hay chưa
function isSameId(element) {
  return data.id == element.id;
}
// validate các trường hợp input chưa đặt yêu cầu
let kiemtra = function () {
  let check;
  if(petArr.length != 0){
    check = petArr.some(isSameId);
  }
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
    alert(" between 1 and 100!");
    return false;
  } else if (check == true) {
    alert("Thú cưng đã tồn tại");
  } else {
    return true;
  }
};
// làm mới lại input form
const clearInput = function () {
  idInput.value = "";
  typeInput.value = "Select Type";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//thêm sự kiện cho submitBtn
submitBtn.addEventListener("click", function () {
  // lấy vào data input
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
  // lấy thông tin breed lưu vào storage để hiện thị trên trang breed
  breedData = {
    id: idInput.value,
    breed: breedInput.value,
    type: typeInput.value,
  };
  let validate = kiemtra(data);
  if (validate) {
    // kiểm tra dư liệu có tồn tại trong localstorage chưa
    if (isJsonString(getFromStorage("pet_array"))) {
      petArr = JSON.parse(getFromStorage("pet_array"));
    } else {
      petArr = [];
    }
    if (isJsonString(getFromStorage("pet_breed"))) {
      breedArr = JSON.parse(getFromStorage("pet_breed"));
    } else {
      breedArr = [];
    }
    breedArr.push(breedData);
    saveToStorage("pet_breed", JSON.stringify(breedArr));
    petArr.push(data);
    renderTableData(petArr);
    saveToStorage("pet_array", JSON.stringify(petArr));
    // clearInput();
  } else {
    kiemtra(data);
  }
});
// hiện thị table chứa dữ liệu các pet
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
    <td>
      <button
        type="button"
        class="btn btn-danger"
        onclick="deleteRow('${petArr[pet].id}')"
      >
        Delete
      </button>
    </td>`;
    tbody.appendChild(row);
  }
}

//  xoa thu cung va cap nhat gia tri trong localStorage
function deleteRow(petId) {
  if (confirm("Are you sure?")) {
    let petIndex = petArr.filter(function (element, index) {
      if (petId == element.id) {
        petArr = JSON.parse(getFromStorage("pet_array"));
        petArr.splice(index, 1);
        renderTableData(petArr);
        saveToStorage("pet_array", JSON.stringify(petArr));
      }
    });
  }
}

let healthyPetArr = [];
let healthyCheck = false;

healthyBtn.addEventListener("click", function () {
  // đổi trạng thái của Button màu vàng
  // lọc thú khỏe
  // hiển thị dựa vào trạng thái
  if (healthyCheck) {
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  } else {
    healthyCheck = true;
    healthyBtn.textContent = "Show All Pet";
    healthyPetArr = [];
    for (let b = 0; b < petArr.length; b++) {
      if (
        petArr[b].vaccinated === true &&
        petArr[b].sterilized === true &&
        petArr[b].dewormed === true
      ) {
        healthyPetArr.push(petArr[b]);
        console.log(healthyPetArr);
      }
    }
    renderTableData(healthyPetArr);
  }
});
// tao option cho breed
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
