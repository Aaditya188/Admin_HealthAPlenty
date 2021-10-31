// Admin Firebase Configuration

const firebaseConfig = {
	apiKey: "AIzaSyBW10e3UmYzoe_eUDP-HB_0TgUVk7rCDQM",
	authDomain: "adminhealthaplenty.firebaseapp.com",
	databaseURL: "https://adminhealthaplenty-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "adminhealthaplenty",
	storageBucket: "adminhealthaplenty.appspot.com",
	messagingSenderId: "612885744470",
	appId: "1:612885744470:web:2057f17c2590637fca64f7"
};
firebase.initializeApp(firebaseConfig);

// Main Health-A-Plenty Database Configuration

const secondaryAppConfig = {
	apiKey: "AIzaSyD1OWAs98vA5KO_MbmaZeZYCQHdfZ5deuE",
	authDomain: "health-a-plenty.firebaseapp.com",
	databaseURL: "https://health-a-plenty-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "health-a-plenty",
	storageBucket: "health-a-plenty.appspot.com",
	messagingSenderId: "495387763561",
	appId: "1:495387763561:web:379bc47110e8dbea5653f8"
  };
  const secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");


// Check Email and Current Email ID

function checkdetails(){
    editdetails();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var user = firebase.auth().currentUser;
          if(user != null){
            var email_id = user.email;
            document.getElementById("email").value = email_id;
            document.getElementById("admin_email").innerHTML = email_id;
            initialize();
          }
      
        } else {
    
        }
    });
}

// Save Profile to Firebase

function saveprofile(){
	var fullName = document.getElementById("fullName").value;
	var eMail = document.getElementById("email").value;
	userName = eMail.substring(0, eMail.lastIndexOf("@"));
	var phone = document.getElementById("phone").value;
	var Street = document.getElementById("Street").value;
	var ciTy = document.getElementById("ciTy").value;
	var sTate = document.getElementById("sTate").value;
	var zIp = document.getElementById("zIp").value;
    
	if(eMail != null)
	  {
        firebase.database().ref('Admin_Profile/'+userName).update({
			Name : fullName,
			Email : eMail,
			Phone : phone,
			Street : Street,
			City : ciTy,
			State : sTate,
			Zip : zIp
          });
        }
		$('#detailsModal').modal('hide');
}

// Edit Details

function editdetails(){

	if(document.getElementById('fullName').disabled == true)
	{
		document.getElementById('fullName').disabled=false;
		document.getElementById('email').disabled=false;
		document.getElementById('phone').disabled=false;
		document.getElementById('Street').disabled=false;
		document.getElementById('ciTy').disabled=false;
		document.getElementById('sTate').disabled=false;
		document.getElementById('zIp').disabled=false;
	}
	else
	{
		document.getElementById('fullName').disabled=true;
		document.getElementById('email').disabled=true;
		document.getElementById('phone').disabled=true;
		document.getElementById('Street').disabled=true;
		document.getElementById('ciTy').disabled=true;
		document.getElementById('sTate').disabled=true;
		document.getElementById('zIp').disabled=true;
	}

}

// Upload Image to Firebase

function upload() {

	var image=document.getElementById("image").files[0];
	var user = firebase.auth().currentUser;
	var mail = user.email;
 	userName = mail.substring(0, mail.lastIndexOf("@"));

	if(document.getElementById("image").files[0] == null){

		alert("Select Image before Uploading");

	}
	else{
		var storageRef=firebase.storage().ref('Admin_Profile/'+userName);
		var uploadTask=storageRef.put(image);

		uploadTask.on('state_changed',function (snapshot) {
			var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
			console.log("upload is " + progress +" done");
		},function (error) {
			console.log(error.message);
		},function () {
			uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
				createnodeinfirebase(downlaodURL);
			});
		});
	}
}

// Initializer Function

var file;
var storageRef;
var imagesFBRef;

