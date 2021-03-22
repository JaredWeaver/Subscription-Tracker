var userSubs = [];

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var today = new Date();

  let oneSub = {};
  var frequencyNum;
  var frequencyName;

  $.ajax({
    method: 'GET',
    url: '/api/subs'
  }).then((result) => {
    console.log(result);
    userSubs = [];

    //Michel: adding total line at the end of the subs table
    var totalSub=0;

    for (var i = 0; i < result.length; i++) {
      console.log(result[i].name);

      var HTMLIcon = '';

      //Michel: adding the total amount
      totalSub += result[i].amount;

      //Michel: adding the icon in the userTable
      let myIcon;
      let myColor;
      switch (result[i].name.toLowerCase()) {
        case 'netflix':
          myIcon='/assets/images/netflixIcon.jpg';
          myColor='red';
          break;
        case 'disney+':
          myIcon='/assets/images/disneyPlusIcon.jpg';
          myColor='blue';
          break;
        case 'hulu':
          myIcon='/assets/images/huluIcon.jpg';
          myColor='green';
          break;
        case 'prime':
          myIcon='/assets/images/primeIcon.jpg';
          myColor='cyan';
          break;
        case 'costco':
          myIcon='/assets/images/costcoIcon.jpg';
          myColor='pink';
          break;
        default:
          myIcon='';
          break;
      }
      if (myIcon !== '') {
        HTMLIcon=`<img src=${myIcon} width='20px' heigth='20px'>`;
      }

      //Michel: generating frequency variable to add to the user subscriptions table
      //        and to the calendar rrule

      var tableRow = `
      <tr>
      <td>${HTMLIcon}</td>
      <td>${result[i].name}</td>
      <td>\$${result[i].amount.toFixed(2)}</td>
      <td>${result[i].newDue}</td>
      <td>${renew(result[i].renew)}</td>
      <td class="justify-content-center ml-4">
        <a href="#" class="mr-2"><i class="mr-auto fas fa-pencil-alt" data-id="${result[i].id}"></i></a>
        <a href="#"><i class="mr-auto fas fa-trash" data-id="${result[i].id}"></i></a>
      </td>
      </tr>`;
      
      result[i]['color']=myColor;
      $('#userSubTable').append(tableRow);
   
    }

    //Michel: rendering the total Subs amount
    if (totalSub > 0){
      let tableTotal=`
      <tr>
      <td></td>
      <td><span style='font-weight: 900;'>Total</span></td>
      <td><span style='font-weight: 900;'>\$${totalSub}</span></td>
      <td></td>
      <td></td>
      <td></td>
      </tr>`
      $('#userSubTable').append(tableTotal);
    };

    userSubs = result.map(subscription => {
      return {
        title : subscription.name,
        constraint : subscription.amount,
        color: subscription.color,
        rrule: {
          dtstart : subscription.due.substring(0, 10),
          freq: subscription.renew.substring(1,subscription.renew.length),
          interval: parseInt(subscription.renew.charAt(0))
      }
    }
    });
  
    console.log('usersubs',userSubs);
    // });

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listMonth'
      },
      initialDate: today,
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      selectable: true,
      events: userSubs

    });
    console.log('cal open');
    calendar.render();
  });
});

// Duy: Returns a cleaner recurring name for sub table
const renew = (recurring) => {
  var renew;
  switch (recurring) {
      case '1weekly':
        renew = '1 Week';
        break;
      case '2weekly':
        renew = '2 Weeks';
        break;
      case '1monthly':
        renew = '1 Month';
        break;
      case '2monthly':
        renew = '2 Months';
        break;
      case '3monthly':
        renew = '3 Months';
        break;
      case '6monthly':
        renew = '6 Months';
        break;
      case '1yearly':
        renew = '1 Year';
        break;
      case '2yearly':
        renew = '2 Years';
        break;
      case '3yearly':
        renew = '3 Years';
        break;
  }
  return renew;
}

//Jared- Need to add click event for the > arrow on the calendar. When clicked, increment the date + 1 to change the table to match the month shown
$('.buttonIcon').on('click', function(){
alert('next month')
});

// Duy: Delete button that removes selected subscription from user account
$('table').on('click', '.fa-trash', function (event) {
  event.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: `/api/subs/${$(this).attr('data-id')}`,
    success: () => {
      location.reload();
    }
  });
});

$('#add-user').on('click', function (event) {
  event.preventDefault();
  console.log(event);
  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (
    newAccount.password.length > 0 &&
    newAccount.email.length > 0 &&
    newAccount.password.length > 0 &&
    newAccount.lastName.length > 0 &&
    newAccount.firstName.length > 0
  ) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});
$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (
    changeUser.password.length > 0 &&
    changeUser.email.length > 0 &&
    changeUser.password.length > 0 &&
    changeUser.lastName.length > 0 &&
    changeUser.firstName.length > 0
  ) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

// PUT  ***********************

// Duy: Opens up modal to edit selected sub
$('table').on('click', '.fa-pencil-alt', function (event) {
  event.preventDefault();

  $.ajax({
    method: 'GET',
    url: `/api/subs/${$(this).attr('data-id')}`
  }).then((result) => {
    $('#inputSub').val(result.name);
    $('#inputDate').val(result.due),
    $('#inputPrice').val(result.amount),
    $('#inputRenew').val(result.renew),
    $('#edit-sub').attr('data-id', result.id);
    $('#sub-modal').modal('show');
  });
});

// Duy: Updates selected sub with new information
$('#edit-sub').on('click', function (event) {
  event.preventDefault();

  const editSub = {
    name: $('#inputSub').val().trim(),
    due: $('#inputDate').val(),
    amount: $('#inputPrice').val().trim(),
    renew: $('#inputRenew').val(),
  };

  console.log(editSub);

  if (editSub.name.length > 0 && editSub.amount.length > 0 && editSub.due.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/subs/${$(this).data('id')}`,
      data: editSub
    });
    $('#create-err-msg').empty('');
    // $('#create-form').empty('');
    window.location.href = '/';
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// ****************************************

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('.login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});
//Jared - added for responsive burger menu in nav
let hamburger = document.getElementById('hamburger');

let mobileMenu = document.getElementById('mobileView');

hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');

 $('#mobileView').removeClass('hidden');
  
});
