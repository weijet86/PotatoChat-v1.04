# PotatoChat-v1.04 (Web-browser version)
 This is a websocket client chat app written in Javascript for web browser to work with a Node JS server which will be included in another file.

Instruction of how to use this websocket client
1) Place PotatoChat_1.04.html and the whole javascripts folder in any folder in your local disc.
2) Open the PotatoChat_1.04.html in browser either via right click and open with selected browser or use command prompt type in path as such "cd /Users/jetty/Visual\ Studio\ Code\ project/PotatoChat\ v1.04" followed by "open PotatoChat_1.04.html".
3) At this point, the open web-browser client would be able to communicate with the Node JS server if the server were open too.
4) User interface of the websocket chat client is designed to be simple and intuitive.  Simply proceed to logging in to chat with username and password.  If you hadn't got an account yet, you could proceed to signing up for an account instead.
5) You would be able to see other users who have signed in after you have signed in to chat yourself.
6) Enjoy chit-chatting with others. =)

Instruction on how to change websocket URI
1) Navigate to javascripts->wsConnection.js.
2) Go to line 12, by default, this line's code is "connection=new WebSocket("ws://localhost:8080")".
3) By default the Node JS server is set to execute at port 8080 and this client app is set to connect to server from the localhost machine.
4) If you intend to use this client outside from localhost machine, you could change the "localhost" to IP address of server. For example, "ws://192.168.1.1:8080".
