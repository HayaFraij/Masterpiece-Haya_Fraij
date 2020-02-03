const db =require("../DB")


let temp = [{
  user: '22 user',
  task: '22 Task',
  time: new Date(),
  Categories: 'Kids Need',
  Price: '333$',
  isUrgent: true,
  scheduledDate: 'Some Date',
  Location:'amman1',
  requested: false,
  listOfProviders: [],
  booking: false,
  userRating: 1,
  accomplished: true,
  serveceProviderRating: 3,
  serveceProvider: 'name 22',
  reports: 0
}]

let creatFirstPost = (cb) => {
  db.posts.create(temp, (err, data) => {
    if (err) {
      cb(err)
    } else {
      cb(data);
      // getall(cb)
    }
  })
}
    
let getTasks = (cb) => {
  db.posts.find({inProgress: false, accomplished: false}, (err, data) => {
      if (err) {
          cb(err)
      } else {
      // console.log('hello from databaseeee')
          cb(data)
      }
  })
}

let Price = (cb) => {
  db.posts.aggregate([{ $sort: { Price: -1} }], (err, data) => {
      if (err) {
          cb(err)
      } else {
      console.log('Sort bt Price (database): ', data)
          cb(data)
      }
  })
}

let Price1 = (cb) => {
  db.posts.aggregate([{ $sort: { Price: 1} }], (err, data) => {
      if (err) {
          cb(err)
      } else {
      console.log('Sort: ', data)
          cb(data)
      }
  })
}

// creatFirstPost(temp)
let getAll = (cb) => {
    db.posts.find({}, (err, data) => {
      if (err) {
        cb(err);
      } else {
      // console.log('hello from database')
        console.log("data:", data);
        cb(data);
      }
    });
  };


  let getRequested = (user, cb) => {
    db.posts.find({user: user}, {accomplished: false}, (err, data) => {
      if (err) {
        cb(err);
      } else {
      // console.log('hello from database history', data)
        // console.log("data:", data);
        // gecbtAll(cb);
        cb(data)
      }
    });
  };

  let getSPPosts = (user, cb) => {
    db.posts.find({listOfProviders: { $in: [user]}}, (err, data) => {
      if (err) {
        cb(err);
      } else {
      // console.log('hello from database history', data)
        // console.log("data:", data);
        // gecbtAll(cb);
        cb(data)
      }
    });
  };

  // let getProviders = (listOfProviders, cb) => {
  //   db.posts.find({user: user}, (err, data) => {
  //     if (err) {
  //       cb(err);
  //     } else {
  //     console.log('hello from database history', data)
  //       // console.log("data:", data);
  //       // gecbtAll(cb);
  //       cb(data)
  //     }
  //   });
  // };


  // let getNotRequested = (user, cb) => {
  //   db.posts.find({user: user, requested: false}, (err, data) => {
  //     if (err) {
  //       cb(err);
  //     } else {
  //     console.log('hello from database history', data)
  //       // console.log("data:", data);
  //       // gecbtAll(cb);
  //       cb(data)
  //     }
  //   });
  // };


let creatNewPost = (newPost, cb) => {
  db.posts.create(newPost,  (err, data) => {
    if (err) {
      cb(err);
    } else {
    // console.log('data: ', data)
      // console.log("data:", data);
      getTasks(cb);
    }
  })
}


// let booking = (serveceProvider, cb) => {
  //   db.posts.updateMany({booking: false, serveceProvider: serveceProvider},  (err, data) => {
    //     if (err) {
      //     console.log(err)
      //       cb(err);
      //     } else {
        //       // console.log('hello from database')
        //         // console.log("data:", data);
        //         cb(data)
        //       }
        //   })
        // }
        let booking = (id, serveceProvider, cb) => {
          db.posts.updateOne({_id: id}, {$set: {requested: true}, $push: { listOfProviders: serveceProvider }},  (err, data) => {
            if (err) {
              cb(err);
            } else {
            // console.log('hello from database')
              // console.log("data:", data);
              getTasks(cb);
            }
          })
        }

        let updateProvider = (id, serviceProvider, cb) => {
          console.log('serviceProvider from database', serviceProvider)
          db.posts.updateOne({_id: id}, {$set: {serveceProvider: serviceProvider, inProgress: true}},  (err, data) => {
            if (err) {
              cb(err);
            } else {
              getTasks(cb);
            }
          })
        }


        // let booking = (id, serveceProvider, cb) => {
        //   db.posts.updateOne({_id: id}, {$set: {booking: true, serveceProvider: serveceProvider}},  (err, data) => {
        //     if (err) {
        //       cb(err);
        //     } else {
        //     console.log('hello from database')
        //       // console.log("data:", data);
        //       getTasks(cb);
        //     }
        //   })
        // }
        let report = (id, cb) => {
          db.posts.updateOne({_id: id}, { $inc: {reports: 1}},  (err, data) => {
            if (err) {
              cb(err);
            } else {
            console.log(id)
            // console.log('hello from database')
              // console.log("data:", data);
              getTasks(cb);
            }
          })
        }

        // let report2 = (id, cb) => {
        //   db.posts.updateOne({_id: id}, {$set: {booking: true}},  (err, data) => {
        //     if (err) {
        //       cb(err);
        //     } else {
        //     console.log(id)
        //     console.log('hello from database 222')
        //       // console.log("data:", data);
        //       getTasks(data);
        //     }
        //   })
        // }


        let report2 = (id, cb) => {
          db.posts.deleteOne({ _id: id }, (err, data) => {
            if (err) {
              cb(err);
            } else {
              console.log(id);
              console.log("hello from database 222");
              // console.log("data:", data);
              getAll(cb);
            }
          });
        };
        
        let getSorted = (name, cb) => {
          db.posts.find({task: name}, (err, data) => {
            if (err) {
        cb(err);
      } else {
        cb(data);
      }
    });
  };

  module.exports = {
    creatFirstPost,
    getAll,
    getSorted,
    getTasks,
    getRequested,
    creatNewPost,
    booking,
    updateProvider,
    report,
    report2,
    Price,
    Price1,
    getSPPosts
  }