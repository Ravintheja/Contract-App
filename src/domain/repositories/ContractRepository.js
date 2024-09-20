'use strict'
const { Op } = require('sequelize');

module.exports = (app) => {

    const {Contract} = app.get('models')
    
    async function getContract(id, profileId){
        //Find contract for profile
        const contract = await Contract.findOne({
            where: {
                id,
                [Op.or]: [
                    { ContractorId: profileId },
                    { ClientId: profileId }
                ]
            }
        })

        return contract
    }

    async function getAllContracts(profileId){
        //Find all non-terminated contracts for profile
        const contracts = await Contract.findAll({
            where: {
                status: {[Op.not]: 'terminated'},
                [Op.or]: [
                    { ContractorId: profileId },
                    { ClientId: profileId }
                ]
            }
        })
        
        return contracts
    }

    return {
        getContract: getContract,
        getAllContracts: getAllContracts
    }
}

        