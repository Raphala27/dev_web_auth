import './style.css'

document.getElementById('signup').innerHTML = `
<div class="center">
    <button id="show-login">Sign-up</button>
</div>
<div class="popup">
    <div class="close-btn">&times;</div>
    <form action="/sign-up" class="form">
      <legend>Sign-up</legend>
        <div class="form-element">
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="Enter email">
            <p id="message-email" class="alert-msg"></p>
        </div>
        <div class="form-element">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter password">
            <p id="message-pwd" class="alert-msg"></p>
        </div>
        <div class="form-element">
        <label for="password">Password confirmation</label>
        <input type="password" id="password-check" placeholder="Enter password">
        <p id="message-check" class="alert-msg"></p>
        </div>
        <div class="form-element">
            <input type="checkbox" id="remember-me">
            <label for="remember-me">Remember me</label>
        </div>
        <div class="form-element">
            <button id="button-sign-up">Sign up</button>
        </div>
        <div class="form-element">
            <a href="#">Forgot password</a>
        </div>
    </div>
</div>
`

document.getElementById('show-login').addEventListener("click",() => {
    document.querySelector(".popup").classList.toggle("active")
})

document.querySelector('.close-btn').addEventListener("click",() => {
    document.querySelector(".popup").classList.remove("active")
})

document.getElementById('email')
  .addEventListener('blur', (event) => {
    const messageEl = event.target.parentElement.querySelector('#message-email')
    if(!isValidEmail(event.target.value)){
       messageEl.innerHTML = '&times; Email not valid'
       document.getElementById("email").classList.toggle("red")
    }
    else{
      messageEl.innerHTML = ''
      document.getElementById("email").classList.remove("red")
    }
})

document.getElementById('password')
  .addEventListener('blur', (event) => {
    if(event.target.value.length < 6){
      event.target.parentElement.querySelector('#message-pwd').innerHTML = '&times; Password too short'
      document.getElementById("password").classList.toggle("red")
    } else {
      event.target.parentElement.querySelector('#message-pwd').innerHTML= ''
      document.getElementById("password").classList.remove("red")
    }
  })

document.getElementById('password-check')
  .addEventListener('blur', () => confirmPassword())

document.getElementById('button-sign-up')
  .addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const mdp = document.getElementById('password').value
    const checkpwd = document.querySelector('#password-check').value
    if (!isValidEmail(email)) {
      alert("Le mail n'est pas valide")
      return
    }
    if(mdp < 6){
      alert("Le mot de passe n'est pas assez long")
      return
    }
    if (mdp != checkpwd) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    fetch('https://mbmtk0i6a7.execute-api.eu-west-3.amazonaws.com/api/user', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email: email,
        password: mdp
      })
    })
    .then(response => response.json()) 
    .then(data => {
      document.querySelector(".popup").classList.remove("active")
      console.log(data)
    })
    .catch(error => {
      console.error('Error:', error);
  });
  })

function isValidEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function confirmPassword(){
  const passwordInput = document.querySelector('#password');
  const confirmPasswordInput = document.querySelector('#password-check');
  const messageEl = confirmPasswordInput.parentElement.querySelector('#message-check');

  if(confirmPasswordInput.value !== passwordInput.value){
    messageEl.innerHTML = '&times; Passwords do not match';
    document.getElementById("password-check").classList.toggle("red")
  } else {
    messageEl.innerHTML = '';
    document.getElementById("password-check").classList.remove("red")
  }
}