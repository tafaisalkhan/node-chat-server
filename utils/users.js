[{
  id: '/#12poiajdspfoif',
  name: 'Andrew',
  gameId: 1
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, gameId) {
    var user = {id, name, gameId};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser(id){
    return this.users.filter((user) => user.id === id)[0]
  }
  getUserList(gameId) {
    var users = this.users.filter((user) => user.gameId === gameId);
    
    var namesArray = users.map((user) => user.name);
  
    return namesArray;
  }


getUserListCount(gameId) {
  
  var users = this.users.filter((user) => user.gameId === gameId);
  
  var namesArray = users.map((user) => user.name);

  return namesArray.length;
}

}

module.exports = {Users};

 // class Person {
 //   constructor (name, age) {
 //     this.name = name;
 //     this.age = age;
 //   }
 //   getUserDescription () {
 //     return `${this.name} is ${this.age} year(s) old.`;
 //   }
 // }
 //
 // var me = new Person('Andrew', 25);
 // var description = me.getUserDescription();
 // console.log(description);
