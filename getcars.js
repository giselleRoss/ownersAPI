export const carsInfo = (Pool) => {
  //get all cars
  const getAllCars = async (req, res, next) => {
    console.log("Getting all cars");
    const allCars = "SELECT * FROM cars";
    try {
      const data = await Pool.query(allCars);
      console.log(data.rows);
      res.json(data.rows);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  //get cars by id
  const carsById = async (req, res) => {
    const carId = req.params.carId;
    console.log("Getting car id:", carId);
    const selectCar = "SELECT * FROM cars WHERE id = $1";
    try {
      const data = await Pool.query(selectCar, [carId]);
      console.log(data.rows);
      if (data.rows.length == 0) {
        res.sendStatus(404);
        return;
      }
      res.json(data.rows);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // add new car to DB
  const createCar = async (req, res, next) => {
    const year = Number.parseInt(req.body.year);
    const { make, model } = req.body;
    console.log(`Make: ${make}, Model: ${model}, Year: ${year}`);
    if (!make || !model || !Number.isNaN(year)) {
      res.sendStatus(400);
      return;
    }
    console.log(
      `Creating car with: Make: ${make} Model: ${model} Year: ${year}`
    );
    const newCar = `INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *`;
    try {
      const data = await Pool.query(newCar, [make, model, year]);
      console.log("New car added: \n", newCar);
      const car = data.rows[0];
      res.json(car);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // //update cars
  const updateCar = async (req, res, next) => {
    const id = Number.parseInt(req.params.carId);
    console.log("Using car ID:", id);
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year !== undefined ? Number(req.body.year) : null;
    console.log(`Make:${make} Model:${model} Year:${year}`);
    if (Number.isNaN(id) || Number.isNaN(year)) {
      res.sendStatus(400);
      return;
    }
    console.log("Changing car with id:", id);
    const carUpdate = `UPDATE cars SET make = COALESCE($1, make), model = COALESCE($2, model), year = COALESCE($3, year) WHERE id = $4 RETURNING *`;
    try {
      const data = pool.query(carUpdate, [make, model, year, id]);
      if (data.rows.length == 0) {
        res.sendStatus(400);
        return;
      }
      console.log("Car updated: \n", data.rows[0]);
      res.json(data.rows[0]);
    } catch (err) {
      next(err);
    }
  };
  //delete car
  const deleteCar = async (req, res, next) => {
    const id = Number.parseInt(req.params.carId);
    console.log("Using car ID:", id);
    const carRemoved = `DELETE FROM cars WHERE id = $1 RETURNING*`;
    try {
      const data = await pool.query(carRemoved, [id]);
      if (data.rows.length === 0) {
        console.log("No cars found with that ID");
        res.sendStatus(404);
        return;
      }
      console.log("Deleted: ", data.rows[0]);
      res.send(data.rows[0]);
    } catch (err) {
      next(err);
    }
  };
  return{
    getAllCars,
    carsById,
    createCar,
    updateCar,
    deleteCar
  }
};
