'use strict'
const ContractController = require('./controllers/ContractController')
const JobController = require('./controllers/JobController')
const ProfileController = require('./controllers/ProfileController')

const {getProfile} = require('./middleware/getProfile')

module.exports = (app) => {

    const contractController = ContractController(app)
    const jobController = JobController(app)
    const profileController = ProfileController(app)

    app.get('/contracts/:id', getProfile, contractController.getContract)
    app.get('/contracts', getProfile, contractController.getAllContracts)
    app.get('/jobs/unpaid', getProfile, jobController.getUnpaidJobs)
    app.post('/jobs/:job_id/pay', getProfile, jobController.payForJob)
    app.post('/balances/deposit/:userId', getProfile, profileController.depositForClient)
    app.get('/admin/best-profession', getProfile, profileController.getBestProfession)
    app.get('/admin/best-clients', getProfile, profileController.getBestClient)
}