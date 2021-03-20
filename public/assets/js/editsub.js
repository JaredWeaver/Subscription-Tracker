$('#edit-sub').on('click', function (event) {
    event.preventDefault();
  
    const editSub = {
      name: $('#inputSub').val().trim(),
      due: $('#inputDate').val(),
      amount: $('#inputPrice').val().trim(),
      renew: $('#inputRenew').val(),
      UserId: window.userId
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