const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const newUser = new User("bob", "salad", 30)
jest.mock('../src/Scooter.js')

// ScooterApp tests here
describe("Tests for the ScooterApp class Register User method", () => {
    
    test("Can register a user successfully", () => {
        ScooterApp.registerUser("sofie", "silly", 40)
        expect((Object.entries(ScooterApp.registeredUsers[ScooterApp.registeredUsers.length-1]))[0][1]).toBe("sofie")
    })

    test("Cannot register underage users", () => {
        expect(() => {
            ScooterApp.registerUser("sonny", "boxer", 13)
        }).toThrow(`13 is too young to register with our App! Sorry!`)
    })

    test("Cannot register existing Users", () => {
        expect(() => {
            ScooterApp.registerUser("sofie", "silly", 40)
        }).toThrow("User has been registered")
    })

    test("Cannot register without password or age", () => {
        expect(() => {
            ScooterApp.registerUser("Stephen")
        }).toThrow("Please provide password or your age!")
    })
})

describe("Tests for other ScooterApp methods", () => {
  
    test("checking if user can log in successfully via the App", () => {
        ScooterApp.loginUser("bob", "salad")
        expect(newUser.loggedIn).toBe(true)
    })

    test("checking if user can log out successfully via the App", () => {
        ScooterApp.logoutUser("bob")
        expect(newUser.loggedIn).toBe(false)
    })

    test("checking if createScooter() is successful", () => {
        ScooterApp.createScooter("Manchester")
        expect(ScooterApp.stations["Manchester"]).toBeTruthy

    })
})

// log in

// log out

// rent scooter

// dock scooter
