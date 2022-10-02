# My Journal

## About The Project:

The idea from this project came to me once I found the API that I wanted to use for this project. The quotes API I selected gave me the idea of creating
a private space in which the user can have an online journal, create new entries and keep record of all the entries. This app was created with the 
implementation of Express,Javascript, HTML, CSS, Bootstap and PSQL.

## Installation Instructions:
1.Git clone https://github.com/romebell/f-web-app.git
2.cd supreme-engine
3.npm install
4.Touch .env
5.Add inside .env the "SECRET_SESSION"
6.Retrieve API Key from Rapid API and store inside .env with the variable of "API_KEY"

## Wireframe:
![IMG_D5B384B4EB94-1](https://user-images.githubusercontent.com/96893640/192419204-5fb64f39-e223-49a7-b508-9e53f5262bfd.jpeg)


## Associations:
![IMG_EA1B9BF3F612-1](https://user-images.githubusercontent.com/96893640/192418261-5890540d-f97c-4051-ac64-e37c522a987e.jpeg)

## Database:
This project consisted of a database that included two models, "journal" and "user". The journal model contained all the data from the users entries,
upon creation of a journal entry new data will be stored in the journals table in the database. The users model contained the users that log in to use 
the app, upon creation of a new user, the data will be stored in the users table in the database. The "user" model has a one to many relationship with the
"journal" model, since one user can create multiple entries.
### Journal Model:
![Screen Shot 2022-09-26 at 10 22 10 PM](https://user-images.githubusercontent.com/96893640/192416588-16a93719-408e-48b3-b100-a788d73785ac.png)

### User Model:
![Screen Shot 2022-09-26 at 11 32 04 PM](https://user-images.githubusercontent.com/96893640/192425576-2a2b321c-c3ba-4c25-8653-45bae1d35a5a.png)

## Home Screen:
![Screen Shot 2022-09-27 at 7 24 11 PM](https://user-images.githubusercontent.com/96893640/192654678-effae6d0-b560-487e-8595-53acf4778ac8.png)


## Creating A New Entry:
![Screen Shot 2022-09-27 at 7 24 24 PM](https://user-images.githubusercontent.com/96893640/192654637-1d6acca3-de21-402c-80a6-10a41cf87f26.png)


## Code Breakdown:
The app consists of one server file with the following dependencies imported:
![Screen Shot 2022-09-26 at 10 51 34 PM](https://user-images.githubusercontent.com/96893640/192420656-fb8f0eed-fc28-4c75-8bd6-998e6a4492e0.png)

The main route was left in the server file and the other routes were exported into controllers. The app consisted of two controller files, the "journals"
and "auth" controller. The "journals" controller handles all the routes that involve creating an entry, opening , deleting, and editing a journal entry.
The "auth" controller handles the routes that involve creating a user account, logging into and account and viewing the user profile.
The page for each route were in a views folder wich were in EJS format. There was also a "layout.ejs" which set up the basic structure for each page that
will be navigated. There is also a middleware folder with a javascript file that checks if the user is logged in to be granted access into the app.

## Possible Improvements:
If I wouldve had more time available for this project I would've given the user the option to upload a photo with each journal entry. I wouldve also added
a calendar to the home page with the option to add events and finally adding the option to search for an individual journal entry.
