# Instagram Clone
### Surge Internship March 2023

Hosted at [https://surge-insta-clone.herokuapp.com/](https://surge-insta-clone.herokuapp.com/)

### File Structure
```
.
├── index.js
├── client
│   ├── public
|   ├── src
|   ├── package-lock.json
│   └── package.json
├── models
│   ├── Post.js
│   └── User.js
├── routes
│   ├── auth.js
│   ├── postRoutes.js
│   ├── userRouter.js
│   └── verifyToken.js
├── tests
│   ├── auth.test.js
│   └── post.test.js
├── .github
│   └── workflows
│       └── node.js.yml
├── package-lock.json
└── package.json
```

### Added Functionality
- [x] Register and Login screens for authentication
- [X] Integration of Captcha for login/registration forms
- [x] Users can authenticate with their username/email and password
- [ ] Use an identity management solution for authentication
- [x] Validation for all sorts of data and input fields
- [x] Protected listing page with all the posts
- [x] Posts indexed according to **Created Date**, **Number of Likes**
- [x] 3 Unit Tests
- [x] CICD Pipeline using GitHub actions and Heroku
- [ ] Containerize with Docker

### User Interface
![image](https://user-images.githubusercontent.com/65882072/216810097-b4715282-bb1f-4a9a-8859-44b1cf5b26d5.png)
![image](https://user-images.githubusercontent.com/65882072/216821884-ee1bf595-2d3c-40cb-9ca9-5ac7ab02da55.png)

### Getting Started
Clone the repository
`git clone https://github.com/Kiddie22/surge-insta-clone.git`

Create a .env in root folder with the following values
- MONGO_URI
- TEST_MONGO_URI
- PASS_SECRET
- JWT_SECRET
- RECAPTCHA_SECRET
- NODE_ENV=production

Create a .env file in the Client folder with
- RECAPTCHA

Run `npm install` and `cd client && npm install`

### Available Scripts

### `npm dev`
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run start`
Runs the Node server.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
