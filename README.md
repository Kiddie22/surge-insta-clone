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
- [ ] Integration of Captcha for login/registration forms
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
![image](https://user-images.githubusercontent.com/65882072/216810114-6dd11a7f-4a74-49a3-820b-d62dc54fa74d.png)