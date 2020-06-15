 // Open the Modal

function openLoginModal() {
  document.getElementById('login').style.display='block';
  document.getElementById('LogIn').style.display='none';
  document.getElementById('SignUpWithEmail').style.display='none';
  document.getElementById('LogInWithEmail').style.display='none';
  document.getElementById('resetPassword').style.display='none';
}
function switchToLogin() {
  document.getElementById('SignUp').style.display='none';
  document.getElementById('LogIn').style.display='block';
  document.getElementById('SignUpWithEmail').style.display='none';
  document.getElementById('LogInWithEmail').style.display='none';
  document.getElementById('resetPassword').style.display='none';
}
function switchToSignUpWithEmail() {
  document.getElementById('SignUp').style.display='none';
  document.getElementById('LogIn').style.display='none';
  document.getElementById('SignUpWithEmail').style.display='block';
  document.getElementById('LogInWithEmail').style.display='none';
  document.getElementById('resetPassword').style.display='none';
}
function switchToLogInWithEmail() {
  document.getElementById('SignUp').style.display='none';
  document.getElementById('LogIn').style.display='none';
  document.getElementById('SignUpWithEmail').style.display='none';
  document.getElementById('LogInWithEmail').style.display='block';
  document.getElementById('resetPassword').style.display='none';
}
function switchToSignUp() {
  document.getElementById('SignUp').style.display='block';
  document.getElementById('LogIn').style.display='none';
  document.getElementById('SignUpWithEmail').style.display='none';
  document.getElementById('LogInWithEmail').style.display='none';
  document.getElementById('resetPassword').style.display='none';
}
function ResetPassword(){
  document.getElementById('resetPassword').style.display='block';
  document.getElementById('LogIn').style.display='none';
  document.getElementById('SignUpWithEmail').style.display='none';
  document.getElementById('LogInWithEmail').style.display='none';
  document.getElementById('SignUp').style.display='none';
}
// Close the Modal
function closeLoginModal() {
  document.getElementById('SignUp').style.display='block';
  document.getElementById('login').style.display='none';
}

function openForm() {
      document.getElementById("myForm").style.display = "block";
      document.getElementById("chats").style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("chats").style.display = "block";
}