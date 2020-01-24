//DOM loaded
$(document).ready(() => {
  //'I agree' checkbox logic
  const agree = $("div#agree input");
  agree.click(() => {
    if ($(agree).prop("checked") === true) {
      $("button#btn-submit").prop("disabled", false);
      $("button#btn-submit").addClass("enabled");
    } else {
      $("button#btn-submit").prop("disabled", true);
      $("button#btn-submit").removeClass("enabled");
    }
  });

  //'Show password' logic
  const show_passwd = $("div#show_password input");
  show_passwd.click(() => {
    if ($(show_passwd).prop("checked") === true) {
      $("div#form input#password").attr("type", "text");
    } else if ($(show_passwd).prop("checked") === false) {
      $("div#form input#password").attr("type", "password");
    }
  });

  //Submit button logic
  $("#btn-submit").click(() => {
    //data from the form
    var user = $("input#username").val();
    var pass = $("input#password").val();

    var data = {
      username: user,
      password: pass
    };

    //reference to the form message container
    const form_message = $("div#form-message");

    //JQuery AJAX
    $.ajax({
      //url: "http://localhost:8000/submit_form",
      url: "form.php",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: JSON.stringify(data),
      method: "POST"
    })
      //If the request is successfull
      .done(response => {
        console.log(JSON.parse(response));
        if (JSON.parse(response).authorized == true){
          $('h1').css("color","white");
          $('h1').text("Successfully logged in!");
          form_message.css("display", "none");
          // form_message.html("<p>Success</p>");
          // form_message.addClass("success").removeClass("faliure");
          $('body').addClass("bg-suc").removeClass('bg-fal');
        } else {
          $('h1').text("Faliure!");
          $('h1').css("color", "white");
          form_message.css("display", "block");
          form_message.html("<p>Username or password might be incorrect!</p>");
          form_message.removeClass("success").addClass("faliure");
          $('body').addClass("bg-fal");
          //shake the div
          form_message.effect("shake", { times: 2 }, 400);
        }
      })
      //If the request fails(no response from the server)
      .fail(error => {
        form_message.css("display", "block");
        form_message.html("<p>Server error!</p>");
        form_message.removeClass("success");
        form_message.addClass("faliure").removeClass("bg-suc");
      });
  });
});
