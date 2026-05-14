# DevTinder APIS - 13 apis

> Auth Router
- POST/signup
- POST/login
- POST/logout

> Profile Router
- GET/profile/view
- PATCH/profile/edit   
- PATCH/profile/password  -- // Forgot password API

> connectionRequest Router 
<!-- - POST/request/send/interested/:userId
- POST/request/send/ignored/:userId -->
- POST/request/send/:status/:userId               ---- status = interested / ignored

> Review api request
<!-- - POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId -->
- POST/request/review/:status/:requestId

> user Router
- GET/user/connection
- GET/user/requests/
- GET/user/ feed
//* Feed profile - Gets you the profiles of other users on platform


- leftswipe - pass api (ignored) , rightswipe - like api (interested)
- Status - ignored,  interested, accepted, rejected 

