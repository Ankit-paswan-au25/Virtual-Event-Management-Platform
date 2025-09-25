# Virtual event management Platform

# Setup of Project

# requirement
1 node *mandatory
2 vscode *Optional
3 Postman Or any request test application
4 Mongodb connection string for Data storage

# step 1 
clone this project from git
    # Command git clone 

# step 2
run  command "npm install"
    This will install all mandatory packages for this application.

# Test all the api mentioned below

# 1  localhost:3000/api/v1/auth/register
<!-- Register your self -->
    Method:Post

    body:{
    "username":"Your Value",
    "password":"Your Value",
    "confirmPassword":"Your Value",
    "email":"Your Value"
    }
# 2  localhost:3000/api/v1/auth/login
<!-- login  -->
    Method:Post

    body:{
    "email":"Your Value"
    "password":"Your Value",
    }

# 3  localhost:3000/api/v1/events
<!-- create Events  if you are Admin or superAdmin-->
    Method :Post
<!-- everything as string in body except * -->

    body:{
    "eventName":" Your value",
    "dateOfEvent":"Your value",
    "timeOfEvent":"Your value",
    "venue":"Your value",
    "seatInEvent":80,*number
    "description":"",
    "createdBy":"Your Id"
}
# 4  localhost:3000/api/v1/events
<!-- get All event in this app -->
    Method:Get

# 5  localhost:3000/api/v1/events/:id
 <!-- get single event by Id -->
    Method:Get (replace id to eventId)
    
# 6  localhost:3000/api/v1/events/:id
<!-- Update single event by Id  But only if you are Admin or superAdmin-->
    Method:Put (replace id to eventId)

    body:{
    "eventName":" Your value",
    "dateOfEvent":"Your value",
    "timeOfEvent":"Your value",
    "venue":"Your value",
    "seatInEvent":80,*number
    "description":"",
    "createdBy":"Your Id" 
}
# 7  localhost:3000/api/v1/events/:id
<!-- delete single event by Id -->
    Method:DELETE (replace id to eventId)
# 8  localhost:3000/api/v1/events/:id/creator
<!-- Get all event created by single user if you are Admin or superAdmin-->
    Method:Get (replace id to YourId)


<!--Above all about Event-->
<!--Below all about User-->
# 9  localhost:3000/api/v1/users
    <!-- to view all Users-->
    Method:Get 
# 10 localhost:3000/api/v1/users/:id
    <!--To view single User-->
    Method:Get (replace id to userId)
# 11 localhost:3000/api/v1/users/:id
    <!--To Update single User-->
    Method:Put (replace id to userId)

    <!-- only changeable fields are username and password-->
    body:{
    "username":"yourValue"
    "password":"Yourvalue"
    }
# 12 localhost:3000/api/v1/users/:id
<!--To Delete single User-->
    Method:Delete (replace id to userId)
    

<!--Above all about User-->
<!--Below user As participants-->
# 13 localhost:3000/api/v1/participants/join
<!-- Join Any Event anyone can join it-->
    Method:POST
    body:{
    "eventId":"EventId",
    "joinerId":"YourId"
}
# 14 localhost:3000/api/v1/participants/remove
<!-- getting out of events-->
    Method:Delete
    body:{
    "eventId":"eventId",
    "joinerId":"YourId"
}
# 15 localhost:3000/api/v1/participants/joiner/:id/event
<!-- get All Event joined by single user-->
    Method:get (replace :id to userId)
# 16 localhost:3000/api/v1/participants/event/:id/joiner
<!--get All user participated in single event-->
    Method:get (replace :id to eventID)

##########################################################################
# Authentication 
 Authentication done with httpcookie and jwt token

