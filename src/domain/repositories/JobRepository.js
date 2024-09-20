'use strict'
const { Op } = require('sequelize');

module.exports = (app) => {
    const {Contract, Job} = app.get('models')

    async function getUnpaidJobs(profileId) {
        //Find contract for profile
        const jobs = await Contract.findAll({
            include:[
                {
                    model: Job,
                    as: 'ContJob',
                    where: {
                        paid: null
                    }
                }
            ],
            where: {
                [Op.or]: [
                    { ContractorId: profileId },
                    { ClientId: profileId }
                ],
                status: 'in_progress'
            }
        })

        return jobs
    }

    async function getJobDetails(jobId){
        //Get job details by Id
        const job = await Contract.findOne({
            attributes: ['contractorId', 'clientId'],
            include:[
                {
                    model: Job,
                    as: 'ContJob',
                    where: {
                        id: jobId
                    }
                }
            ]
        })
        
        return job
    }

    async function getClientBalance(clientId){
        //Get Balance For Client
        const balance = await Contract.sum('price',{
            include:[
                {
                    model: Job,
                    as: 'ContJob',
                    where: {
                        paid: null
                    }
                }
            ],
            where: {
                clientId: clientId
            }
        })
        
        return balance
    }

    return{
        getUnpaidJobs: getUnpaidJobs,
        getJobDetails: getJobDetails,
        getClientBalance: getClientBalance
    }
}