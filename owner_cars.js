export const ownersAndCars = (Pool) => {
    const singleOwnerCars = async(req, res, next) => {
        const ownerId = Number.parseInt(req.params.ownerId);
        const getOwnerCars = 'SELECT owners.name, owners.job, owners.age, cars.make, cars.model, cars.year FROM owners INNER JOIN cars ON owners.id = cars.owners_id WHERE owners_id = $1'
        try{
            const data = await Pool.query(getOwnerCars, [ownerId]);
            console.log(data);
            res.json(data.rows);
        }catch(err) {
            next(err);
        }
    }
    const getCarWithOwner = async(req, res, next) => {
        const carId = Number.parseInt(req.params.ownerId);
        const getOwnerCars = 'SELECT cars.make, cars.model, cars.year, owners.name FROM owners INNER JOIN cars ON cars.id = owners.owners_id WHERE cars_id = $1'
        try{
            const data = await Pool.query(getOwnerCars, [carId]);
            console.log(data);
            res.json(data.rows);
        }catch(err) {
            next(err);
        }
    }
    return {
        singleOwnerCars,
        getCarWithOwner
    }
}