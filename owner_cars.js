export const ownersAndCars = (Pool) => {
    const singleOwnerCars = async(req, res, next) => {
        const ownerId = Number.parseInt(req.params.ownerId);
        const getOwnerCars = 'SELECT * FROM cars INNER JOIN owners WHERE ownerId = cars.owners_id';
        try{
            const data = await Pool.query(getOwnerCars, ownerId);
            res.json(data.rows);
        }catch(err) {
            next(err);
        }
    }
}