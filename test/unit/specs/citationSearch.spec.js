import { shallow } from '@vue/test-utils'
import moxios from 'moxios';
import citation from '@/components/citationSearch/citation'

const citationReturn = [{
    case_id: '4EM-19-10065CR',
    date: '2018-02-15T09:00:00-09:00',
    defendant: 'John Doe',
    room: 'Courtroom 5, Bethel Courthouse',
    type: 'Omnibus Hearing'
}]
describe('Citation Search', () => {
    beforeEach(function(){
        moxios.install()
    })
    afterEach(function(){
        moxios.uninstall()
    })
    it('Should pass correct case id as URL parameter', (done) => {
        const caseID = '4EM-19-10065CR'
        moxios.stubRequest(/case/, {
            status: 200,
            response: []
        })
        moxios.wait(function () {
            let request = moxios.requests.mostRecent()
            expect(request.url).to.equal(`case?case_id=${caseID}`)
            done()
        })
        const wrapper = shallow(citation)
        wrapper.setProps({ citationNumber: caseID })
        const vm = wrapper.vm
    })
    it('Should not report no case found when API returns result', (done) => {
        const caseID = 'Jun092989AB'
        moxios.stubRequest(/case/, {
            status: 200,
            response: citationReturn
        })
        moxios.wait(function () {
            let element = vm.$el.querySelector("div.no_records")
            expect(element).to.be.null
            done()
        })
        const wrapper = shallow(citation)
        wrapper.setProps({ citationNumber: caseID })
        const vm = wrapper.vm
    })
    it('Should report no case found when API returns empty result', (done) => {
        const caseID = 'Jun092989AB'
        moxios.stubRequest(/case/, {
            status: 200,
            response: []
        })
        moxios.wait(function () {
            let element = vm.$el.querySelector("div.no_records")
            expect(element).to.not.be.null
            done()
        })
        const wrapper = shallow(citation)
        wrapper.setProps({ citationNumber: caseID })
        const vm = wrapper.vm
    })
    it('Should display api results correctly', (done) => {
        moxios.stubRequest(/case/, {
            status: 200,
            response: citationReturn
        })
        moxios.wait(function () {
            expect(vm.$el.querySelector("#record h4").textContent).to.equal(citationReturn[0].defendant)
            expect(vm.$el.querySelector("#record h5").textContent).to.equal(citationReturn[0].type)
            expect(vm.$el.querySelector("#record").textContent).to.include('Thursday, February 15th 2018 | 9:00 AM')
            expect(vm.$el.querySelector("#record").textContent).to.include(citationReturn[0].room)
            done()
        })
        const wrapper = shallow(citation)
        wrapper.setProps({ citationNumber: citationReturn[0].case_id })
        const vm = wrapper.vm
    })

})
