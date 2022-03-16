function validate() {
  const v1 = document.getElementById("password");
  const v2 = document.getElementById("c-password");
  const v3 = document.getElementById("email");
  const v4 = document.getElementById("pno");
  if (v1.value != v2.value) {
    alert("Passwords do not match");
    v1.value = "";
    v2.value = "";
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v3.value) == false
  ) {
    alert("Invalid Email");
    v3.value = "";
  } else if (/^\d{10}$/.test(v4.value) == false) {
    alert("Invalid Phone Number");
    v4.value = "";
  }
}
