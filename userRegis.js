//This page is dedicated for user registration or sign up


//Add div text for showpassword checkbox
var showpasswordtextReg=document.createElement('div')
showpasswordtextReg.innerHTML='Show Password'
showpasswordtextReg.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 980px;top: 365px;font-size: 18px'

//Add input type 'checkbox' to show password.
var showpasswordReg=document.createElement('input')
showpasswordReg.type='checkbox'
showpasswordReg.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 950px;top: 350px;font-size: 18px'



//Create 4 inputs for username, password, first name, and last name
//Recycle input for username and password from userLogin.js
var firstName=document.createElement('input')
firstName.type='text'
firstName.placeholder='First name...'
firstName.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 450px;top: 50px;font-size: 18px'

var lastName=document.createElement('input')
lastName.type='text'
lastName.placeholder='Last name...'
lastName.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 450px;top:150px;font-size: 18px'


var hugeSignUpBut=document.createElement('Button')
hugeSignUpBut.innerHTML='Signup'
hugeSignUpBut.style.cssText='position: absolute;overflow: visible;width: 350px;height: 50px;left: 500px;top: 450px;font-size: 18px'


var userRegEle=document.createElement('div')
userRegEle.appendChild(firstName)
userRegEle.appendChild(lastName)
userRegEle.appendChild(showpasswordReg)
userRegEle.appendChild(showpasswordtextReg)

showpasswordReg.addEventListener('click',function(e){
    if(showpasswordReg.checked){
    //alert(`It's checked!`)
    passwordEntry.setAttribute('type','text')
    }else{
        //alert(`It's unchecked!`)
        passwordEntry.setAttribute('type','password')
    }
})


//Add click function to sign up button
hugeSignUpBut.addEventListener('click',function(e){
    //alert('Sign-up button is clicked!')
 
    var signuplist=[]
    
    signuplist[0]=document.getElementById('ConverWindow').getElementsByTagName('input')[0].value //first name
    signuplist[1]=document.getElementById('ConverWindow').getElementsByTagName('input')[1].value //last name
    signuplist[2]=document.getElementById('ConverWindow').getElementsByTagName('input')[3].value //user name entry
    signuplist[3]=document.getElementById('ConverWindow').getElementsByTagName('input')[4].value //password entry
    //alert('Acquired values are '+signuplist[0]+signuplist[1]+signuplist[2]+signuplist[3])

    var signuplistJSON=JSON.stringify(signuplist)
    var signupMsg=new Message("12",signuplistJSON)
    signupMsg[1]=signuplistJSON
    var signupMsgJSON=MsgToJson(MessagetoList(signupMsg))

    if(signuplist[0]==''){
       //alert('first name entry is empty') 
    }else
    if(signuplist[1]==''){
        //alert('last name entry is empty')
    }else
    if(signuplist[2]==''){
        //alert('user name entry is empty')
    }else
    if(signuplist[3]==''){
        //alert('password entry is empty')
    }else
    {
        //Send inputs to server!
        if(conStatus==1){ //Only send msg to server when there is open websocket connection
        connection.send(signupMsgJSON)
        }
    }
})










