const { Op } = require('sequelize');
const JobUsecase = require('../domain/usecases/JobUsecases');
const { json } = require('body-parser');

module.exports = (app) => {

    const jobUsecase = JobUsecase(app)

    async function getUnpaidJobs(req, res){
        console.log('<==== Unpaid Jobs ====>')
        
        const profileId = req.headers['profile_id']
        
        //Calling Job Usecase
        const unpaidJobs = await jobUsecase.getUnpaidJobs(profileId)

        //If records are not found
        if(unpaidJobs.length == 0) return res.status(404).json({
            status: 'Not Found',
            message: 'Contract not found for user',
            statusCode: 404
        }).end()

        //If records are found
        res.json(unpaidJobs)
    }

    async function payForJob(req, res){
        console.log('<==== Pay For Jobs ====>')

        //Rejecting requests without a userId
        if(!req.params) return res.status(400).json({
            status: 'Not Found',
            message: 'No Job ID Present',
            statusCode: 400
        }).end()

        const {job_id} = req.params
        const profileId = req.headers['profile_id']

        // Calling Job Usecase
        const payForJob = await jobUsecase.payForJob(job_id, profileId)

        if(!payForJob){
            return res.status(400).json({
            status: 'Bad Request',
            message: 'Client Balance Insufficient or Incorrect Profile',
            statusCode: 400
        }).end()
        }
        else{
            return res.status(200).json({
                status: 'Success',
                message: 'Payment Successful',
                statusCode: 200
            })
        }
    }

    return{
        getUnpaidJobs: getUnpaidJobs,
        payForJob: payForJob
    }
}