<---Flow of execution--->

1.User action
2.Action Complete + send API
3.Authentication + Authorization
4.Score update at Databases
5.Score update at end-point
url_image: /problem6/flow

<---improvement in docmentation--->
Url API:`api/score-increment

Method:Post

Request Params: 
    user_id (string,require),
    token (string,require),
    action (string),
    trigger/reason(string,require),
    role(number,require): if role < 0 account banned?
Response:
    status (200 OK/401 unauthorize/400 Bad request)
    message success/error (string)
    data update
Security:
    token bearer to authorization include request headers

Data Storage:
    LocalStorage
    SessionStorage
    Cookies
    Databases real-time (Firebase realtime)
    CDN storage

Authentication and Authorization:
    Limit time remember login (1 days)
    Limit the number of login attempts (3 times)
    Robot authentication by captcha
    Locate where to log in
    Verify that the user has the necessary authorization to increment their score
    Limit increment point prevent users from making an excessive number of requests within a short time frame.

Real-time Updates
    Update realtime from DB to end-user by websocket or realtime databases module


