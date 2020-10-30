import studentApi from "./api/studentApi.js";
import { CITY_MAP } from "./constants.js";

const renderStudentList = (studentList) => {
  const ulElement = document.querySelector("#studentList");

  studentList.forEach((student) => {
    // Get template
    const templateElement = document.querySelector("#studentTemplate");
    if (!templateElement) return;

    // Clone li
    const liElementFromTemplate = templateElement.content.querySelector("li");
    const newLiElement = liElementFromTemplate.cloneNode(true);
    console.log(newLiElement);

    // Fill data
    // set name
    const nameElement = newLiElement.querySelector(".student__name");
    if (nameElement) {
      nameElement.textContent = student.name;
    }

    // set age
    const ageElement = newLiElement.querySelector(".student__age");
    if (ageElement) {
      ageElement.textContent = `Age: ${student.age}`;
    }

    // set gender
    const genderElement = newLiElement.querySelector(".student__gender");
    if (genderElement) {
      genderElement.textContent = `Gender: ${student.gender}`;
    }

    // set city
    const cityElement = newLiElement.querySelector(".student__city");
    if (cityElement) {
      cityElement.textContent = `City: ${CITY_MAP[student.city]}`;
    }

    // Add click event for student div
    const divElement = newLiElement.querySelector(".student");
    if (divElement) {
      divElement.addEventListener("click", () => {
        window.location = `/student-detail.html?id=${student.id}`;
      });
    }

    // Add click event for edit button
    const editElement = newLiElement.querySelector(".edit");
    if (editElement) {
      editElement.addEventListener("click", (e) => {
        // Stop bubbling
        e.stopPropagation();

        window.location = `/add-edit-student.html?id=${student.id}`;
      });
    }

    // Add click event for remove button
    const removeElement = newLiElement.querySelector(".remove");
    if (removeElement) {
      removeElement.addEventListener("click", async (e) => {
        // Stop bubbling
        e.stopPropagation();

        // Ask user whether they want to delete
        const message = `Are you sure to remove student ${student.name}?`;
        if (window.confirm(message)) {
          try {
            await studentApi.remove(student.id);

            // remove li element
            newLiElement.remove();
          } catch (error) {
            console.log("Failed to remove student:", error);
          }
        }
      });
    }

    // Append li to ul
    ulElement.appendChild(newLiElement);
  });
};

const initCitySelect = (city) => {
  const selectElement = document.querySelector("#cityFilter");
  if (selectElement) {
    selectElement.value = city || "hcm";

    selectElement.addEventListener("change", (e) => {
      // console.log("Change: ", e.target.value);
      window.location = `/?city=${e.target.value}`;
    });
  }
};

// MAIN
// IIFE -- iffy
(async function () {
  try {
    // Retrieve city from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");
    const params = { _page: 1, _limit: 10 };
    if (city) {
      params.city = city;
    }

    initCitySelect(city);

    const response = await studentApi.getAll(params);
    const studentList = response.data;

    // hide loading
    const spinnerElement = document.querySelector("#spinner");
    if (spinnerElement) {
      spinnerElement.classList.add("d-none");
    }

    // render
    renderStudentList(studentList);
  } catch (error) {
    console.log("Failed to fetch student list", error);
  }
})();
