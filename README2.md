# My Journal

## About The Project:

The idea from this project came to me once I found the API that I wanted to use for this project. The quotes API I selected gave me the idea of creating
a private space in which the user can have an online journal, create new entries and keep record of all the entries. This app was created with the 
implementation of Express,Javascript, HTML, CSS, Bootstap and PSQL.

## Installation Instructions:
1.Git clone https://github.com/ddanieela1/f-web-app

2.Change directory in the terminal (cd f-webb-app)

3.Run npm install in the terminal

4.Run npm start or nodemon in the terminal to start the app

## Deployment Link:
https://my-priv-journal.herokuapp.com/

## Wireframe:
![IMG_28FFB5DC6A0B-1](https://user-images.githubusercontent.com/96893640/193943501-ad411ee9-23cd-4739-9e66-562e0feb2600.jpeg)


## ERD:
![IMG_78272DA07424-1](https://user-images.githubusercontent.com/96893640/193940471-3aa239b9-93ff-42ff-b8ac-cfbf2c1f7b10.jpeg)


## Database:
This project consisted of a database that included two models, "journal" and "user". The journal model contained all the data from the users entries,
upon creation of a journal entry new data will be stored in the journals table in the database. The users model contained the users that log in to use 
the app, upon creation of a new user, the data will be stored in the users table in the database. The "user" model has a one to many relationship with the
"journal" model, since one user can create multiple entries.


### Models:
![Screen Shot 2022-10-04 at 7 08 13 PM](https://user-images.githubusercontent.com/96893640/193947142-818d3187-f097-49f8-9266-de6daec231b0.png)

![Screen Shot 2022-10-04 at 7 07 59 PM](https://user-images.githubusercontent.com/96893640/193947150-d5751a8c-37b3-497b-99dc-4f29c7c13330.png)

![Screen Shot 2022-10-04 at 7 12 49 PM](https://user-images.githubusercontent.com/96893640/193947314-fb47e385-1d45-4aa3-9d3b-9c784a854e1b.png)


## Home Screen:
![Screen Shot 2022-10-04 at 7 15 33 PM](https://user-images.githubusercontent.com/96893640/193947786-7f444f55-5060-4224-8de8-c948985f717d.png)

## Creating A New Entry:
![Screen Shot 2022-09-27 at 7 24 24 PM](https://user-images.githubusercontent.com/96893640/192654637-1d6acca3-de21-402c-80a6-10a41cf87f26.png)

## Adding A Reminder:
![Screen Shot 2022-10-04 at 7 15 55 PM](https://user-images.githubusercontent.com/96893640/193947813-fdc7c631-35f3-4893-9772-6c516fc22cab.png)


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
