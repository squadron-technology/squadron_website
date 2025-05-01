/**
 * PHP Email Form Validation - v3.10
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".contact-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");
      let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }
      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha
                .execute(recaptcha, { action: "php_email_form_submit" })
                .then((token) => {
                  formData.set("recaptcha-response", token);
                  php_email_form_submit(thisForm, action, formData);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(
            thisForm,
            "The reCaptcha javascript API url is not loaded!"
          );
        }
      } else {
        sendEmail(thisForm, action, formData);
      }
    });
  });

  function sendEmail(thisForm, action, formData) {
    let jsonObject = {};
    for (let pair of formData.entries()) {
      jsonObject[pair[0]] = pair[1];
    }
      console.log("jsonObject", jsonObject)
      fetch("https://formsubmit.co/ajax/sanjeevrouhan@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Name: jsonObject.name,
            Subject: jsonObject.subject,
            Email: jsonObject.email,
            Message: jsonObject.message
        })
      }) .then(response => response.json())
        .then(data => {
          console.log(data)
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();

        })
        .catch(error =>{
          console.log(error)
          displayError(thisForm, error);
        } );

    // fetch(action, {
    //   method: "POST",
    //   body: formData,
    //   body: JSON.stringify({
    //     from: "Acme <onboarding@resend.dev>",
    //     "to": ["sanjeevrouhan@gmail.com"],
    //     subject: "Contact us Submission",
    //     html: "Greetings from the team, you got this message.",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Requested-With": "XMLHttpRequest",
    //     Authorization:
    //       "Bearer ", // Replace with your actual API token
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       thisForm.querySelector(".loading").classList.remove("d-block");
    //       thisForm.querySelector(".sent-message").classList.add("d-block");
    //       thisForm.reset();
    //     } else {
    //       throw new Error(
    //         `${response.status} ${response.statusText} ${response.url}`
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     displayError(thisForm, error);
    //   });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
