# Devtinder api
AuthRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /requested/review/accepted/:requestId
- POST /requested/review/rejected/:requestId

userRouter
- GET /user/connection
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other user on platform




Status: ignore, interested, accepted, rejected