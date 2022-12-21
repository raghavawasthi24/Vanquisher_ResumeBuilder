let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}





var form = document.getElementById("form");
var fname=document.getElementById("fname");
var dob=document.getElementById("dob");
var phone=document.getElementById("phone");
var whatsapp=document.getElementById("whatsapp");
var email=document.getElementById("email");
var password=document.getElementById("password");
var cpassword=document.getElementById("cpassword");
form.addEventListener('submit', function(event){
    validate();
})
var validate = () => {
    fname.addEventListener("blur", validatefname);
    dob.addEventListener("blur", validatedob);
    phone.addEventListener("blur", validatephone);
    whatsapp.addEventListener("blur", validatewhatsapp);
    email.addEventListener("blur", validateemail);
    password.addEventListener("blur", validatepassword);
    cpassword.addEventListener("blur", validatecpassword);

     function validatefname(){
        var regEx_fname=/^[A-Za-z. ]{2,30}$/;
        if(!regEx_fname.test(fname.value)){
            NotValid(fname,'Name is invalid');
        }
        else{
            Valid(fname);
            console.log(fname.value);
        }
    }
    function validatedob(){
        if((dob.value)==" ")
        NotValid(dob,'Please enter your dob');
        else{
            Valid(dob);
            console.log(dob.value);
        }
        
    }
    function validatephone(){
        var regEx_phone=/^[789][0-9]{9}$/;
        if(!regEx_phone.test(phone.value)){
            NotValid(phone,'Phone number is invalid');
        }
        else{
            Valid(phone);
            console.log(phone.value);
        }
    }

    function validatewhatsapp(){
        var regEx_whatsapp=/^[789][0-9]{9}$/;
        if(!regEx_whatsapp.test(whatsapp.value)){
            NotValid(whatsapp,'Whatsapp number is invalid');
        }
        else{
            Valid(whatsapp);
            console.log(whatsapp.value);
        }
    }
    function validateemail(){
        var regEx_email=/^[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
        if(!regEx_email.test(email.value)){
            NotValid(email,'Email is invalid');
        }
        else{
            Valid(email);
            console.log(email.value);
        }
    }
    function validatepassword(){
        var regEx_password=/^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(!regEx_password.test(password.value)){
            NotValid(password,'Invalid password');
        }
        else{
            Valid(password);
        }
    }
    function validatecpassword(){
        if((password.value)!=(cpassword.value)){
            NotValid(cpassword,'Password not matched');
        }
        else{
            Valid(cpassword);
        }
    }
}
function NotValid(input,errormsg){
    var control = input.parentElement;
    var span = control.querySelector('span');
    control.className = "control error";
    span.innerText = errormsg;
}
function Valid(input){
    var control = input.parentElement;
    control.className = "control success";
} 



