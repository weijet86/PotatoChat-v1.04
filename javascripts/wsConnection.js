
var connection
var list_of_chatElement=[]
var userList
var conStatus=2 //1-Connected to server successfully, 2- Can't connect to server
var loginStatus=2 //1-Login to server, 2-Not login to server, 3-Login to server and userlist generated


class runWebSoc{
runWs(){

        connection=new WebSocket("ws://localhost:8080") //start websocket
        connection.onopen=()=>{
                //alert('connection is open')
                conStatus=1
                //alert('connection is open and conStatus '+conStatus)
                
        }
        
        
        /**WebSocket OnMessage */
        connection.onmessage = (e) => {
               
        //Convert received string back to message list  
        var list_msg_r=JsonToMsg(e.data);
        
        //alert(list_msg_r)        
        /**For message type 1-text message */
        if(parseInt(list_msg_r[0])==1){
                blinktab()
                   
                refreshUserList.click() //This is temporary solution for receiving message from users not on app userlist yet!
                
                setTimeout(function (){
                // Something you want delayed.
         
                updateType1Msg(list_msg_r)
                
                }, 200);
                
        }
        /** */
        /**Check if message type is 9 for user list */
        if(parseInt(list_msg_r[0])==9) {
        //TODO-Only empty ConverWindow after login 
        if(loginStatus==1){
                //alert('Emptying ConverWindow')
               EmptyConverWindow() //TODO-Every time I press refresh user list button, this function will empty "ConverWindow"    
        }
        
        
        userList=JSON.parse(list_msg_r[1]);
        userlistElement.innerHTML=""
        notiListEle.innerHTML=""
        for(var i=0;i<userList.length;i++){
        //Call for function createListElement
        createListElement(userList[i]);
      
        } 
        
        //It's time to update list_of_chatElement if there is new user
        //alert("userList size is "+userList.length);
        //alert("list_of_chatElement size is "+list_of_chatElement.length);
        
        if(userList.length>list_of_chatElement.length){ 
                //alert('userList is bigger than list_of_chatElement');
                var netLength=userList.length-list_of_chatElement.length
                for(var i=0;i<netLength;i++){ //Loop as many time as netLength to create as many new Chat elements.
                        var newChat=new chat(userList[userList.length-i-1],createChatEle(userList[userList.length-i-1]))
                        list_of_chatElement[userList.length-i-1]=newChat
                        unreadMsgCountList[userList.length-i-1]=0  //This would create count list only once when there is new user
                        //alert('i is '+i+"URMCL is "+unreadMsgCountList[i])
                }
                //alert('list of chat element size is '+list_of_chatElement.length)
                
        }
        loginStatus=3
        }else
        if(parseInt(list_msg_r[0])==11){ //Login
        //TODO- At websocket wsConnection, add feature to receive ID verification instruction from server
        //Positive- document.getElementById('UserListSection').appendChild - present userlist acquired from server and start chat.
        //Negative- Alert msg "You have entered invalid username/password!"
          if(list_msg_r[1]=='You have signed in successful!'){
             //alert('Start Chat!')     
             responseMsg.innerHTML='You have logged in successfully!'
             chatName=list_msg_r[6]     
             loginStatus=1
             //alert('Start Chat! loginStatus is '+loginStatus)
          }else
          if(list_msg_r[1]=='Wrong username/password!Please try again!'){
                //alert('Wrong username/password!Please try again!')
                responseMsg.innerHTML='You have entered wrong Username/Password! Please try again!'
          }else
          if(list_msg_r[1]==`Username doens't exist!Please try again!`){
                //alert(`Username doesn't exist!`)
                responseMsg.innerHTML=`Username doesn't exist!`
          }else
          if(list_msg_r[1]==`You already logged in somewhere else!`){
                responseMsg.innerHTML=`You already logged in somewhere else!`
          }    
        
        }else
        if(parseInt(list_msg_r[0])==12){ //User Sign up
           //Wait for sign up success confirmation instruction from server     
          //Automatically log in to server after sign up and present user list and start chat!
           //alert(list_msg_r[1]) //Acquired instruction msg from server
           if(list_msg_r[1]=='Your new signup is successful!'){
                //alert('New signup registration is successful! Please proceed to login!')
                //TODO- Change 'ConverWindow' back to login elements
                document.getElementById('ConverWindow').innerHTML=''
                userLoginEle.appendChild(usernameEntry)
                userLoginEle.appendChild(passwordEntry)
                userLoginEle.appendChild(showpassword)
                userLoginEle.appendChild(showpasswordtext)
                usernameEntry.value=''
                passwordEntry.value=''
                document.getElementById('ConverWindow').appendChild(userLoginEle)
                responseMsg.innerHTML='New member signup was successful! Please proceed to login!'
           }else
           if(list_msg_r[1]=='Username already exists!Please choose another name!'){
                   //alert('Username already exists!')
                   responseMsg.innerHTML='Username already exists!'
           }
        }else
        if(parseInt(list_msg_r[0])==14){
            alert('Received type 14 msg and '+list_msg_r[1]+' logged out!')
            
            for(i=0;i<list_of_chatElement.length;i++){
               if(userList[i]==list_msg_r[1]){
                       //Splice off logged-out user from userList
                       userList.splice(i,1)
                       //Splice off chatElement of logged-out user
                       list_of_chatElement.splice(i,1)
               }     
            }    
            userlistElement.innerHTML=""
            notiListEle.innerHTML=""
            for(var i=0;i<userList.length;i++){
                //Call for function createListElement
                createListElement(userList[i]);
              
             } 
            
        }else
        if(parseInt(list_msg_r[0])==15){
                alert('Received type 15 msg and '+list_msg_r[1]+' signed in!') 
            //TODO-Search if user just signed in already exist in userList

            //TODO- Add user to userList and add respective chatElement, if user is not in userList       
        }
    
}

        

}


        

}


