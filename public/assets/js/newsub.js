// Duy: Add subscription button that takes info about the user's subscription
document.getElementById('inputDate').valueAsDate = new Date();

//Michel: adding icon of subscription on the side of the form
$("#inputSub").change(function(){
  console.log('input sub changed',$('#inputSub').val().trim());
  var myIcon;
  var myColor;
  switch ($('#inputSub').val().trim()) {
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
    $('.icone').empty();
    $('.icone').append(`<img src=${myIcon} width='300px' heigth='300px'>`);
    $('#color').empty();
    $('#color').removeClass();
    $('#color').addClass(`bg-${myColor}-500`);
    $('#color').append(`color coded in ${myColor}`);
  } else {
    $('.icone').empty();
    $('#color').empty();
  }
});

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
    window.location.href = '/';
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});