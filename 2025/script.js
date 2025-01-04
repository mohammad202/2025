//Add users
function showForm() {
  const form = document.getElementById("addUser");
  form.style.display = "block"; // Show the form
}

function hideForm() {
  const form = document.getElementById("addUser");
  form.style.display = "none"; // Hide the form
  form.reset(); // Reset the form fields
}

function addUser(event) {
  event.preventDefault(); // Prevent page refresh

  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (userName && email && phone) {
    alert(`تم إضافة المستخدم: ${userName}`);
    hideForm(); // Hide and reset the form after submission
  } else {
    alert("يرجى ملء جميع الحقول بشكل صحيح.");
  }
}
function addUser(event) {
  event.preventDefault();
  alert("تم إضافة المستخدم بنجاح!");
  hideForm();
}

//Sort table
const sortStates = {}; // Track sort states for columns

function sortTable(header, colIndex) {
  const table = header.closest("table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.rows);

  // Determine the current sort order for the column
  const sortOrder = (sortStates[colIndex] = !(sortStates[colIndex] || false));

  rows.sort((a, b) => {
    const colA = a.cells[colIndex].textContent.trim();
    const colB = b.cells[colIndex].textContent.trim();

    if (!isNaN(Date.parse(colA))) {
      // Date comparison
      return sortOrder
        ? new Date(colA) - new Date(colB)
        : new Date(colB) - new Date(colA);
    } else if (!isNaN(colA) && !isNaN(colB)) {
      // Numeric comparison
      return sortOrder ? colA - colB : colB - colA;
    } else {
      // String comparison
      return sortOrder ? colA.localeCompare(colB) : colB.localeCompare(colA);
    }
  });

  // Update the rows in the table
  rows.forEach((row) => tbody.appendChild(row));

  // Update the sorting icons
  const icons = header.querySelector("i");
  if (icons) {
    icons.classList.toggle("bi-arrow-up", sortOrder);
    icons.classList.toggle("bi-arrow-down", !sortOrder);
  }
}
