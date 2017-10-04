# Balancer

### What?
Balancer is a basic cost splitting app that provides a simple way to keep track of how much money you owe or are owed by multiple people. You can view a live version hosted on heroku [here](https://sheltered-fjord-31940.herokuapp.com/).

### Why?
I am learning web development. This is my first project outside of my studies and my first time developing on Node.js / React. I built this project using:
- Express
- React (create-react-app) / Redux
- Mongodb / Mongoose
- Passport.js

### Running Locally
```
$ git clone https://github.com/ahinchliff/balancer
$ cd balancer
$ npm install
$ cd client
$ npm install
$ cd ..
```

Add file config/devKeys with your mongodb URI and cookie key
```javascript
module.exports = {
  cookieKey: '', //sjfjkasdfhkljsadfhkljsa
  mongoURI: '', //mongodb://admin:password@localhost
}
```
```
$ npm run dev
```

### To do
- Add ability to edit / delete transactions
- Add client side form validation
- Research best practise for styling create components
- Completely rewrite client side using [Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript)
- Clean up backend
- Make app usable on smaller screen sizes



