'use strict'
const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')

module.exports = (app) => {

    const jobRepository = JobRepository(app)
    const profileRepository = ProfileRepository(app)

    async function getUnpaidJobs(profileId) {
        //Calling Job Repository
        const jobs = await jobRepository.getUnpaidJobs(profileId)

        return jobs
    }
    async function payForJob(jobId, profileId){
        
        //Get Job Details
        const job = await jobRepository.getJobDetails(jobId)
        console.log (`Logger: JobId - ${jobId}`)
        
        const price = job.dataValues.ContJob[0].dataValues.price
        const clientId = job.dataValues.clientId
        const contractorId = job.dataValues.contractorId
        console.log(`Logger: Price - ${price}, ClientId - ${clientId} ContractorId - ${contractorId}`)

        //Verify if profile_id matches client_id in job
        if(profileId != clientId){
            console.log('Logger: Profile Mismatch')
            return false
        }

        //Get Client Profile Details
        const clinetProfile = await profileRepository.getProfileDetails(clientId)
        var clientBalance = clinetProfile.dataValues.balance
        console.log(`Client Balance - ${clientBalance}`)

        if(clientBalance >= price){

            //Update Client Balance
            clientBalance = clientBalance - price
            console.log(`Updated Client Balance - ${clientBalance}`)

            await profileRepository.updateProfileBalance(clientId, clientBalance)

            //Get Contractor Profile Details
            const contractorProfile = await profileRepository.getProfileDetails(contractorId)
            var contractorBalance = contractorProfile.dataValues.balance
            console.log(`Contractor Balance - ${contractorBalance}`)
            
            //Update Contractor Balance
            contractorBalance = contractorBalance + price
            console.log(`Updated Contractor Balance - ${contractorBalance}`)

            await profileRepository.updateProfileBalance(contractorId, contractorBalance)
            
            return true
        }
        else{
            return false
        }
    }

    return{
        getUnpaidJobs: getUnpaidJobs,
        payForJob: payForJob
    }
}