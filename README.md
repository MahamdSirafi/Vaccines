# Vaccine management project for the Health Directorate in Aleppo

## Introduction

This project manages the processes of administering vaccinations within health centers in Aleppo Governorate, as it provides the service of monitoring vaccination appointments for both mothers and their children and sending notifications if the date of any vaccine approaches.

## Database Seed

- create an admin user in the database

## Install

Some basic Git commands are:

```
$ git clone https://github.com/MahamdSirafi/Vaccines.git
$ cd Vaccines
$ cd api
$ npm install
```

## Start development

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

## Setting Up .env File

This guide explains how to set up an `.env` file to configure environment variables.

### Steps

1. Create a new file and name it `.env` in your project directory.

2. Open the `.env` file using any text editor.

3. Add the environment variables and their values to the file. Write each variable on a separate line in the following format:

Here are some examples:

NODE_ENV=development

PORT=7000

DATABASE_LOCAL=mongodb://127.0.0.1:27017/DatabaseName

JWT_SECRET=asjdhgjed2187yhdkjawh

JWT_EXPIRES_IN=90d

JWT_COOKIE_EXPIRES_IN=90

SERVICE_EMIL=Sendgrid

EMAIL_HOST=sandbox.smtp.mailtrap.io

EMAIL_PORT=222

EMAIL_USERNAME=sjhajd

EMAIL_PASSWORD=askbhfajs

EMAIL_FROM=test@gmail.com

GMAIL_USERNAME=

GMAIL_PASSWORD=

SENDGRID_USERNAME=

SENDGRID_PASSWORD=

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- Passport.js: Authentication middleware for Node.js
- JSON Web Tokens (JWT): Token-based authentication mechanism
- MongoDB: NoSQL database for data storage

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify the code according to your specific project requirements.
