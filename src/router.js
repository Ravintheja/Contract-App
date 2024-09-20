'use strict'
const ContractController = require('./controllers/ContractController')
const JobController = require('./controllers/JobController')
const ProfileController = require('./controllers/ProfileController')

module.exports = (app) => {

    const contractController = ContractController(app)
    const jobController = JobController(app)
    const profileController = ProfileController(app)

    //Broken API
    app.get('/contracts/:id', contractController.getContract)
    app.get('/contracts', contractController.getAllContracts)
    app.get('/jobs/unpaid', jobController.getUnpaidJobs)
    app.post('/jobs/:job_id/pay', jobController.payForJob)
    app.post('/balances/deposit/:userId', profileController.depositForClient)
    app.get('/admin/best-profession', profileController.getBestProfession)
    app.get('/admin/best-clients', profileController.getBestClient)
}