function initialize() {
  storageRef = firebase.storage().ref();
  var user = firebase.auth().currentUser;
  var mail = user.email;
  userName = mail.substring(0, mail.lastIndexOf("@"));
  imagesFBRef = firebase.database().ref('Admin_Profile/'+userName);
  showimagesfromfirebase();
  displaydata();
}

// Display Data

function displaydata(){
	var user = firebase.auth().currentUser;
	var mail = user.email;
 	userName = mail.substring(0, mail.lastIndexOf("@"));
  	firebase.database().ref('Admin_Profile/'+userName).on('value',function(snapshot){
		document.getElementById('fullName').value = snapshot.val().Name;
        document.getElementById('uname').innerHTML = snapshot.val().Name;
		document.getElementById('email').value = snapshot.val().Email;
		document.getElementById('phone').value = snapshot.val().Phone;
		document.getElementById('Street').value = snapshot.val().Street;
		document.getElementById('ciTy').value = snapshot.val().City;
		document.getElementById('sTate').value = snapshot.val().State;
		document.getElementById('zIp').value = snapshot.val().Zip;
        document.getElementById('totalapp').innerHTML = snapshot.val().totalapp;
		document.getElementById('appapp').innerHTML = snapshot.val().appapp;
		document.getElementById('pendapp').innerHTML = snapshot.val().pendapp;
    });

	firebase.database().ref('Dashboard_Details/').on('value',function(snapshot){
        document.getElementById('totalapp').innerHTML = snapshot.val().totalapp;
		document.getElementById('appapp').innerHTML = snapshot.val().appapp;
		document.getElementById('pendapp').innerHTML = snapshot.val().pendapp;
    });
   }

// Show Image on Dashboard

function showimagesfromfirebase() {
	var user = firebase.auth().currentUser;
	var mail = user.email;
 	userName = mail.substring(0, mail.lastIndexOf("@"));
	var profileimgurl;
	firebase.database().ref('Admin_Profile/'+userName).on('value',function(snapshot){
		profileimgurl = snapshot.val().url;
		document.getElementById("admin_profilepic").innerHTML = '<img height="180px" width="180px" src="' + profileimgurl + '"/>';
    });


}

// Update Firebase Url

function createnodeinfirebase(downloadURL) {
	firebase.database().ref('Admin_Profile/'+userName).update({
			url: downloadURL
          });
		  $('#imageModal').modal('hide');
}


// Logout Function

const auth =firebase.auth();
function logout(){
    auth.signOut().then(()=>{
    location.replace('../index.html');
    }) 
}

// Print name on Dashboard

function printname(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    
          var user = firebase.auth().currentUser;
          if(user != null){
      
            var email_id = user.email;
            userName = email_id.substring(0, email_id.lastIndexOf("@"));
            firebase.database().ref('Admin_Profile/'+userName).on('value',function(snapshot){
                document.getElementById('uname').innerHTML = snapshot.val().Name;
            });
          }
      
        } else {
    
        }
    });
   }


// Add a new Doctor

function adddoc(){
	var docname = document.getElementById("docname").value;
	var docemail = document.getElementById("docemail").value;
	userName = docemail.substring(0, docemail.lastIndexOf("@"));
	var hosname = document.getElementById("hosname").value;
	var hosaddress = document.getElementById("hosaddress").value;
	var hoslink = document.getElementById("hoslink").value;
	var docnumber = document.getElementById("docnumber").value;
	var docdepartment = document.getElementById("docdepartment").value;

	firebase.database().ref('Doctors/'+userName).set({
		Name : docname,
		Email : docemail,
		Phone : docnumber,
		Department : docdepartment,
		Hosp_Name : hosname,
		Hosp_add : hosaddress,
		Hos_link : hoslink,
	});
	if(document.getElementById("senddoccheck").checked == true ){
		sendmaildoc(docname,docemail);
	}
	else{
		alert("Doctor Registered Successfully!");
	}
}

