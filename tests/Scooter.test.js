const Scooter = require('../src/Scooter')
const User = require('../src/User')
const newScoot = new Scooter("Manchester")
const newUser = new User("bob", "salad", 30)
//typeof scooter === object
describe('Scooter Tests', () => {
  test('is our new scooter an object?', () => {
    
    

    expect(typeof(newScoot)).toEqual("object");
  }
)
})
jest.useFakeTimers()
//Method tests
describe('scooter methods', () => {

  test("checking recharge()", () => {
    
    newScoot.recharge()
    
    jest.advanceTimersByTime(10000);
    expect(newScoot.charge).toBe(100);
  })

  test("checking dock()", () => {
    newScoot.user = newUser.username
    newScoot.station = null
    newScoot.dock("Manchester")
    expect(newScoot.user).toBeFalsy
    expect(newScoot.station).toBe("Manchester")
  })

  test("checking rent()", () => {
    newScoot.rent(newUser)
    expect(newScoot.user).toBe(newUser.username)
    expect(newScoot.station).toBe(null)
  })

  test("checking errors of rent() -- Low charge", () => {
    newScoot.charge = 10
    expect(() => {
      newScoot.rent(newUser)
    }).toThrow(`Scooter number ${newScoot.serial} has Low Battery!`)
  })

  test("checking errors of rent() -- Scooter Broken", () => {
    newScoot.charge = 100
    newScoot.isBroken = true
    expect(() => {
      newScoot.rent(newUser)
    }).toThrow(`Scooter number ${newScoot.serial} needs to be repaired!`)
  })

  test("checking errors of rent() -- already rented", ()=> {
    let newUser2 = new User("bobo", "bed", 23)
    newScoot.isBroken = false
    expect(() => {
      newScoot.rent(newUser2)
    }).toThrow(`Scooter number ${newScoot.serial} is already rented!`)
  })

  test("checking requestRepair()", () => {
    newScoot.isBroken = true
    newScoot.requestRepair()
    jest.advanceTimersByTime(5000)
    expect(newScoot.isBroken).toBe(false)
  })

}) //) tests here!



  //rent method

  //dock method

  //requestRepair method

  //charge method


