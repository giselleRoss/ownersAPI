
export const ownerInfo = (Pool) => {
    //get all owners
    const allOwners = async (req, res, next) => {
        const getAllOwners = 'SELECT * FROM owners';
    try {
        const data = await Pool.query(getAllOwners);
        res.json(JSON.stringify(data.rows));
    } catch (err) {
        next(err);
    }
    }

//get owners by id
const singleOwner = async(req, res, next) => {
    const ownerId = Number.parseInt(req.params.ownerId);
    const getSingleOwner = 'SELECT * FROM owners WHERE id = $1';
    try{
        const data = await Pool.query(getSingleOwner, ownerId);
        res.json(data.rows);
    }catch(err) {
        next(err);
    }
}

// add new owner to DB
const createOwner = async (req, res, next) => {
    const age = Number.parseInt(req.body.age);
    const { name, job } = req.body;
    console.log(`name: ${name}, job: ${job}, age: ${age}`);
    if (!name || !job || !Number.isNaN(age)) {
      res.sendStatus(400);
      return;
    }
    console.log(
      `Creating owner with: name: ${name} job: ${job} age: ${age}`
    );
    const newOwner = `INSERT INTO owners (name, job, age) VALUES ($1, $2, $3) RETURNING *`;
    try {
      const data = await Pool.query(newOwner, [name, job, age]);
      console.log("New owner added: \n", newOwner);
      const owner = data.rows[0];
      res.json(owner);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // //update owner
  const updateowner = async (req, res, next) => {
    const id = Number.parseInt(req.params.ownerId);
    console.log("Using owner ID:", id);
    const name = req.body.name;
    const job = req.body.job;
    const age = req.body.age !== undefined ? Number(req.body.age) : null;
    console.log(`name:${name} job:${job} age:${age}`);
    if (Number.isNaN(id) || Number.isNaN(age)) {
      res.sendStatus(400);
      return;
    }
    console.log("Changing owner with id:", id);
    const ownerUpdate = `UPDATE owners SET name = COALESCE($1, name), job = COALESCE($2, job), age = COALESCE($3, age) WHERE id = $4 RETURNING *`;
    try {
      const data = pool.query(ownerUpdate, [name, job, age, id]);
      if (data.rows.length == 0) {
        res.sendStatus(400);
        return;
      }
      console.log("Owner updated: \n", data.rows[0]);
      res.json(data.rows[0]);
    } catch (err) {
      next(err);
    }
  };
  //delete owner
  const deleteOwner = async (req, res, next) => {
    const id = Number.parseInt(req.params.ownerId);
    console.log("Using owner ID:", id);
    const ownerRemoved = `DELETE FROM owners WHERE id = $1 RETURNING*`;
    try {
      const data = await pool.query(ownerRemoved, [id]);
      if (data.rows.length === 0) {
        console.log("No owners found with that ID");
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
    allOwners,
    singleOwner,
    createOwner,
    updateowner,
    deleteOwner
  }
}