function sendmaildoc(name, email){
	Email.send({
		Host : "smtp.gmail.com",
		Username : "teamnexustech@gmail.com",
		Password : "xuuwdxdpzqllefws",
		To : `${email}`,
		From : 'teamnexustech@gmail.com',
		Subject : `Hey! ${name} welcome to Health-A-Plenty`,
		Body : `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
		<!--[if gte mso 9]>
		<xml>
		  <o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		  </o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <meta name="x-apple-disable-message-reformatting">
		  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
		  <title></title>
		  
			<style type="text/css">
			  table, td { color: #000000; } @media only screen and (min-width: 520px) {
		  .u-row {
			width: 500px !important;
		  }
		  .u-row .u-col {
			vertical-align: top;
		  }
		
		  .u-row .u-col-100 {
			width: 500px !important;
		  }
		
		}
		
		@media (max-width: 520px) {
		  .u-row-container {
			max-width: 100% !important;
			padding-left: 0px !important;
			padding-right: 0px !important;
		  }
		  .u-row .u-col {
			min-width: 320px !important;
			max-width: 100% !important;
			display: block !important;
		  }
		  .u-row {
			width: calc(100% - 40px) !important;
		  }
		  .u-col {
			width: 100% !important;
		  }
		  .u-col > div {
			margin: 0 auto;
		  }
		}
		body {
		  margin: 0;
		  padding: 0;
		}
		
		table,
		tr,
		td {
		  vertical-align: top;
		  border-collapse: collapse;
		}
		
		p {
		  margin: 0;
		}
		
		.ie-container table,
		.mso-container table {
		  table-layout: fixed;
		}
		
		* {
		  line-height: inherit;
		}
		
		a[x-apple-data-detectors='true'] {
		  color: inherit !important;
		  text-decoration: none !important;
		}
		
		</style>
		  
		  
		
		<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
		
		</head>
		
		<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
		  <!--[if IE]><div class="ie-container"><![endif]-->
		  <!--[if mso]><div class="mso-container"><![endif]-->
		  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
		  <tbody>
		  <tr style="vertical-align: top">
			<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
			<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
			
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		<table width="100%" cellpadding="0" cellspacing="0" border="0">
		  <tr>
			<td style="padding-right: 0px;padding-left: 0px;" align="center">
			  
			  <img align="center" border="0" src="https://i.ibb.co/PxXK14n/image-1.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
			  
			</td>
		  </tr>
		</table>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: comic sans ms,sans-serif; font-size: 29px;">
			<strong>Hey! ${name}, Welcome to Health-A-Plenty.</strong><br /><strong>Hope you'll love our services 😄</strong>
		  </h1>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		  <div style="line-height: 230%; text-align: center; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 230%;"><strong><span style="font-size: 18px; line-height: 41.4px; font-family: Cabin, sans-serif;">With Regards, Team Nexus</span></strong></p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
			<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
			</td>
		  </tr>
		  </tbody>
		  </table>
		  <!--[if mso]></div><![endif]-->
		  <!--[if IE]></div><![endif]-->
		</body>
		
		</html>`,
	}).then( message => alert("Doctor Registered Successfully!")
	);
}



// Add a new Patient

function addpatient(){
	var patemail = document.getElementById("patemail").value;
	var patname = document.getElementById("patname").value;
	userName = patemail.substring(0, patemail.lastIndexOf("@"));
	var patdis = document.getElementById("patdis").value;
	var patphone = document.getElementById("patphone").value;

	firebase.database().ref('Patients/'+userName).set({
		Name : patname,
		Email : patemail,
		Phone : patphone,
		Disease : patdis
	});
	if(document.getElementById("sendpatcheck").checked == true ){
		sendmailpat(patname,patemail);
	}
	else{
		alert("Patient Registered Successfully!");
	}
}

