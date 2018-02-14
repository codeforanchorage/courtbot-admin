import { shallow } from '@vue/test-utils'
import moxios from 'moxios';

import caseCounts from '@/components/globalStats/caseCounts'
import requestCounts from '@/components/globalStats/requestCounts'
import runnerDates from '@/components/globalStats/runnerDates'
import unusableInput from '@/components/globalStats/unusableInput'

describe('Status Counts', () => {
    beforeEach(function(){
        moxios.install()
    })
    afterEach(function(){
        moxios.uninstall()
    })
    it('Should report the correct case counts', (done) => {
        moxios.stubRequest(/hearing_counts/, {
            status: 200,
            response: [
                { count: 200, date: "2018-02-09T10:20:06-09:00", error_count: null, id: 169, runner: "load"},
              ]
        })
        moxios.wait(function () {
            const listElements = vm.$el.querySelectorAll("ul li")
            expect(listElements[0].textContent).to.equal('Records: 200')
            expect(listElements[1].textContent).to.equal('Imported: Feb 09, 2018')
            done()
        })
        const wrapper = shallow(caseCounts)
        const vm = wrapper.vm
    })
    it('Should report the correct request information', (done) => {
        moxios.stubRequest(/request_counts/, {
            status: 200,
            response: { case_count: "17", phone_count: "6"}
        })
        moxios.wait(function () {
            const listElements = vm.$el.querySelectorAll("ul li")
            expect(listElements[1].textContent).to.equal('17 case IDs from')
            expect(listElements[2].textContent).to.equal('6 phone numbers ')
            done()
        })
        const wrapper = shallow(requestCounts)
        const vm = wrapper.vm
    })
    it('Should report the correct runner dates', (done) => {
        moxios.stubRequest(/runner_last_run/, {
            status: 200,
            response: [{runner: "send_reminder",date: "2018-01-26T11:22:15-09:00"},
                       {runner: "send_expired", date: "2018-01-23T11:25:22-09:00"},
                       {runner: "send_matched", date: "2018-01-21T11:12:12-09:00"},
                       {runner: "load", date: "2018-02-09T10:20:06-09:00"}],
        })
        moxios.wait(function () {
            const listElements = vm.$el.querySelectorAll("ul li")
            // squish extra white space //
            expect(listElements[0].textContent.replace(/\s+/g, " ")).to.equal('Reminder: Jan 26, 2018, 11:22 am')
            expect(listElements[1].textContent.replace(/\s+/g, " ")).to.equal('Expired: Jan 23, 2018, 11:25 am')
            expect(listElements[2].textContent.replace(/\s+/g, " ")).to.equal('Matched: Jan 21, 2018, 11:12 am')
            expect(listElements[3].textContent.replace(/\s+/g, " ")).to.equal('Load: Feb 09, 2018, 10:20 am')
            done()
        })
        const wrapper = shallow(runnerDates)
        const vm = wrapper.vm
    })
    it('Should report the correct unusable input', (done) => {
        moxios.stubRequest(/unusable_input/, {
            status: 200,
            response: [{body: "bad_input", count:10},{body: "more bad input", count:5}],
        })
        moxios.wait(function () {
            const listElements = vm.$el.querySelectorAll("ul li")
            expect(listElements[0].textContent).to.include('bad_input ( 10 )')
            expect(listElements[1].textContent).to.include('more bad input ( 5 )')
            done()
        })
        const wrapper = shallow(unusableInput)
        const vm = wrapper.vm
    })
})
