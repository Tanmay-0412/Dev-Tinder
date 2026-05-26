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

> Review Request Api
<!-- - POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId -->
- POST/request/review/:status/:requestId

> user Router
- GET/user/requests/recieved
- GET/user/connection
- GET/user/ feed
//* Feed profile - Gets you the profiles of other users on platform
- /feed?page=1&limit=10 => first 10 users 1-10
- /feed?page=2&limit=10 => 11-20
- /feed?page=3&limit=10 => 21-30
#  .skip(0).limit(10)
> skip = (page-1)*limit

// Logic : User Akshay should not see the profile whose status is marked interested, ignored and accepted(connected)
// not to show the card of itself 

// User should see all the user cards except
// 0. his own card
// 1. his connection - accepted 
// 2. ignored people
// 3. already sent the connection request - interested  


- leftswipe - pass api (ignored) , rightswipe - like api (interested)
- Status - ignored,  interested, accepted, rejected 


- Thought Process - POST vs GET
 
