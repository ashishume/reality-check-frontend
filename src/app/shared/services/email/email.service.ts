import { MatDialog, MatDialogConfig } from '@angular/material';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Injectable } from '@angular/core';
import { ErrorServiceService } from '../error-service/error-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private apiService: ApiService,
    private route: Router,
    private matDialog: MatDialog,
    private showSnack: ErrorServiceService) { }


  //upload document writing section
//   sendDocumentMail(name, email, subject) {
//     var html = `<div class="container"
//     style="@import url('https://fonts.googleapis.com/css?family=Manjari:700&display=swap');font-family: 'Manjari', sans-serif;font-size: 20px">
//     <div class="row">
//         <div class="content" style=" max-width: 400px;
//         margin: 0 auto;
//         padding: 5px 10px;
//         border-radius: 15px;
//         border: solid 5px #20688F;">
//             <div class="image-container" style="text-align: center">

//                 <img class="image-logo" style="width: 120px;height:150px;"
//                     src="https://firebasestorage.googleapis.com/v0/b/upwork-5d46d.appspot.com/o/Ninemiles%20Logo%2Flogo.png?alt=media&token=dae82d92-adf2-47a0-9fac-58182c90b896"
//                     alt="Ninemiles Logo">
//                 <hr>
//             </div>
//             <h4 class="heading" style=" text-align: center;
//             color: green;">Congratulations, your test has been checked</h4>
//             <p class="para" style=" background-color: #f4f4f4;
//             padding: 10px 15px;
//             border-radius: 15px;">
//                 Hi ${name}, <br><br>
//                 Your test has been checked by our team,
//                 Please check your score by visiting <a href="www.ninemilesielts.com">www.ninemilesielts.com</a> <br>
//                 <br> Thanks and Regards<br />TEAM NINEMILES
//             </p>

//         </div>

//     </div>
// </div>`;


//     const body = {
//       email: email,
//       subject: subject,
//       htmlCode: html
//     }
//     this.apiService.sendEmail(body).subscribe((data: any) => {
//       if (data.status == 200) {
//         this.showSnack.showError("Mail has been successfully sent");
//       } else {
//         this.showSnack.showError("Something went wrong");
//       }
//     })
//   }
//   sendSpeakingMail(name, email, subject) {
//     var html = `<div class="container"
//     style="@import url('https://fonts.googleapis.com/css?family=Manjari:700&display=swap');font-family: 'Manjari', sans-serif;font-size: 20px">
//     <div class="row">
//         <div class="content" style=" max-width: 400px;
//         margin: 0 auto;
//         padding: 5px 10px;
//         border-radius: 15px;
//         border: solid 5px #20688F;">
//             <div class="image-container" style="text-align: center">

//                 <img class="image-logo" style="width: 120px;height:150px;"
//                     src="https://firebasestorage.googleapis.com/v0/b/upwork-5d46d.appspot.com/o/Ninemiles%20Logo%2Flogo.png?alt=media&token=dae82d92-adf2-47a0-9fac-58182c90b896"
//                     alt="Ninemiles Logo">
//                 <hr>
//             </div>
//             <h4 class="heading" style=" text-align: center;
//             color: green;">Congratulations, your test has been checked</h4>
//             <p class="para" style=" background-color: #f4f4f4;
//             padding: 10px 15px;
//             border-radius: 15px;">
//                 Hi ${name}, <br><br>
//                 Your test has been checked by our team,
//                 Please check your score by visiting <a href="www.ninemilesielts.com">www.ninemilesielts.com</a>. Log in
//                 to your mock test profile to check results.
//                 <br>
//                 <br> Thanks and Regards<br />TEAM NINEMILES
//             </p>

//         </div>

//     </div>
// </div>`

//     const body = {
//       email: email,
//       subject: subject,
//       htmlCode: html
//     }
//     this.apiService.sendEmail(body).subscribe((data: any) => {
     
//       if (data.status == 200) {
//         this.showSnack.showError("Mail has been successfully sent");
//       } else {
//         this.showSnack.showError("Something went wrong");
//       }
//     })
//   }
//   sendWritingMarks(name, email, subject) {
//     var html = `<div class="container"
//     style="@import url('https://fonts.googleapis.com/css?family=Manjari:700&display=swap');font-family: 'Manjari', sans-serif;font-size: 20px">
//     <div class="row">
//         <div class="content" style=" max-width: 400px;
//         margin: 0 auto;
//         padding: 5px 10px;
//         border-radius: 15px;
//         border: solid 5px #20688F;">
//             <div class="image-container" style="text-align: center">

