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
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].name);

      //Michel: adding the icon in the userTable
      let myIcon;
      switch (result[i].name.toLowerCase()) {
        case 'netflix':
          myIcon='/assets/images/netflixIcon.jpg';
          break;
        case 'disney+':
          myIcon='/assets/images/disneyPlusIcon.jpg';
          break;
        case 'hulu':
          myIcon='/assets/images/huluIcon.jpg';
          break;
        case 'prime':
          myIcon='/assets/images/primeIcon.jpg';
          break;
        case 'costco':
          myIcon='/assets/images/costcoIcon.jpg';
          break;
        default:
          break;
      }
      const HTMLIcon=`<img src=${myIcon} width='20px' heigth='20px'>`;

      //Michel: generating frequency variable to add to the user subscriptions table
      //        and to the calendar rrule

      var tableRow = `
      <tr>
      <td>${HTMLIcon}</td>
      <td>${result[i].name}</td>
      <td>\$${result[i].amount}</td>
      <td>${result[i].newDue}</td>
      <td>${result[i].renew}</td>
      <td class="justify-content-center ml-4">
        <a href="#" class="mr-2"><i class="mr-auto fas fa-pencil-alt" data-id="${result[i].id}"></i></a>
        <a href="#"><i class="mr-auto fas fa-trash" data-id="${result[i].id}"></i></a>
      </td>
      </tr>`;
      $('#userSubTable').append(tableRow);
   
    }
    userSubs = result.map(subscription => {
      return {
        title : subscription.name,
        constraint : subscription.amount,
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
      // [
      // {
      //   title: 'Netflix',
      //   start: '2021-03-20',
      //   constraint: '13.99'
      // },
      // {
      //   title: 'Meeting',
      //   start: '2020-09-13T11:00:00',
      //   constraint: 'availableForMeeting', // defined below
      //   color: '#257e4a'
      // },
      // {
      //   title: 'Conference',
      //   start: '2020-09-18',
      //   end: '2020-09-20'
      // },
      // {
      //   title: 'Party',
      //   start: '2020-09-29T20:00:00'
      // },

      // // areas where "Meeting" must be dropped
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2020-09-11T10:00:00',
      //   end: '2020-09-11T16:00:00',
      //   display: 'background'
      // },
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2020-09-13T10:00:00',
      //   end: '2020-09-13T16:00:00',
      //   display: 'background'
      // },

      // // red areas where no events can be dropped
      // {
      //   start: '2020-09-24',
      //   end: '2020-09-28',
      //   overlap: false,
      //   display: 'background',
      //   color: '#ff9f89'
      // },
      // {
      //   start: '2020-09-06',
      //   end: '2020-09-08',
      //   overlap: false,
      //   display: 'background',
      //   color: '#ff9f89'
      // }
      // ]
    });
    console.log('cal open');
    calendar.render();
  });
});

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
      $(this).closest('tr').remove();
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

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal').on('click', function (event) {
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
