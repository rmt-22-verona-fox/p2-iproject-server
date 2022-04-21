const {Movie} = require('../models');

const patch_authorization = async (req, res, next) => {
    try{
        const {id} = req.params
        const targetMovie = await Movie.findOne({
            where:{
                id:id
            }
        }) 
        
        if(!targetMovie){
            throw {name: 'Not Found', status:404}
        } else if (req.user.role == "admin"){
            next()
        } else {
            throw {name: 'Forbidden', status: 403}
        }
    } catch(err){
        next(err)
        // const status = err.status || 500
        // const msg = err.name || 'Internal Server Error'
        // res.status(status).json({statusCode: status, error: msg})
    }
}

module.exports = patch_authorization