const ContractUsecase = require('../domain/usecases/ContractUsecases');

module.exports = (app) => {

    const contractUsecase = ContractUsecase(app)

    async function getContract(req, res){
        console.log('<==== Single Contract ====>')

        //Rejecting requests without a userId
        if(!req.query.profileId || !req.params.id) return res.status(400).json({
            status: 'Not Found',
            message: 'No Contract or Client ID Present',
            statusCode: 400
        }).end()

        const {id} = req.params
        const profileId = req.query.profileId

        //Calling Contract Usecase
        const contract = await contractUsecase.getContract(id, profileId)
        
        //If records are not found
        if(!contract) return res.status(404).json({
            status: 'Not Found',
            message: 'Contract not found for user',
            statusCode: 404
        }).end()
        //If records are found
        res.json(contract)
    }

    async function getAllContracts(req, res){
        console.log('<==== All Contracts ====>')

        //Rejecting requests without a userId
        if(!req.query.profileId) return res.status(400).json({
            status: 'Not Found',
            message: 'No Contract or Client ID Present',
            statusCode: 400
        }).end()

        const profileId = req.query.profileId
        
        //Calling Contract Usecase
        const contracts = await contractUsecase.getAllContracts(profileId)
        
        //If records are not found
        if(contracts.length == 0) return res.status(404).json({
            status: 'Not Found',
            message: 'Contract not found for user',
            statusCode: 404
        }).end()

        //If records are found
        res.json(contracts)
    }

    return {
        getContract: getContract,
        getAllContracts: getAllContracts
    }
}