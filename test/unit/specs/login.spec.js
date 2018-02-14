import Vue from 'vue'
import { shallow } from '@vue/test-utils'
import moxios from 'moxios';
import login from '@/components/login'
import axios from 'axios';
import Auth from "@/auth.js"
/* Setup axios on the vue prototype like we are in components */
Vue.prototype.$http = axios

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSm9obiBEb2UifQ.d6cxJKDM10h6py25X4TTVvMuy-NtecFjcuTBukR_SXY"

describe('Login Panel', () => {
    beforeEach(function(){
        moxios.install()
    })
    afterEach(function(){
        moxios.uninstall()
    })
    it('Should pass username and password to api', (done) => {
        const user = 'some_user'
        const password = 'some_password'
        moxios.stubRequest(/admin_login/, {
            status: 200,
            response: {}
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(JSON.parse(request.config.data)).to.deep.equal({user: user, password: password})
            done()
        })
        const wrapper = shallow(login)
        wrapper.setData({ user: user, password: password })
        wrapper.find('#login').trigger('submit')
    })
    it('Should leave loggedIn false when api does not return a token', (done) => {
        const user = 'some_user'
        const password = 'some_password'
        moxios.stubRequest(/admin_login/, {
            status: 200,
            response: {}
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(Auth.loggedIn).to.equal(false)
            done()
        })
        const wrapper = shallow(login)
        wrapper.setData({ user: user, password: password })
        wrapper.find('#login').trigger('submit')
    })
    it('Should set loggedIn to true when api returns a token', (done) => {
        const user = 'some_user'
        const password = 'some_password'
        moxios.stubRequest(/admin_login/, {
            status: 200,
            response: {token:token}
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(Auth.loggedIn).to.equal(true)
            done()
        })
        const wrapper = shallow(login)
        wrapper.setData({ user: user, password: password })
        wrapper.find('#login').trigger('submit')
    })
    it('Should set user name based on token api returns', (done) => {
        const user = 'some_user'
        const password = 'some_password'
        moxios.stubRequest(/admin_login/, {
            status: 200,
            response: {token:token}
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(Auth.user).to.equal("John Doe")
            done()
        })
        const wrapper = shallow(login)
        wrapper.setData({ user: user, password: password })
        wrapper.find('#login').trigger('submit')
    })
    it('Should set error message if API fails', (done) => {
        const user = 'some_user'
        const password = 'some_password'
        moxios.stubRequest(/admin_login/, {
            status: 401,
            response: 'Unauthorized'
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(wrapper.find('#error').text()).to.equal("Login Failed")
            done()
        })
        const wrapper = shallow(login)
        wrapper.setData({ user: user, password: password })
        wrapper.find('#login').trigger('submit')
    })
})
