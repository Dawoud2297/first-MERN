const RestaurantsDAO = require('../dao/restaurantsDAO');

module.exports = class RestaurantsCtrl{
    static async apiGetRestaurants(req,res){
    
        try {
            
            const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage,10) :  800 //25359
            const page = req.query.page ? parseInt(req.query.page, 10) : 0
    
            let filters = {}
    
            if(req.query.cuisine){
                filters.cuisine = req.query.cuisine
            }else if(req.query.zipcode){
                filters.zipcode = req.query.zipcode
            }else if(req.query.name){
                filters.name = req.query.name
            }
    
            const {restaurantsList, totalNumRstaurants} = await RestaurantsDAO.getRestaurants({
                filters,
                page,
                restaurantsPerPage,
            })
    
            const response = {
                restaurants : restaurantsList,
                page : page,
                filters : filters,
                enteries_per_page : restaurantsPerPage,
                total_resaults : totalNumRstaurants
            }
            res.json(response)
        } catch (error) {
            console.log(error)       
        }
    }

    static async apiGetRestaurantById(req,res){
        try{
            const id = req.params.id || {}
            const restaurant = await RestaurantsDAO.getRestaurantById(id)
            res.json(restaurant)
        }catch(e){
            console.log(`api restaurant, ${e}`)
        }
    }
    static async apiGetCuisines(req,res){
        try {
            const cuisines = await RestaurantsDAO.getCuisine()
            res.json(cuisines)
        } catch (error) {
            console.error(`api Cusines,${error}`)
        }
    }
}