function updateType1Msg(list_msg_r){
        var replystr="&emsp;&emsp;"+list_msg_r[6]+": "+list_msg_r[1]+"<br>";
        var result=replystr.fontcolor('#997106');
        //Search for the right position of chat element with sender's name
        var senderName=list_msg_r[6]
        //alert(`Sender's name is `+senderName)
        var sendPos
        //alert(`list_of_chatElement length is `+list_of_chatElement.length)
        sendPos=searchSenderPos(senderName)
        //Call of the right chat element with acquired sender's position
        list_of_chatElement[sendPos].getChatElement().getElementsByTagName('div')[0].innerHTML+=result
        list_of_chatElement[sendPos].getChatElement().getElementsByTagName('div')[0].scrollTop = list_of_chatElement[sendPos].getChatElement().getElementsByTagName('div')[0].scrollHeight
        blinkdiv(userList[sendPos])
}

function searchSenderPos(senderName){
        var sendPos
        for(var x=0;x<userList.length;x++){
                if(userList[x]==senderName){sendPos=x; /** alert(`sender position is `+sendPos)*/}
        }
        return sendPos
}

//Create a void function to empty ConverWindow section, followed by display of userListElement in 
//UserListSection and ChatName in ChatNameSection, after a successful login.
function EmptyConverWindow(){
        
        chatNameDisplay.innerHTML="I'm "+chatName

        document.getElementById('ChatNameSection').appendChild(chatNameDisplay) 
        userlistElement.style.border="2px solid black"
        userlistElement.style.position="absolute"
        userlistElement.style.overflow='auto'
        userlistElement.style.top="80px"
        userlistElement.style.left="50px"
        userlistElement.style.width='250px'
        userlistElement.style.height="570px"
        userlistElement.style.color="rgba(245,0,47,0.341)"
        userlistElement.style.fontSize='25px'
        userlistElement.style.fontFamily='Seravek'
        userlistElement.style.fontStyle='italic'
        userlistElement.style.fontWeight='normal'
        document.getElementById('UserListSection').appendChild(userlistElement)
        document.getElementById('UserListSection').appendChild(refreshUserList)
        document.getElementById('ConverWindow').innerHTML=""
        
}