function sendmailpat(name, email){
	Email.send({
		Host : "smtp.gmail.com",
		Username : "teamnexustech@gmail.com",
		Password : "xuuwdxdpzqllefws",
		To : `${email}`,
		From : 'teamnexustech@gmail.com',
		Subject : `Hey! ${name} welcome to Health-A-Plenty`,
		Body : `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
		<!--[if gte mso 9]>
		<xml>
		  <o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		  </o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <meta name="x-apple-disable-message-reformatting">
		  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
		  <title></title>
		  
			<style type="text/css">
			  table, td { color: #000000; } @media only screen and (min-width: 520px) {
		  .u-row {
			width: 500px !important;
		  }
		  .u-row .u-col {
			vertical-align: top;
		  }
		
		  .u-row .u-col-100 {
			width: 500px !important;
		  }
		
		}
		
		@media (max-width: 520px) {
		  .u-row-container {
			max-width: 100% !important;
			padding-left: 0px !important;
			padding-right: 0px !important;
		  }
		  .u-row .u-col {
			min-width: 320px !important;
			max-width: 100% !important;
			display: block !important;
		  }
		  .u-row {
			width: calc(100% - 40px) !important;
		  }
		  .u-col {
			width: 100% !important;
		  }
		  .u-col > div {
			margin: 0 auto;
		  }
		}
		body {
		  margin: 0;
		  padding: 0;
		}
		
		table,
		tr,
		td {
		  vertical-align: top;
		  border-collapse: collapse;
		}
		
		p {
		  margin: 0;
		}
		
		.ie-container table,
		.mso-container table {
		  table-layout: fixed;
		}
		
		* {
		  line-height: inherit;
		}
		
		a[x-apple-data-detectors='true'] {
		  color: inherit !important;
		  text-decoration: none !important;
		}
		
		</style>
		  
		  
		
		<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
		
		</head>
		
		<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
		  <!--[if IE]><div class="ie-container"><![endif]-->
		  <!--[if mso]><div class="mso-container"><![endif]-->
		  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
		  <tbody>
		  <tr style="vertical-align: top">
			<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
			<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
			
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		<table width="100%" cellpadding="0" cellspacing="0" border="0">
		  <tr>
			<td style="padding-right: 0px;padding-left: 0px;" align="center">
			  
			  <img align="center" border="0" src="https://i.ibb.co/PxXK14n/image-1.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;" width="480"/>
			  
			</td>
		  </tr>
		</table>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: comic sans ms,sans-serif; font-size: 29px;">
			<strong>Hey! ${name}, Welcome to Health-A-Plenty.</strong><br /><strong>Hope you'll love our services 😄</strong>
		  </h1>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
				
		  <div style="line-height: 230%; text-align: center; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 230%;"><strong><span style="font-size: 18px; line-height: 41.4px; font-family: Cabin, sans-serif;">With Regards, Team Nexus</span></strong></p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
			<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
			</td>
		  </tr>
		  </tbody>
		  </table>
		  <!--[if mso]></div><![endif]-->
		  <!--[if IE]></div><![endif]-->
		</body>
		
		</html>`,
	}).then( message => alert("Patient Registered Successfully!")
	);
}


// Fetching Doctor Details

function fetchdoc(){

	document.getElementById("doc_name").disabled = true;
	document.getElementById("doc_number").disabled = true;
	document.getElementById("doc_email").disabled = true;
	document.getElementById("hp_name").disabled = true;
	document.getElementById("hp_address").disabled = true;
	document.getElementById("hp_location").disabled = true;

	doc_email = document.getElementById("doc_email").value;
	userName = doc_email.substring(0, doc_email.lastIndexOf("@"));

	firebase.database().ref('Doctors/'+userName).on('value',function(snapshot){
		document.getElementById("doc_name").value = snapshot.val().Name;
		document.getElementById("doc_number").value = snapshot.val().Phone;
		document.getElementById("hp_name").value = snapshot.val().Hosp_Name;
		document.getElementById("hp_address").value = snapshot.val().Hosp_add;
		document.getElementById("hp_location").value = snapshot.val().Hos_link;
	});

}

// Fetching Patient Details

