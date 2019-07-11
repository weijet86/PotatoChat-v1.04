//This class should belong Server only. Node js server has the library to read and write file to local drive
//For client side, simply JSON.stringify this class object and send to server.

class userRegObj{
    constructor(username,password,firstname,lastname){
        this.username=username
        this.password=password
        this.firstname=firstname
        this.lastname=lastname
    }

    setUserName(username){this.username=username}
    getUserName(){return this.username}
    setPassword(password){this.password=password}
    getPassword(){return this.password}
    setFirstname(firstname){this.firstname=firstname}
    getFirstname(){return this.firstname}
    setLastname(lastname){this.lastname=lastname}
    getLastname(){return this.Lastname}
}

ß
