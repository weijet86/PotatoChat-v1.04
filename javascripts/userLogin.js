


//Add to textinput one for username and one for password.
var usernameEntry=document.createElement('input')
usernameEntry.type='text'
usernameEntry.placeholder='Username...'
usernameEntry.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 450px;top: 250px;font-size: 18px'

//Add div text for showpassword checkbox
var showpasswordtext=document.createElement('div')
showpasswordtext.innerHTML='Show Password'
showpasswordtext.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 980px;top: 365px;font-size: 18px'

//Add input type 'checkbox' to show password.
var showpassword=document.createElement('input')
showpassword.type='checkbox'
showpassword.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 950px;top: 350px;font-size: 18px'

showpassword.addEventListener('click',function(e){
    if(showpassword.checked){
    //alert(`It's checked!`)
    passwordEntry.setAttribute('type','text')
    }else{
        //alert(`It's unchecked!`)
        passwordEntry.setAttribute('type','password')
    }
})



var passwordEntry=document.createElement('input') 
passwordEntry.type='password'
passwordEntry.placeholder='Password...'
passwordEntry.style.cssText='position: absolute;overflow: visible;width: 470px;height: 50px;left: 450px;top: 350px;font-size: 18px'

//Add two buttons 1)Register 2)Login
var userLoginEle=document.createElement('div') //Empty div to compile all user login elements.

var SignupBut=document.createElement('Button')
SignupBut.innerHTML='Signup'
SignupBut.style.cssText='position: absolute;overflow: visible;width: 230px;height: 50px;left: 450px;top: 450px;font-size: 18px'

var LoginBut=document.createElement('Button')
LoginBut.innerHTML='Login'
LoginBut.style.cssText='position: absolute;overflow: visible;width: 230px;height: 50px;left: 700px;top: 450px;font-size: 18px'

var responseMsg=document.createElement('div')
responseMsg.innerHTML='Click Login for existing user<br>Click Signup for new user registration'
responseMsg.style.cssText='position: absolute;overflow: visible;width: 300px;height: 50px;left: 450px;top: 520px;font-size: 18px;color:red'

userLoginEle.appendChild(SignupBut)
userLoginEle.appendChild(LoginBut)
userLoginEle.appendChild(responseMsg)
userLoginEle.appendChild(usernameEntry)
userLoginEle.appendChild(passwordEntry)
userLoginEle.appendChild(showpassword)
userLoginEle.appendChild(showpasswordtext)
document.getElementById('ConverWindow').appendChild(userLoginEle)


//Add click function to Sign up button
SignupBut.addEventListener('click',function(e){
    //alert('SignupBut is clicked')
    //Go to Sign Up page
    document.getElementById('ConverWindow').innerHTML=''
    usernameEntry.value=''
    passwordEntry.value=''
    userRegEle.appendChild(usernameEntry)
    userRegEle.appendChild(passwordEntry)
    userRegEle.appendChild(hugeSignUpBut)
    document.getElementById('ConverWindow').appendChild(userRegEle)
})

//Add click function to Login button
LoginBut.addEventListener('click',function(e){
    //alert('LoginBut is clicked')
    //Get both username and password inputs JSON.stringify it then send to Server

    //Check if inputs were empty
    var UNE=document.getElementById('ConverWindow').getElementsByTagName('input')[0].value //Username entry
    var PE=document.getElementById('ConverWindow').getElementsByTagName('input')[1].value //Password entry
    var loginList=[]
    loginList[2]=UNE
    loginList[3]=PE
    var loginListJSON=JSON.stringify(loginList)
    var loginMsg=new Message("11",loginListJSON); //Msg type 11 reserved for login verification
    loginMsg.SetchatName(UNE)
    var loginMsgJSON=MsgToJson(MessagetoList(loginMsg))
    
    if(UNE==''||PE==''){
        //alert('username/password entry is empty')
        responseMsg.innerHTML='Username/Password entry is empty'
    }else
    if(UNE!=''&&PE!=''){
        //alert('Waiting for ID verification from server')
        responseMsg.innerHTML='Waiting for ID verification from server'
        //Send username and password to server for verification
        if(conStatus==1){ //Only send message to open when there is an open websocket connection
        connection.send(loginMsgJSON)
        }
    }
  
    
})

