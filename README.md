<h1 align="center">
  <img src="./.github/logo.svg">
</h1>

<h1 align="center">
  <img src="./.github/bethehero.png" />
</h1>

## :computer: Project
**Be The Hero** is a project developed in 11th edition of **Semana OmniStack**(OmniStack Week) promoted by **[Rocketseat](https://github.com/Rocketseat)**. The purpose of this project is to make a platform to people find local NGOs and help them. 

---

## :rocket: Technologies
### **Back-end:**
- [JavaScript](hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex.js](http://knexjs.org/)
- [Celebrate](https://github.com/arb/celebrate)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

### **Front-end:**
- [JavaScript](hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ReactJS](https://pt-br.reactjs.org/)
- [React-Router-DOM](https://reactrouter.com/web/guides/quick-start)
- [Axios](https://github.com/axios/axios)

### **Mobile:**
- [JavaScript](hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Expo](https://expo.io/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [Expo Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)
- [Axios](https://github.com/axios/axios)

### **Other used softwares :**
- [Insomnia](https://insomnia.rest/download)
- [Figma](https://www.figma.com)
- [VScode](https://code.visualstudio.com/)

---

## 🔖 Layout
You can access the layout of project on Figma [here](https://www.figma.com/file/2C2yvw7jsCOGmaNUDftX9n/Be-The-Hero---OmniStack-11?node-id=37%3A394). (You need a Figma account )

---

## :gear: Installing
1. Make a clone of this repository with command: 
```bash
$ git clone https://github.com/gabrielcancio/semana-omnistack-11-BeTheHero.git
```

2. On server direcotory run the command(*You need [npm](https://www.npmjs.com/get-npm) installed*): 
```bash
$ npm install 
```
3. On web direcotory run the command: 
```bash
$ npm install
```
4. On server direcotory run the command:
```bash
$ npm install

```
5. On server directory, run the migrations with the command:
```bash
$ npm knex:migrate
```
5. On server directory, you can run the tests with the command:
```bash
$ npm test
```

---

## :zap: Running
1. You can run the API (server application) on server directory and running the follow command:
```bash
$ npm dev
``` 

2. For the mobile and web applications, on the specific directory(mobile or web) run the command:
```bash
$ npm start
``` 

*PS: You need to change the baseURL to IP of your computer on path mobile/src/services/api.js inside of api constant, on baseURL key. Like this:*

```javascript
// Replace "yourIP" to IP of your PC
const api = axios.create({
    baseURL: `http://yourIP:3333`
});
```
---
Developed with :heart: by Gabriel Cancio!
