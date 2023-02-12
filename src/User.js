class User {
  static userslist = []
  constructor(username, password, age) {
    this.username = username
    this.password = password
    this.age = age
    this.loggedIn = false
    User.userslist.push(this)
}  
  // User code here
  login(password) {
    if (password == this.password && this.loggedIn) {
      throw new Error(`${this.username}, you are already logged in!`)
    }
    else if (password == this.password){ 
      this.loggedIn = true
      console.log(`${this.username} Welcome back!`)
    }
    else if(password != this.password) {
      throw new Error(`${this.username}, your password is incorrect!`)
  }
  }
  
  logout() {
    this.loggedIn = false
    console.log(`${this.username} thank you for using ScooterApp! Goodbye.`)
  }

}

module.exports = User
