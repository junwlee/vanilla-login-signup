// document.addEventListener('DOMContentLoaded', function () {
//   const closeButton = document.querySelector('.close-btn');
//   const loginButton = document.querySelector('.btn-login');
//   const signupButton = document.querySelector('.btn-signup');
//
//   // X 이모지 클릭 시 index.html로 이동
//   closeButton.addEventListener('click', function() {
//     window.location.href = 'index.html';
//   });
//
//   // 로그인 버튼 클릭 시 로컬 스토리지 확인 후 처리
//   loginButton.addEventListener('click', function() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const storedPassword = localStorage.getItem(email);
//
//     // 로컬 스토리지에 사용자 정보가 있으면 로그인 처리
//     if (storedPassword && storedPassword === password) {
//       window.location.href = 'index.html';
//     } else {
//       // 없으면 회원가입 유도 메시지와 함께 signup.html로 이동
//       alert('회원 정보가 없습니다. 회원가입을 해주세요.');
//       window.location.href = 'signup.html';
//     }
//   });
//
//   // 회원가입 버튼 클릭 시 signup.html로 이동
//   signupButton.addEventListener('click', function() {
//     window.location.href = 'signup.html';
//   });
// });


document.addEventListener('DOMContentLoaded', function () {
  const closeButton = document.querySelector('.close-btn');
  const loginButton = document.querySelector('.btn-login');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // 정규식
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

  // X 이모지 클릭 시 index.html로 이동
  closeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  // 로그인 버튼 클릭 이벤트
  loginButton.addEventListener('click', function() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const userData = localStorage.getItem(email);

    if (userData) {
      const {password: storedPassword} = JSON.parse(userData);
      if (password === storedPassword) {
        // 로그인 성공 처리
        alert('로그인 성공!');
        window.location.href = 'index.html';
      } else {
        alert('비밀번호가 잘못되었습니다.');
      }
    } else {
      alert('존재하지 않는 사용자입니다.');
    }
  });
});
