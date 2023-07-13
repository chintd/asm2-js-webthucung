"use strict";

let fileSource = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
let petList = JSON.parse(getFromStorage("pet_array"));
// them su kien tai file xuong
exportBtn.addEventListener("click", function () {
  // chuyen du lieu ve dang string
  let exportFile = JSON.stringify(petList);
  // chuyen ve dang blob
  var blob = new Blob([exportFile], { type: "text/plain;charset=utf-8" });
  // luu ve may
  saveAs(blob, "pet-lists.json");
});
// them su kien tai file len
importBtn.addEventListener("click", function () {
  let fileSourceBlob = fileSource.files[0];
  // neu da chon file thi doc file
  if (fileSourceBlob) {
    var reader = new FileReader();
    reader.readAsText(fileSourceBlob);
    reader.onload = function (evt) {
      console.log(evt.target.result);
      // luu vao localstorage
      saveToStorage("pet_array", evt.target.result);
      // reset lai input
      fileSource.value = "";
    };
    // hien thi neu co loi
    reader.onerror = function (evt) {
      console.log("error reading file");
    };
  }
});
