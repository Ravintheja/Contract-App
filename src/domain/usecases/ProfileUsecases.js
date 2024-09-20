'use strict'
const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')

module.exports = (app) => {

    const profileRepository = ProfileRepository(app)
    const jobRepository = JobRepository(app)

    async function depositForClient(clientId, amount){

        //Get Client Profile Details
        const clientProfile = await profileRepository.getProfileDetails(clientId)
        var clientBalance = clientProfile.dataValues.balance
        var clientType = clientProfile.dataValues.type
        console.log(`Logger: Client Balance - ${clientBalance}, Client Type = ${clientType}`)

        //Validating Profile Type
        if(clientType == 'contractor'){
            return false
        }

        //Get Outstanding Amount For Client
        const outstanding = await jobRepository.getClientBalance(clientId)
        console.log(`Logger: Outstanding Balance - ${outstanding}`)

        //Proceed with payment if the amount is below 25% of outstanding
        if(outstanding !== null ? outstanding*0.25 >= amount : true){
            //Update Client Balance
            clientBalance =  clientBalance + parseInt(amount)
            console.log(`Logger: New Balance - ${clientBalance}`)

            await profileRepository.updateProfileBalance(clientId, clientBalance)

            return true
        }
        else{
            return false
        }
    }

    async function getBestProfession(startDate, endDate){

        //Query Highest Earnings per Profession
        const profession = await profileRepository.getBestProfession(startDate, endDate)
        console.log(`Logger: ${profession}`)
        
        const bestProfession = {"Profession" :profession[0].dataValues.profession, 
            "Earning":profession[0].dataValues.amount}

        return bestProfession
    }

    async function getBestClient(startDate, endDate, limit){

        //Query Highest Payments per Client
        const client = await profileRepository.getBestClient(startDate, endDate, limit)
        console.log(`Logger: ${client}`)
        
        return client

    }

    return{
        depositForClient: depositForClient,
        getBestProfession: getBestProfession,
        getBestClient: getBestClient
    }
}