//                 <img class="image-logo" style="width: 120px;height:150px;"
//                     src="https://firebasestorage.googleapis.com/v0/b/upwork-5d46d.appspot.com/o/Ninemiles%20Logo%2Flogo.png?alt=media&token=dae82d92-adf2-47a0-9fac-58182c90b896"
//                     alt="Ninemiles Logo">
//                 <hr>
//             </div>
//             <h4 class="heading" style=" text-align: center;
//             color: green;">Congratulations, your test has been checked</h4>
//             <p class="para" style=" background-color: #f4f4f4;
//             padding: 10px 15px;
//             border-radius: 15px;">
//                 Hi ${name}, <br><br>
//                 Your test has been checked by our team,
//                 Please check your score by visiting <a href="www.ninemilesielts.com">www.ninemilesielts.com</a>. Log in
//                 to your mock test profile to check results.
//                 <br>
//                 <br> Thanks and Regards<br />TEAM NINEMILES
//             </p>

//         </div>

//     </div>
// </div>`

//     const body = {
//       email: email,
//       subject: subject,
//       htmlCode: html
//     }
//     this.apiService.sendEmail(body).subscribe((data: any) => {
//       if (data.status == 200) {
//         this.showSnack.showError("Mail has been successfully sent");
//       } else {
//         this.showSnack.showError("Something went wrong");
//       }
//     })
//   }

//   sendIssueMail(name, email, message) {

//     var html = `<div class="container"
//     style="@import url('https://fonts.googleapis.com/css?family=Manjari:700&display=swap');font-family: 'Manjari', sans-serif;font-size: 20px">
//     <div class="row">
//         <div class="content"
//             style=" max-width: 400px; margin: 0 auto;padding: 5px 10px;border-radius:15px;border: solid 5px #20688F;">
//             <div class="image-container" style="text-align:center">

//                 <img class="image-logo" style="width: 200px;"
//                     src="https://firebasestorage.googleapis.com/v0/b/upwork-5d46d.appspot.com/o/Ninemiles%20Logo%2Flogo.png?alt=media&token=dae82d92-adf2-47a0-9fac-58182c90b896"
//                     alt="Ninemiles Logo">
//                 <hr>
//             </div>
//             <h4 class="heading" style=" text-align: center;
//     color: green; ">
//                 <p class="para" style=" background-color:#f4f4f4; padding:10px 15px;border-radius:15px;">

//                     ${ name}, has raised an issue please look into the matter.
//                     <br>
//                     <br>
//                     Issue raised:& nbsp; <b>${ message} </b>
//                     <br>
//                     <br>
//                     Please reply ${ name} in his mail id ${email}, to further give him update about the issue.

//                 </p>

//         </div>
//     </div>
// </div>`
//     const body = {
//       email: "ninemilesmocks@gmail.com",
//       subject: `${name} has raised an issue`,
//       htmlCode: html
//     }
//     this.apiService.sendEmail(body).subscribe((data: any) => {
//       if (data.status == 200) {
//         this.showSnack.showError("Mail has been successfully sent");
//       } else {
//         this.showSnack.showError("Something went wrong");
//       }
//     })

//   }


//   requestSpeakingTest(body) {
//     var html = `<div class="container"
//     style="@import url('https://fonts.googleapis.com/css?family=Manjari:700&display=swap');font-family: 'Manjari', sans-serif;font-size: 20px">
//     <div class="row">
//         <div class="content" style=" max-width: 400px;
//         margin: 0 auto;
//         padding: 5px 10px;
//         border-radius: 15px;
//         border: solid 5px #20688F;">
//             <div class="image-container" style="text-align: center">

//                 <img class="image-logo" style="width: 120px;height:150px;"
//                     src="https://firebasestorage.googleapis.com/v0/b/upwork-5d46d.appspot.com/o/Ninemiles%20Logo%2Flogo.png?alt=media&token=dae82d92-adf2-47a0-9fac-58182c90b896"
//                     alt="Ninemiles Logo">
//                 <hr>
//             </div>
//             <div>
//                 ${body.name} has requested for speaking test
//                 Please assign a teacher to take the test.

//             </div>
//             <p class="para" style=" background-color: #f4f4f4;
//             padding: 10px 15px;
//             border-radius: 15px;">
//                 Test Details:<br>
//                 Student Name: <b>${body.name}</b><br>
//                 Student Email:<b> ${body.email}</b><br>
//                 Test Number: <b>${body.testNumber}</b><br>
//                 Phone Number: <b>${body.phone}</b><br>
//                 Country: <b>${body.country}</b><br>
//                 Time: <b>${body.time} </b><br>
//                 Date: <b>${body.date}</b><br>

//             </p>

//         </div>

//     </div>
// </div>`
//     const updateBody = {
//       email: "ninemilesmocks@gmail.com",
//       subject: `${body.name} has requested for speaking test`,
//       htmlCode: html
//     }
//     this.apiService.sendEmail(updateBody).subscribe((data: any) => {
//       if (data.status == 200) {
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.width = '400px';
//         this.matDialog.open(SpeakingDialogComponent, dialogConfig);

//         this.apiService.updateTestStatus("speaking")
//         this.route.navigate([''])
//       } else {
//         this.showSnack.showError("Something went wrong");
//       }
//     })

//   }





}
