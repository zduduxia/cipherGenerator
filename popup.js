document.addEventListener("DOMContentLoaded", function () {
  var generateButton = document.getElementById("generate");
  var copyButton = document.getElementById("copy");

  generateButton.addEventListener("click", generatePasswords);
  copyButton.addEventListener("click", copyToClipboard);
});

function generatePasswords() {
  var quantity = document.getElementById("quantity").value;
  var length = document.getElementById("length").value;
  var exclude = document.getElementById("exclude").value;
  var charOptions = document.querySelectorAll(".char-option:checked");

  var charset = "";
  charOptions.forEach(function (option) {
    var value = option.value;
    if (value === "a-z") {
      charset += "abcdefghijklmnopqrstuvwxyz";
    } else if (value === "A-Z") {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (value === "0-9") {
      charset += "0123456789";
    } else if (value === "!@#$%^&") {
      charset += "!@#$%^&*";
    }
  });

  var passwords = [];
  for (var i = 0; i < quantity; i++) {
    passwords.push(generatePassword(length, charset, exclude));
  }

  displayPasswords(passwords);
}

function generatePassword(length, charset, exclude) {
  var password = "";
  while (password.length < length) {
    var character = charset.charAt(Math.floor(Math.random() * charset.length));
    if (exclude.indexOf(character) === -1) {
      password += character;
    }
  }
  return password;
}

function displayPasswords(passwords) {
  var passwordsContainer = document.getElementById("passwords");
  passwordsContainer.innerHTML = "";
  passwords.forEach(function (password) {
    var passwordElement = document.createElement("p");
    passwordElement.textContent = password;
    passwordsContainer.appendChild(passwordElement);
  });
}

function copyToClipboard() {
  var passwords = Array.from(document.querySelectorAll("#passwords p")).map(
    function (p) {
      return p.textContent;
    }
  );

  var textarea = document.createElement("textarea");
  textarea.value = passwords.join("\n");
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showCopiedMessage();
}

function showCopiedMessage() {
    var successMessage = document.getElementById("success-message");
    // 检查是否已经存在复制成功的提示元素，如果存在则先移除
    if (successMessage) {
      successMessage.remove();
    }
    
    successMessage = document.createElement("div");
    successMessage.id = "success-message";
    successMessage.textContent = "复制成功";
    
    document.body.appendChild(successMessage);
    
    // 3秒后自动消失
    setTimeout(function() {
      successMessage.remove();
    }, 3000);
}
