
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });


})(jQuery);


//-------------------------------Register User---------------------------------//
  function RegisterUser() {
          var email=document.getElementById('email').value;
          var password=document.getElementById('password').value;
          firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
           location.replace("profile.html");
           var id=firebase.auth().currentUser.uid;
          }).catch(function(error){
       
           var errorcode=error.code;
           var errormsg=error.message;
           window.alert("Error : " +errorMsg)
           
          });
  }
  
  //-------------------------------Login User---------------------------------//	
  function LoginUser(){
      var email=document.getElementById('email').value;
      var password=document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
       var id=firebase.auth().currentUser.uid;
       location.replace("dashboard.html");
      }).catch(function(error){
   
       var errorCode=error.code;
       var errorMsg=error.message;
       window.alert("Error : " +errorMsg)
   
      });
     }
  //-------------------------------Reset Password---------------------------------//
     const resetPasswordFunction = () => {
      const email = document.getElementById("email").value;
      
      if(!email)
      {
          window.alert("Please enter a registered email");
      }
      else
      {
          
          auth.sendPasswordResetEmail(email).then(() => {
      
          window.alert('Password Reset Email Sent Successfully!');
      
      }).catch(function(error){
        
          window.alert("Please enter a registered email");
      });
      }
      }
  