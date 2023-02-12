const ScooterApp = require("./ScooterApp.js")
const User = require("./User.js")

class Scooter {

  static nextSerial = 0;
  constructor(station) {
    this.station = station
    //ideally need to pick a station that ScooterApp defines
    //station == null when user rents
    this.user = null
    this.serial = Scooter.nextSerial += 1
    this.charge = 100
    this.isBroken = false
    ScooterApp.allScooters.push(this)
    if (station in ScooterApp.stations) {
      ScooterApp.stations[station] += 1
    } else {
      ScooterApp.allScooters.pop()
      throw new Error("No such station exists!")
    }
  }

  recharge() {
     var charging = setInterval(() => {
       if (this.charge < 100) {
         this.charge += 5
         console.log(`Scooter number ${this.serial} is charged ${this.charge}%`)
       } else {
         console.log(`Scooter number ${this.serial} is fully charged!`)
         return clearInterval(charging)
       }
    }, 5000)
  }

  rent(user) {
    if (this.charge > 20 && this.isBroken == false && this.user == null) {
      this.station = null
      this.user = user.username
      this.whileRented()
    } else if (this.charge <= 20) {
      throw new Error(`Scooter number ${this.serial} has Low Battery!`)
    } else if (this.isBroken) {
      this.requestRepair()
      throw new Error(`Scooter number ${this.serial} needs to be repaired!`)
    } else if (this.user) {
      throw new Error(`Scooter number ${this.serial} is already rented!`)
    }
  }

  dock(station) {
    this.station = station
    this.user = null
    this.recharge()
    this.requestRepair()
    console.log(`Scooter number ${this.serial} has been returned to ${this.station}`)

  }

  requestRepair() {
    if (this.isBroken == true) {
      let fix = setInterval(() => {
        this.isBroken = false
        console.log(`Scooter number ${this.serial} is repaired!`)
        return clearInterval(fix)
      },5000);
    } else {
      return
    }
  }

  whileRented() {
    if (this.user) {
      let batteryRunning = setInterval(() => {
        if (this.charge > 10) {
          this.charge -= 10
        }else{
          clearInterval(batteryRunning)
          console.log(`${this.user}, your scooter has ran out of battery! Return to station!`)
        }
      }, 5000)
    }
  }

}
  



module.exports = Scooter
