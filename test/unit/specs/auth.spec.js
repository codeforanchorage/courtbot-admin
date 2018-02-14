import auth from "@/auth.js"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSm9obiBEb2UifQ.d6cxJKDM10h6py25X4TTVvMuy-NtecFjcuTBukR_SXY"

describe("Auth Module", function(){
    before(function(){
        auth.logOut()
    })
    afterEach(function(){
        auth.logOut()
    })
    it("loggedIn should be false when token is not present", function(){
        expect(auth.loggedIn).to.equal(false)
    })
    it("setToken/LogOut should set/remove local storage token", function(){
        auth.token = token
        expect(localStorage.getItem('token')).to.equal(token)
        auth.logOut()
        expect(localStorage.getItem('token')).to.be.null
        expect(auth.user).to.be.null
    })
    it("Setting token should set loggedIn to true ", function(){
        auth.token = token
        expect(auth.loggedIn).to.equal(true)
    })
    it("Setting token should set user", function(){
        auth.token = token
        expect(auth.user).to.equal("John Doe")
    })
})