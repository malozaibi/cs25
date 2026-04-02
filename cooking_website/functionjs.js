document.getElementById("book_a_table").onclick = function () {
  window.location.href = "./code3.html";
};

document.getElementById("menu_button").onclick = function () {
  window.location.href = "./code2.html";
};

document.getElementById("input_email_button").addEventListener("click", check_email )



function check_email() {
  var email = document.getElementById("input_email").value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email)) {
    alert("Reservation successful ");
  } else {
    alert("Please enter a valid email ");
  }
}