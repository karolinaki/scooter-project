const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  static stations = { Manchester: 0, Glasgow: 0, Taipei: 0, Lagos: 0, Hannoi: 0 }
  static registeredUsers = User.userslist
  static allScooters = []

  static registerUser(username, password, age) {
    for (let i = 0; i < ScooterApp.registeredUsers.length; i++) {
      if (ScooterApp.registeredUsers[i]["username"] == username) {
        throw new Error("User has been registered")
      }
    }
    if (age < 18) {
      throw new Error(`${age} is too young to register with our App! Sorry!`)
    }
    else if (!password || !age) {
      throw new Error("Please provide password or your age!")
    }
    else {
      new User(username, password, age).loggedIn= true
      console.log("user is now registered, welcome!")
    }
  }

  static loginUser(username, password) {
    for (let i = 0; i < ScooterApp.registeredUsers.length; i++) {
      if (ScooterApp.registeredUsers[i]["username"] == username) {
        ScooterApp.registeredUsers[i].login(password)
      }
    }
  }
  static logoutUser(username) {
    for (let i = 0; i < ScooterApp.registeredUsers.length; i++) {
      if (ScooterApp.registeredUsers[i]["username"] == username) { 
        ScooterApp.registeredUsers[i].logout()
      }
    }
  }

  static createScooter(station) {
    if (!(station in ScooterApp.stations)) {
      throw new Error("no such station currently in our database!")
    } else {
      ScooterApp.stations[`${station}`] += 1
      new Scooter(station)
      console.log(`new scooter supplied to the ${station} station! it's serial number is ${ScooterApp.allScooters[ScooterApp.allScooters.length-1].serial}`)
    }
  }

  static rentScooter(scooter , user) {
    if (scooter.user) {
      throw new Error("Scooter is already in use!")
    }else{
    scooter.rent(user)
    scooter.whileRented()
    console.log(`Scooter number ${scooter.serial} has now been rented to ${user.username}`)
    }
  }
  
  static print() {
    console.log(`Generating report.... \n
    ...\n
    Here is the data currently in our records; \n
    Number of registered Users with our app: ${ScooterApp.registeredUsers.length}.`)
    let loggedon = 0
    for (let i in ScooterApp.registeredUsers) {
      if (ScooterApp.registeredUsers[i].loggedIn) {
        loggedon +=1
      }
    }
    console.log(`There are currently ${loggedon} users online.`)
    console.log(`Here are how many scooters are at our stations:`)

    for (const [key, value] of Object.entries(ScooterApp.stations)) {
    console.log(`${key}: ${value}`);
}
    console.log("Thank you")
     
  }
  }









module.exports = ScooterApp
