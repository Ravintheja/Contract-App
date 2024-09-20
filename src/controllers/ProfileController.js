const { Op } = require('sequelize');
const ProfileUsecase = require('../domain/usecases/ProfileUsecases');
const { json } = require('body-parser');

module.exports = (app) => {

    const profileUsecase = ProfileUsecase(app)

    async function depositForClient(req, res){
        console.log('<==== Deposit For Client ====>')

        //Rejecting requests without a userId
        if(!req.query.amount) return res.status(400).json({
            status: 'Not Found',
            message: 'Deposit Amount Not Present',
            statusCode: 400
        }).end()

        const clientId = req.headers['profile_id']
        const amount = req.query.amount

        const deposit = await profileUsecase.depositForClient(clientId, amount)

        if(!deposit){
            return res.status(400).json({
            status: 'Bad Request',
            message: 'Cannot Deposit Amount',
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

    async function getBestProfession(req, res){
        console.log('<==== Best Client ====>')

        //Rejecting requests without a dates
        if(!req.query.start || !req.query.end) return res.status(400).json({
            status: 'Not Found',
            message: 'Date Range Not Present',
            statusCode: 400
        }).end()

        const startDate = req.query.start
        const endDate = req.query.end

        const profession = await profileUsecase.getBestProfession(startDate, endDate)

        if(!profession){
            return res.status(400).json({
            status: 'Bad Request',
            message: 'No Data Available',
            statusCode: 400
        }).end()
        }
        else{
            return res.status(200).json({profession})
        }
    }

    async function getBestClient(req, res){
        console.log('<==== Best Profession ====>')

        //Rejecting requests without a dates
        if(!req.query.start || !req.query.end) return res.status(400).json({
            status: 'Not Found',
            message: 'Date Range Not Present',
            statusCode: 400
        }).end()
        
        const startDate = req.query.start
        const endDate = req.query.end
        const limit = req.query.limit ? req.query.limit : 2
        
        console.log(limit)
        const client = await profileUsecase.getBestClient(startDate, endDate, limit)

        if(!client){
            return res.status(400).json({
            status: 'Bad Request',
            message: 'No Data Available',
            statusCode: 400
        }).end()
        }
        else{
            return res.status(200).json({client})
        }
    }

    return{
        depositForClient: depositForClient,
        getBestProfession: getBestProfession,
        getBestClient: getBestClient
    }
}