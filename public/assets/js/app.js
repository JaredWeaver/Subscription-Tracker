const addUserBtn = document.getElementById('add-user');
const createErrMsg = document.getElementById('create-err-msg');
const updateUserBtn = document.getElementById('update-user');
const changeUserModal = document.getElementById('change-user-modal')
const errMsg = document.getElementById('err-msg');
const updateErrMsg = document.getElementById('update-err-msg');
const deleteUserBtn = document.getElementById('delete-user');
const deleteUserModal = document.getElementById('delete-user-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const registerBtn = document.getElementById('register');
const loginModal = document.getElementById('login-modal');
const goHomeBtn = document.getElementById('go-home');
const loginBtn = document.getElementById('login');
const userInfoModal = document.getElementById('user-info');
const loginErrMsg = document.getElementById('login-err-msg');

console.log(addUserBtn);

addUserBtn.addEventListener('click', (e) => {
  console.log(e);
  e.preventDefault();

  const newAccount = {
    firstName: document.getElementById('inputFirst').value.trim(),
    lastName: document.getElementById('inputLast').value.trim(),
    email: document.getElementById('inputEmail').value.trim(),
    password: document.getElementById('inputPassword').value.trim(),
  };

  if (
    newAccount.password.length > 0 &&
    newAccount.email.length > 0 &&
    newAccount.password.length > 0 &&
    newAccount.lastName.length > 0 &&
    newAccount.firstName.length > 0
  ) {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    }).then((response) => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    createErrMsg.textContent = '**Please fill out entire form**';
  }
});

updateUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  //   const id = $(this).data('id');
  const id = e.target.getAttribute('data-id'); //Jared - need to add foreach??

  const changeUser = {
    firstName: document.getElementById('inputFirst').value.trim(),
    lastName: document.getElementById('inputLast').value.trim(),
    email: document.getElementById('inputEmail').value.trim(),
    password: document.getElementById('inputPassword').value.trim(),
  };

  errMsg.value = '';
  changeUserModal.style.display = 'block';
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (
    changeUser.password.length > 0 &&
    changeUser.email.length > 0 &&
    changeUser.password.length > 0 &&
    changeUser.lastName.length > 0 &&
    changeUser.firstName.length > 0
  ) {
    fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(changeUser),
    }).then((result) => {
      console.log('Updated user:', result);
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    updateErrMsg.textContent = '**Please fill out entire form**';
    //JARED --> not sure if this is proper syntax
  }
});


deleteUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  errMsg.value = '';

  deleteUserModal.style.display = 'block';
});


confirmDeleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const id = e.target.getAttribute('data-id'); //Jared - need to add foreach??

  const deleteUser = {

    email: document.getElementById('userEmail').value.trim(),
    password: document.getElementById('userPassword').value.trim(),
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    fetch(`/api/user/confirm`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteUser),
    }).then((result) => {
      if (result) {
        fetch(`/api/user/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deleteUser),
        }).then(() => {
          console.log('deleted user:', deleteUser);
          window.location.href = '/logout';
        });
      } else {
        errMsg.textContent = 'Wrong Credentials!';
      }
    });
  } else {
    //     console.log('fill out entire form');
    //     $('#err-msg').empty('').text('fill out entire form');
    console.log('fill out the entire form');
    errMsg.textContent = 'Fill out the entire form!';
  }
});

// $('#register').on('click', function (event) {
registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/register';
});

// $('#login-modal').on('click', function (event) {
loginModal.addEventListener('click', (e) => {
  e.preventDefault();

  userInfoModal.style.display = 'block';

  // $('#user-info').modal('show');
});

// $('#go-home').on('click', function (event) {
goHomeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/';
});

// $('#login').on('click', function (event) {
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newAccount = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('user_password').value.trim(),
    // email: $('#email').val().trim(),
    // password: $('#user_password').val().trim(),
  };

  fetch('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAccount),
  }).then((response) => {
    if (response.loggedIn) {
      window.location.href = '/dashboard'; //Jared - might not be correct syntax here
    } else {
      loginErrMsg.value = '';
      userInfoModal.style.display = 'none';
    }
  });
  //   $.post('/api/login', user, (result) => {
  //     // console.log(result);
  //     if (result.loggedIn) {
  //       $(document.location).attr('href', '/dashboard');
  //     } else {
  //       $('#login-err-msg').empty('').text(result.error);
  //       $('#user-info').modal('hide');
  //     }
  //   });
});
