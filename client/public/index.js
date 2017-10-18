(function() {
  "use strict";
  window.addEventListener("load", function() {
    var form = document.getElementById("register-form");
    form.addEventListener("submit", function(event) {
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  }, false);
}());

(function() {
  "use strict";
  window.addEventListener("load", function() {
    var form = document.getElementById("login-form");
    form.addEventListener("submit", function(event) {
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  }, false);
}());

(function() {
  "use strict";
  window.addEventListener("load", function() {
    var form = document.getElementById("navLoginForm");
    form.addEventListener("submit", function(event) {
      if (form.checkValidity() == false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  }, false);
}());