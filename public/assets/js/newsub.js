// Duy: Add subscription button that takes info about the user's subscription
document.getElementById('inputDate').valueAsDate = new Date();

$('#add-sub').on('click', function (event) {

  
  
  event.preventDefault();

  const newSub = {
    name: $('#inputSub').val().trim(),
    due: $('#inputDate').val(),
    amount: $('#inputPrice').val().trim(),
    renew: $('#inputRenew').val(),
    UserId: window.userId
  };

  console.log(newSub);

  if (newSub.name.length > 0 && newSub.amount.length > 0 && newSub.due.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/newsub',
      data: newSub
    });
    $('#create-err-msg').empty('');
    // $('#create-form').empty('');
    window.location.href = '/';
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});