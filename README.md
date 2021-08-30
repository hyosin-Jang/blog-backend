# 🐳 PERSONAL BLOG WEBSITE 🐳

## 📋 Index
1. [Description](#description)  
2. [Details & Functions](#details-&-functions)  
3. [Development Stack](#development-stack)  
4. [Frontend](#frontend)  
5. [Backend](#backend)  
6. [Contributors](#contributors)  
7. [References](#references)  
8. [How to run this project](#how-to-run-this-project)  
<br>


## 📌 Description  
This is a personal blog website builds on React.  
<br>  
  
### 🔎 Details & Functions  
* Login ( local / google-OAuth)  
* CRUD  
* Pagination  
* Design and create website using React and Nodejs  
* Connect with MySQL  
* Build image using Docker  
<br>

## 🛠 Development Stack  
  
* React  
* Nodejs  
* Docker  
<br>  
  
## ❤️ Frontend  
  
###  🎨 Design  
![image](https://user-images.githubusercontent.com/81309465/131250903-9cd344d5-0880-49de-ac82-21678e5463d3.png)  
<br>

###  📁 Structure  
src : Directory for frontend code  
src/views/image : Directory for background image of website  
src/views/inc : Directory for website header  
src/views/page : Directory for total function of website  
<br>  
  
## 💙 Backend  

### 📄 DB&API Spec
* DB Spec  
  + members  
    - id : 유저 고유값  
    - email : google 이메일  
    - name : google에 등록한 이름  
    - picture : google 사진  
  + categories  
    - category: 카테고리명  
  + boards  
    - num: 게시물 고유값  
    - category: 카테고리명  
    - title: 제목  
    - id: 유저 고유값  
    - content: 게시물 내용  
    - date: 게시물 작성시간  
    - hit: 조회수  
  + comments  
    - id: 유저 고유값  
    - num: 댓글 고유값  
    - board_num: 게시물 고유값  
    - content: 댓글 내용  


* API Spec   
  + boards  
    * Add Posts  
     + POST api/add/board  
    * Get a list of posts  
     + GET api/get/board  
    * Update Posts  
     + PUT api/update/board  
    * Delete Posts  
     + DELETE api/delete/board  
    * Get a detailed posting  
     + GET api/get/board_data  
    * Update View Count  
     + PUT api/update/hit  
    * Get a Number of Postings  
     + GET api/get/board_cnt  
    * Get a Content of Previous and Next Button  
     + GET api/get/prev_and_next  
  + comments  
    * Add Comments  
     + POST api/add/comment  
    * Get Comments  
     + GET api/get/comment  
    * Update Comments  
     + PUT api/update/comment  
    * Delete Comments  
     + DELETE api/delete/comment  
  + categories  
    * Add Categories  
     + POST api/add/category  
    * Get Categories  
     + GET api/get/category  
    * Update Categories  
     + PUT api/update/category  


###  📁 Structure  
server/config :  
server/db :  
server/models :  
server/routers :   



## 👸 Contributors  
Minji Chang  https://github.com/SUMMERLOVE7  
Hyosin Jang  https://github.com/hyosin-Jang  
Seojin Kwak  https://github.com/SJ-Kwak  
Sunny Lee  https://github.com/sunnyineverywhere  
<br>  
  
## References  
https://grave-waterlily-5e9.notion.site/43bd1cea60e8443eac4782d736c8f383  
<br>

## How to Run this project  
1. git clone https://github.com/hyosin-Jang/blog-backend.git  
2. npm install
3. yarn dev
<br>  
<br>  
  
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
