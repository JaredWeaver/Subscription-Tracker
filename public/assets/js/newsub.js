$('#add-sub').on('click', function (event) {
  event.preventDefault();

  const newSub = {
    name: $('#inputSub').val().trim(),
    due: $('#inputDate').val(),
    amount: $('#inputPrice').val().trim()
  };

  if (newSub.name.length > 0 && newSub.amount.length > 0 && newSub.due.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newSub
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});
