document.addEventListener('DOMContentLoaded', function () {
  const closeButton = document.querySelector('.close-btn');
  const loginButton = document.querySelector('.btn-login');
  const signupForm = document.getElementById('signupForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');

  // 정규식
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const NAME_REGEX = /^[가-힣]{2,5}$/; // 한글 이름 정규식
  const PHONE_REGEX = /^\d{10,11}$/;

  function updateInfoMessage(inputElement, isValid, message) {
    let infoParagraph = inputElement.nextElementSibling || document.createElement('p');
    infoParagraph.textContent = message;
    if (isValid) {
      infoParagraph.style.color = 'green';
    } else {
      infoParagraph.style.color = 'red';
    }
    if (!inputElement.nextElementSibling) {
      inputElement.parentNode.insertBefore(infoParagraph, inputElement.nextSibling);
    }
  }

  emailInput.addEventListener('input', function() {
    const isValid = EMAIL_REGEX.test(emailInput.value);
    updateInfoMessage(emailInput, isValid, isValid ? '유효한 이메일 형식입니다.' : '유효한 이메일을 입력해주세요.');
  });

  passwordInput.addEventListener('input', function() {
    const isValid = PWD_REGEX.test(passwordInput.value);
    updateInfoMessage(passwordInput, isValid, isValid ? '유효한 비밀번호 형식입니다.' : '비밀번호는 8~24자, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
  });

  nameInput.addEventListener('input', function() {
    const isValid = NAME_REGEX.test(nameInput.value);
    updateInfoMessage(nameInput, isValid, isValid ? '올바른 이름 형식입니다.' : '이름은 2~5글자의 한글이어야 합니다.');
  });

  phoneInput.addEventListener('input', function() {
    const isValid = PHONE_REGEX.test(phoneInput.value);
    updateInfoMessage(phoneInput, isValid, isValid ? '유효한 휴대전화번호 형식입니다.' : '휴대전화번호는 10~11자리의 숫자만 가능합니다.');
  });

  // X 이모지 클릭 시 index.html로 이동
  closeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  // 로그인 버튼 클릭 시 login.html로 이동
  loginButton.addEventListener('click', function() {
    window.location.href = 'login.html';
  });

  // 회원가입 폼 제출 로직
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const isValidName = NAME_REGEX.test(nameInput.value);
    const isValidEmail = EMAIL_REGEX.test(emailInput.value);
    const isValidPassword = PWD_REGEX.test(passwordInput.value);
    const isValidPhone = PHONE_REGEX.test(phoneInput.value);

    if (!isValidName || !isValidEmail || !isValidPassword || !isValidPhone) {
      alert('입력하신 정보를 다시 확인해주세요.');
      return; // 폼 제출 중단
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const phone = phoneInput.value;

    // 사용자 정보를 로컬 스토리지에 저장
    localStorage.setItem(email, JSON.stringify({password, name, phone}));

    alert(`${name}님, 회원가입이 완료되었습니다.`);
    window.location.href = 'index.html';
  });
});
