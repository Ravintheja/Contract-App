'use strict'
const { Op } = require('sequelize');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../model');

module.exports = (app) => {
    const {Profile, Contract, Job} = app.get('models')

    async function getProfileDetails(profileId){
        //Get job details by Id
        const profile = await Profile.findOne({
            where: {
                id: profileId
            }
        })
        return profile
    }

    async function updateProfileBalance(profileId, profileBalance){
        //Update Profile Balance by Id
        await Profile.update(
            { 
                balance: profileBalance
            },
            {
                where: {
                    id: profileId
                }
            },
        )
    }

    async function getBestProfession(startDate, endDate){
        //Get job details by Id
        const profession = await Profile.findAll({
            attributes: [
                'profession',
                [Sequelize.fn('SUM', Sequelize.col('price')), 'amount']
            ],
            include: [
                {
                    model: Contract,
                    as: 'Contractor',
                    include: [
                        {
                            model: Job,
                            as: 'ContJob',
                            attributes: [], 
                            where: {
                                paid: '1',
                                paymentDate: {
                                    [Op.between]: [startDate, endDate]
                                }
                            },
                        }
                    ]
                }
            ],
            where: {
                type: 'contractor'
            },
            group: ['profession'],
            order: [[Sequelize.literal('Amount'), 'DESC']]
        });
        
        return profession
    }

    async function getBestClient(startDate, endDate, limit){
        
        const Client = await sequelize.query(
            `SELECT Profile.id, concat(Profile.firstName, ' ', Profile.lastName) AS fullName,
            SUM(Contjob.price) AS Amount
            FROM Profiles AS Profile 
            INNER JOIN Contracts AS Contractor ON Profile.id = Contractor.ClientId
            INNER JOIN Jobs AS Contjob ON Contractor.id = Contjob.ContractId
            WHERE Profile.type = 'client' AND Contjob.paid = 1
            AND Contjob.paymentDate BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY Profile.id
            ORDER BY Amount DESC
            LIMIT ${limit};`, 
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
        // const Client = await Profile.findAll({
        //     attributes: [
        //       'id',
        //       [Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')), 'fullName'],
        //       [Sequelize.fn('SUM', Sequelize.col('price')), 'amount']
        //     ],
        //     include: [
        //       {
        //         model: Contract,
        //         as: 'Contractor',
        //         attributes: [],
        //         include: [
        //           {
        //             model: Job,
        //             as: 'ContJob',
        //             attributes: [],
        //             where: {
        //               paid: 1,
        //               paymentDate: {
        //                 [Op.between]: [startDate, endDate]
        //               }
        //             }
        //           }
        //         ]
        //       }
        //     ],
        //     where: {
        //       type: 'client'
        //     },
        //     group: ['Profile.id'],
        //     order: [[Sequelize.literal('Amount'), 'DESC']],
        //     limit: limit,
        //   });
          console.log(Client)
        return Client
    }

    return{
        getProfileDetails: getProfileDetails,
        updateProfileBalance: updateProfileBalance,
        getBestProfession: getBestProfession,
        getBestClient: getBestClient
    }
}