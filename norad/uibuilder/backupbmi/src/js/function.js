const currentUrl=window.location.host
function getSpo2(){
    fetch('http://'+currentUrl+'/mk/spo2')
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Request failed');
          }
        })
        .then(data => {
          console.log(data)
          spo=data.spo
          pr=data.pr
          document.getElementById("spo").value = spo
          document.getElementById("pr").value = pr
         
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
function getBp(){
    fetch('http://' + currentUrl +'/mk/bp')
    .then(response => {
        if (response.status === 200) {
        return response.json();
        } else {
        throw new Error('Request failed');
        }
    })
    .then(data => {
        console.log(data)
        sys=data.sys
        dia=data.dia
        document.getElementById("bp").value = sys+"/"+dia
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }
    

function getBmi(){
    fetch('http://' + currentUrl +'/mk/bmi')
        .then(response => {
            if (response.status === 200) {
            return response.json();
            } else {
            throw new Error('Request failed');
            }
        })
        .then(data => {
            console.log(data)
            var h=data.H
            var w=data.W
            document.getElementById("height").value = h
            document.getElementById("weight").value = w
            if(h == 0 || w == 0){
                var bmi = 0;
            }else{
                var bmi=w / ((h / 100) ** 2)
            }
            // var bmi=(parseInt(w)*10000)/(parseInt(h)*parseInt(h))
            document.getElementById("bmi").value = bmi.toFixed(2)
            
        })
        .catch(error => {
            // console.error('Error:', error);
        });
        }
       
function checkBmiAndRunFunction() {
    var homeElement = document.getElementById("home");
    
    // Check if the element with ID "home" has the class "show"
    if (homeElement && homeElement.classList.contains("show")) {
        // If the condition is met, call the getbmi() function
        getBmi();
    }
}
function checkBpAndRunFunction() {
    var homeElement = document.getElementById("profile");
    
    // Check if the element with ID "home" has the class "show"
    if (homeElement && homeElement.classList.contains("show")) {
        // If the condition is met, call the getbmi() function
        getBp();
    }
}
function checkSpoAndRunFunction() {
    var homeElement = document.getElementById("contact");
    
    // Check if the element with ID "home" has the class "show"
    if (homeElement && homeElement.classList.contains("show")) {
        // If the condition is met, call the getbmi() function
        getSpo2();
    }
}
function checkMinimumAge(inputDate) {
    const selectedDate = new Date(inputDate);
    const currentDate = new Date();

    // Calculate the minimum date (current date minus 10 years)
    const minimumDate = new Date(currentDate);
    minimumDate.setFullYear(currentDate.getFullYear() - 10);
    return (selectedDate > minimumDate)
    // return [selectedDate, minimumDate, (selectedDate < minimumDate)]
    // if (selectedDate < minimumDate) {
    
    // } else {
    
    // }
}

function register() {
    var uname = document.getElementById("uname").value; 
    var dob = document.getElementById("dob").value; 
    var mobile = document.getElementById("mobile").value; 
    var email = document.getElementById("email").value; 
    var gender=""
    var maleRadio = document.getElementById("gender1"); 
    var femaleRadio = document.getElementById("gender2"); 
    if (maleRadio.checked) {
        gender= maleRadio.value;
    } else if (femaleRadio.checked) {
        gender= femaleRadio.value;
    } else {
        // Handle the case where no radio button is selected
        console.log( "No gender selected")
    }
    // console.log(dob,checkMinimumAge(dob))
    if(uname.length <=1){
        alert2('error','Oops...','Please enter User Name')
    }else if(dob == ""){
        alert2('error','Oops...','Please select your Date of birth')
    } else if (checkMinimumAge(dob)){
        alert2("error", "Age Limit","Minimum age must be 10 years or more.")
    }else if(mobile == ""){
        alert2('error','Oops...','Please Enter Mobile Number.')
    }else if(mobile.length > 10 || mobile.length < 10){
            alert2('error','Oops...','Incorrect Mobile Number Please Enter Mobile Number.')
    }else{
         // Create a data object with the user information
         var userData = {
            uname: uname,
            dob: dob,
            mobile: mobile,
            email: email,
            gender: gender
        };

        // Send a POST request to the server
        fetch('http://' + currentUrl +'/mk/storebmi', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
})
.then(response => {
    if (response.status === 200) {
        // Request was successful, parse and handle the response data here
        response.json() // Parse the response body as JSON
        .then(data => {
            // console.log('Data successfully sent to the server.');
            // console.log('Response Data:', data); // Log the response data
            if(data.code == 200){
                showAlertAndRedirect('success','Success',data.response,"MobileNo.html")
                // window.location.href = "MobileNo.html";
            }else if(data.code == 201){
                showAlertAndRedirect('warning','Failed',data.response,"MobileNo.html")
                // alert2('warning','Failed',data.response)
                // window.location.href = "MobileNo.html";
            }else(
                alert2('error','Oops...','something Wrong Contact Administrator')

            )
        })
        .catch(error => {
            console.error('Error parsing JSON:', error);
        });
    } else {
        // Handle the error here
        console.error('Error:', response.statusText);
    }
})
.catch(error => {
    // Handle network or other errors here
    console.error('Error:', error);
});

    
        // console.log(uname,dob,mobile,email,gender)
        
        // {code: 201, response: 'Mobile Number Already Registered'}


    }//end
}


function storeBmi() {
    
    // Get height and weight input values
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const bmi = parseFloat(document.getElementById("bmi").value);
   
    // Store data in localStorage
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    localStorage.setItem("bmi", bmi);
    // Send a GET request to the specified URL
    fetch('http://' + currentUrl + '/mk/clear?act=bmi')
        .then(response => {
            if (response.ok) {
                console.log('Clear request was successful.');
            } else {
                console.error('Error:', response.statusText);
            }
        })
        .catch(error => {
            // console.error('Error:', error);
        });
    showAlertAndRedirect("success", "Success", "BMI calculated and data save.", "Reports.html")
    // alert2("success","Success","BMI calculated and data save.");
}
function storeBp() {
   
    // Get height and weight input values
    const bp = document.getElementById("bp").value;
    // const dia = parseFloat(document.getElementById("dia").value);
    // const bmi = parseFloat(document.getElementById("bmi").value);
   
    // Store data in localStorage
    // localStorage.setItem("height", height);
    // localStorage.setItem("weight", weight);
    localStorage.setItem("bp", bp);
    fetch('http://' + currentUrl + '/mk/clear?act=bp')
        .then(response => {
            if (response.ok) {
                console.log('Clear request was successful.');
            } else {
                console.error('Error:', response.statusText);
            }
        })
        .catch(error => {
            // console.error('Error:', error);
        });
    showAlertAndRedirect("success", "Success", "BP calculated and data save.","Reports.html");
    // alert("BMI calculated and data stored in localStorage.");
}
function storeSpo() {
  
    // Get height and weight input values
    const spo = document.getElementById("spo").value;
    const pr = document.getElementById("pr").value;
    // const bmi = parseFloat(document.getElementById("bmi").value);
   
    // Store data in localStorage
    // localStorage.setItem("height", height);
    // localStorage.setItem("weight", weight);
    localStorage.setItem("pr", pr);
    localStorage.setItem("spo", spo);
    fetch('http://' + currentUrl + '/mk/clear?act=spo2')
        .then(response => {
            if (response.ok) {
                console.log('Clear request was successful.');
            } else {
                console.error('Error:', response.statusText);
            }
        })
        .catch(error => {
            // console.error('Error:', error);
        });
    showAlertAndRedirect("success", "Success", "SpO2 calculated and data save.","Reports.html");
    // alert("BMI calculated and data stored in localStorage.");
}


function alert2(ico,tit,msg){
    Swal.fire({
    icon: ico,
    title: tit,
    text: msg
    })
    }
function showAlertAndRedirect(ico,tit,msg,url) {
    Swal.fire({
        title: tit,
        text: msg,
        icon: ico,
        showCancelButton: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // If the user clicks "OK," redirect to another page
            window.location.href = url;
        } else {
            // If the user clicks "Cancel," you can handle it here
            console.log('User canceled the action.');
        }
    });
}
// logout function
document.addEventListener('DOMContentLoaded', function () {
    // Find the element with the class .signoutpic
    const signoutLink = document.querySelector('.signoutpic');

    // Attach a click event listener to the signoutLink element
    signoutLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior

        // Clear all items from local storage
        localStorage.clear();
        localStorage.setItem("height", "0");
        localStorage.setItem("weight", "0");
        localStorage.setItem("bmi", "0");
        localStorage.setItem("bp", "0/0");
        localStorage.setItem("pr", "0");
        localStorage.setItem("spo", "0");
        // Redirect to index.html
        window.location.href = 'index.html';
    });
});

function resetPage(){
    const pass="1234";
    const submitpass = document.getElementById('mpass').value;
    if(pass == submitpass){
        fetch('http://172.16.5.4:1880/mk/reset?act=true')
            .then(response => {
                if (response.ok) {
                    // Request was successful, you can handle the response here
                    // console.log('Reset request was successful.');
                } else {
                    // Handle the error here
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => {
                // Handle network or other errors here
                console.error('Error:', error);
            });
    }else{
        alert2("error", "Login Failed","Master Password Incorrect.")
        document.getElementById('mpass').value=""
    }
}


