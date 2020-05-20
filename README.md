# Take home test for www.solbooking.com

**Database Schema**

![Database Schema](https://github.com/romanpastu/solbooking-test-roman/blob/master/imagenes/schema.png?raw=true)

**Login / Register Page**

![Login / Register Page](https://github.com/romanpastu/solbooking-test-roman/blob/master/imagenes/login.png?raw=true)

**Dashboard Page**

![Dashboard Page](https://github.com/romanpastu/solbooking-test-roman/blob/master/imagenes/dashboard.png?raw=true)

# How to deploy
- Clone the repository
- Setup a postgresql12 database
- Import the database backup file using pgAdmin4 `https://github.com/romanpastu/solbooking-test-roman/blob/master/database/SolBookingBackup.tar ` 
- Create a .env file in the BackEnd directory, it should look like /BackEnd/.env
- .env file should contain the following
  ```
  ACCESS_TOKEN_SECRET=This_Should_Be_Your_Strong_Secret
  REFRESH_TOKEN_SECRET=This_Should_Be_Your_Strong_Secret
  DATABASE_URL=This_Should_Be_The_Url_To_The_Database
  ```
- Run `npm i` in the BackEnd , and in the FrontEnd files in order to install the dependencies
- Run `npm run dev` in the BackEnd directory in order to start a dev server, and `npm run start` in the FrontEnd folder to start React in development mode. You can optionally create a production build for the fronEnd. The instructions can be found there https://create-react-app.dev/docs/deployment/
- The file `constants.js` located in `FrontEnd/solbooking-front/src/constants.js` should be modified, and the portnumber, and the ipServer set directly to yout backend settings.
