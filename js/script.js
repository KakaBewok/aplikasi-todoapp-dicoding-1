document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });
});

document.getElementById("title").addEventListener("input", function () {
  const inputan = document.getElementById("title").value.length;
  const maks = document.getElementById("title").maxLength;
  const sesa = maks - inputan;
  document.getElementById("hitung").innerText = sesa;
  if (sesa == 0) {
    document.getElementById("hitung").innerText = "Maximum limit reached!";
  } else if (sesa <= 5) {
    document.getElementById("notifKarakter").style.color = "red";
    document.getElementById("title").style.color = "red";
  } else {
    document.getElementById("notifKarakter").style.color = "black";
    document.getElementById("title").style.color = "black";
  }
});
