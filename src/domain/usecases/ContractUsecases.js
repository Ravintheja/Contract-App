'use strict'
const ContractRepository = require('../repositories/ContractRepository')

module.exports = (app) => {

    const contractRepository = ContractRepository(app)

    async function getContract(id, profileId){
        //Calling Contract Repository
        const contract = contractRepository.getContract(id, profileId)

        return contract
    }

    async function getAllContracts(prfileId) {
        //Calling Contract Repository
        const contracts = contractRepository.getAllContracts(prfileId)

        return contracts
    }

    return{
        getContract: getContract,
        getAllContracts: getAllContracts
    }
}