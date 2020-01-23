const db =require("../DB")

let temp = [{
  name: 'otherOne',
  email: 'other',
  phoneNumber: '0777888888',
  password: 'other',
  photo: 'someLink',
  age: '24',
  rating: 1.5
}]


let insertFirstUser = (cb) => {
  db.users.create(temp, (err, data) => {
    if (err) {
      cb(err)
    } else {
      getall(cb)
    }
  })
}

const createUser = (user, cb) => {
  User = {
    ...user
  };
  db.users.create(User, (err, data) => {
    if (err) cb(err);
    else cb(data);
  });
 };

 const createServeceProvider = (user, cb) => {
  User = {
    ...user
  };
  db.users.create(User, (err, data) => {
    if (err) cb(err);
    else cb(data);
  });
 };

 const getUsers = (user, cb) => {
  // console.log(user);
  let USER = {
    email: user.email,
    password: user.password
  };
  // console.log(USER);
  db.users.find(USER, (err, data) => {
    if (err) cb(err);
    else cb(data);
  });
 };

let getall = cb => {
    db.users.find({}, (err, data) => {
      if (err) {
        cb(err);
      } else {
        console.log("data:", data);
        cb(data);
      }
    });
  };

  // let listOfProviders = (listOfProviders, cb )=> {
  //   db.users.find({user: 'other'}, (err, data) => {
  //     if (err) {
  //       cb(err);
  //     } else {
  //       console.log("data:", data);
  //       cb(data);
  //     }
  //   });
  // };

  let listOfProviders = (listOfProviders, cb) => {
    // for (let i = 0; i < listOfProviders.length; i++) {
      let array = listOfProviders.split(',')
      console.log('array', array)
      db.users.find({name: { $in: array}}, (err, data) => {
        if (err) {
          cb(err);
        } else {
          // console.log("hayaadata", data)
          cb(data)
        }
      });
  };

  module.exports = {
    insertFirstUser,
    getall,  
    createUser,
    getUsers,
    createServeceProvider,
    listOfProviders,
  }
