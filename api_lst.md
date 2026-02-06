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


/feed?page=1&limit=10 => 1-10  =>.skip(0) &.limit(10)

/feed?page=2&limit=10 => 11-20 =>.skip(10) &.limit(10)

/feed?page=3&limit=10 => 21-30 =>.skip(20) &.limit(10)

.skip(0) &.limit(10)

skip = (page - 1)*limit