function fetchpat(){

	document.getElementById("pa_name").disabled = true;
	document.getElementById("pa_phone").disabled = true;
	document.getElementById("pa_email").disabled = true;
	document.getElementById("pa_dis").disabled = true;
	document.getElementById("pa_appdate").disabled = true;

	pa_email = document.getElementById("pa_email").value;
	userName = pa_email.substring(0, pa_email.lastIndexOf("@"));

	firebase.database().ref('Patients/'+userName).on('value',function(snapshot){
		document.getElementById("pa_name").value = snapshot.val().name;
		document.getElementById("pa_phone").value = snapshot.val().phone;
		document.getElementById("pa_dis").value = snapshot.val().disease;
		document.getElementById("pa_appdate").value = snapshot.val().date;
	});

}

// Appointing Doctor to Patient

function appoint(){

	pa_email = document.getElementById("pa_email").value;
	pa_name = document.getElementById("pa_name").value;
	pa_time = document.getElementById("pa_time").value;
	pa_phone = document.getElementById("pa_phone").value;
	pa_appdate = document.getElementById("pa_appdate").value;
	pa_dis = document.getElementById("pa_dis").value;
	doc_email = document.getElementById("doc_email").value;
	doc_number = document.getElementById("doc_number").value;
	doc_name = document.getElementById("doc_name").value;
	hp_name = document.getElementById("hp_name").value;
	hp_address = document.getElementById("hp_address").value;
	hp_location = document.getElementById("hp_location").value;
	patName = pa_email.substring(0, pa_email.lastIndexOf("@"));

	// Patient Update
	secondaryApp.database().ref('Appointments/'+patName).update({
		Time : pa_time,
		Doc_Name : doc_name,
		Doc_Email : doc_email,
		Doc_Phone : doc_number,
		Hosp_Name : hp_name,
		Hosp_add : hp_address,
		Hos_link : hp_location  
	});

	// Admin Update
	firebase.database().ref('Appointments/'+patName).set({
		Name : pa_name,
		Email : pa_email,
		Phone : pa_phone,
		Time : pa_time,
		Date : pa_appdate,
		Disease : pa_dis,
		Doc_Name : doc_name,
		Doc_Email : doc_email,
		Doc_Phone : doc_number,
		Hosp_Name : hp_name,
		Hosp_add : hp_address,
		Hos_link : hp_location,
		Status : "approved"
	});

	Email.send({
		Host : "smtp.gmail.com",
		Username : "teamnexustech@gmail.com",
		Password : "xuuwdxdpzqllefws",
		To : `${pa_email},teamnexustech@gmail.com`,
		From : 'teamnexustech@gmail.com',
		Subject : `Hey! ${pa_name} Your Appointment is Confirmed ! `,
		Body : `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
		<!--[if gte mso 9]>
		<xml>
		  <o:OfficeDocumentSettings>
			<o:AllowPNG/>
			<o:PixelsPerInch>96</o:PixelsPerInch>
		  </o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <meta name="x-apple-disable-message-reformatting">
		  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
		  <title></title>
		  
			<style type="text/css">
			  table, td { color: #000000; } @media only screen and (min-width: 520px) {
		  .u-row {
			width: 500px !important;
		  }
		  .u-row .u-col {
			vertical-align: top;
		  }
		
		  .u-row .u-col-50 {
			width: 250px !important;
		  }
		
		  .u-row .u-col-100 {
			width: 500px !important;
		  }
		
		}
		
		@media (max-width: 520px) {
		  .u-row-container {
			max-width: 100% !important;
			padding-left: 0px !important;
			padding-right: 0px !important;
		  }
		  .u-row .u-col {
			min-width: 320px !important;
			max-width: 100% !important;
			display: block !important;
		  }
		  .u-row {
			width: calc(100% - 40px) !important;
		  }
		  .u-col {
			width: 100% !important;
		  }
		  .u-col > div {
			margin: 0 auto;
		  }
		}
		body {
		  margin: 0;
		  padding: 0;
		}
		
		table,
		tr,
		td {
		  vertical-align: top;
		  border-collapse: collapse;
		}
		
		p {
		  margin: 0;
		}
		
		.ie-container table,
		.mso-container table {
		  table-layout: fixed;
		}
		
		* {
		  line-height: inherit;
		}
		
		a[x-apple-data-detectors='true'] {
		  color: inherit !important;
		  text-decoration: none !important;
		}
		
		</style>
		  
		  
		
		</head>
		
		<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
		  <!--[if IE]><div class="ie-container"><![endif]-->
		  <!--[if mso]><div class="mso-container"><![endif]-->
		  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
		  <tbody>
		  <tr style="vertical-align: top">
			<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
			<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
			
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		<table width="100%" cellpadding="0" cellspacing="0" border="0">
		  <tr>
			<td style="padding-right: 0px;padding-left: 0px;" align="center">
			  
			  <img align="center" border="0" src="https://i.ibb.co/HrCf5vs/image-1.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 274px;" width="274"/>
			  
			</td>
		  </tr>
		</table>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <h1 style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: comic sans ms,sans-serif; font-size: 20px;">
			<strong>&nbsp;Congratulations! Your Appointment is Confirmed</strong>
		  </h1>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: comic sans ms,sans-serif; font-size: 22px;">
			<strong>Hey, ${pa_name} !</strong>
		  </h1>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Date : </p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">${pa_appdate}</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Appointment Time : </p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">${pa_time}</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Doctor Name :</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">${doc_name}</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Hospital Name : </p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">${hp_name}</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Hospital Address : </p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">${hp_address}</p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;">Google Maps Link : </p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<a style="font-size: 14px; line-height: 140%;" href="${hp_location}">Click Here</a>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;"><strong><span style="font-family: 'comic sans ms', sans-serif; font-size: 14px; line-height: 19.6px;">Note : Please Be on Time for Your Appointment, as there were so many other Patients will be waiting for their Appointment.</span></strong></p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
		
		<div class="u-row-container" style="padding: 0px;background-color: transparent">
		  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
			<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
			  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
			  
		<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
		<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
		  <div style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
		  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
		  
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <h1 style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: comic sans ms,sans-serif; font-size: 22px;">
			<strong>Thank You for Choosing Health-A-Plenty!</strong>
		  </h1>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		<table style="font-family:comic sans ms,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
		  <tbody>
			<tr>
			  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:comic sans ms,sans-serif;" align="left">
				
		  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
			<p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'comic sans ms', sans-serif; font-size: 14px; line-height: 19.6px;"><strong>With Regards,</strong></span></p>
		<p style="font-size: 14px; line-height: 140%;"><span style="font-family: 'comic sans ms', sans-serif; font-size: 14px; line-height: 19.6px;"><strong>Team Nexus</strong></span></p>
		  </div>
		
			  </td>
			</tr>
		  </tbody>
		</table>
		
		  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
		  </div>
		</div>
		<!--[if (mso)|(IE)]></td><![endif]-->
			  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
			</div>
		  </div>
		</div>
		
		
			<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
			</td>
		  </tr>
		  </tbody>
		  </table>
		  <!--[if mso]></div><![endif]-->
		  <!--[if IE]></div><![endif]-->
		</body>
		
		</html>`,
	}).then( message => alert("Appointment Confirmed Successfully!")
	);
	updateappdetails2();

}

// Updating Appointment Numbers on Dashboard

function updateappdetails(){

	// Recieve Appointment Number
	firebase.database().ref('Dashboard_Details/').on('value',function(snapshot){
		document.getElementById("totalapp").value = snapshot.val().totalapp;
		document.getElementById("appapp").value = snapshot.val().appapp + 1;
		document.getElementById("pendapp").value= -snapshot.val().appapp + snapshot.val().totalapp - 1;
	});
}

function updateappdetails2(){

	var total_app = document.querySelector('[name="total"]').value;
	var app_app = document.querySelector('[name="approved"]').value;
	var pend_app = document.querySelector('[name="pending"]').value;
	
	console.log(total_app,app_app,pend_app);

	// Update Appointment Number
	firebase.database().ref('Dashboard_Details/').update({
		totalapp : Number(total_app),
		appapp : Number(app_app),
		pendapp : Number(pend_app)
	});
}