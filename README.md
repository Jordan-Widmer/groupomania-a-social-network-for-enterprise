# Groupomania - An Enterprise Social Network

## Description 

Groupomania is an enterprise social network project that enables employees to share content (articles, images, videos, etc.), interact with each other and create a community.

The skills evaluated for this project are: managing SQL data storage, customizing content sent to a web client, implementing secure data storage using SQL, authenticating a user and maintaining their session.

## Prerequisites

• Node.js                         
• MySQL                               
• Vue.js                                
• XAMPP                                     

## Installation

1. Clone the repository
2. Import the Groupomania.sql file in PHPMyAdmin
3. Configure XAMPP and start Apache and MySQL with the correct port
4. In the VSCODE terminal, navigate to the /backend folder using the command `cd .\backend`
5. Run `npm install` to install all backend dependencies
6. Run `npm run server` to start the server
7. Create a .env file with the following information: PORT, SECRET_KEY, DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_PORT
8. Navigate to the /frontend folder using the command cd .\frontend
9. Run `npm install` to install all frontend dependencies
10. Run `npm run serve` to access the development server. The application will automatically reload if you modify a file.

## Database

To add an admin account, go to PHPMyAdmin and modify the isAdmin property of the account you want to add as an administrator. Set the value 1 for admin and 0 for user in the Users table.

## Technologies used

Backend: Node.js, Express, MySQL                              
Frontend: Vue.js, VueX, Axios                                 
Other tools: XAMPP, PHPMyAdmin                          
