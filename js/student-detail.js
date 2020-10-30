import studentApi from "./api/studentApi.js";

const CITY_MAP = {
  hcm: "TP. HCM",
  hn: "Hà Nội",
  dn: "Đà Nẵng",
  pt: "Phan Thiết",
};
// CITY_MAP.dn

// const cityKey = 'dn'
// CITY_MAP.cityKey
// CITY_MAP[cityKey]

const renderStudent = (student) => {
  const studentElement = document.querySelector("#student");

  // set name
  const nameElement = studentElement.querySelector(".student__name");
  if (nameElement) {
    nameElement.textContent = student.name;
  }

  // set age
  const ageElement = studentElement.querySelector(".student__age");
  if (ageElement) {
    ageElement.textContent = student.age;
  }

  // set gender
  const genderElement = studentElement.querySelector(".student__gender");
  if (genderElement) {
    genderElement.textContent = student.gender;
  }

  // set city
  const cityElement = studentElement.querySelector(".student__city");
  if (cityElement) {
    cityElement.textContent = CITY_MAP[student.city];
  }
};

const main = async () => {
  // 1. Get id from url params
  const params = new URLSearchParams(window.location.search);
  const studentId = params.get("id");

  // 2. Get student list from storage
  // const studentList = JSON.parse(localStorage.getItem("student_list")) || [];

  // 3. Find student based on id
  // const student = studentId ? studentList.find((x) => x.id === +studentId) : {};

  const student = await studentApi.get(studentId);

  // 4. Render
  renderStudent(student);

  // 5. Bind edit link
  const editLinkElement = document.querySelector("#editLink");
  if (editLinkElement) {
    editLinkElement.href = `/add-edit-student.html?id=${studentId}`;
  }
};

main();
