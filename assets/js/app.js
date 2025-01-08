// تحميل المكونات ديناميكيًا
function loadComponent(id, file) {
  fetch(`components/${file}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    })
    .catch((err) => console.error(`Failed to load ${file}:`, err));
}

// تحميل الشريط الجانبي والمكونات عند بداية التشغيل
window.onload = function () {
  loadComponent("sidebar", "sidebar.html");
  loadComponent("main-content", "users.html"); // افتراضي: تحميل إدارة المستخدمين
  loadComponent("footer", "footer.html");

  // إضافة حدث لتغيير المحتوى الرئيسي بناءً على الروابط
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("load-link")) {
      event.preventDefault(); // منع السلوك الافتراضي
      const page = event.target.dataset.page; // الحصول على اسم الملف من data-page
      loadComponent("main-content", page); // تحميل الصفحة المختارة
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior of anchor links
      sidebarLinks.forEach((l) => l.classList.remove("active")); // Remove active class
      this.classList.add("active"); // Add active class to clicked link
    });
  });
});
