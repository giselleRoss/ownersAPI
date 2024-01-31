let selectedOwnerId = null;
let allCars = null;

const displayOwners = async () => {
  try {
    const response = await fetch("https://ownersapi.onrender.com/owners");
    const data = await response.json();
    console.log(data);

    if (data && data.length > 0) {
      const ownersList = $("<ul></ul>").addClass("list-group");
      data.forEach((owner) => {
        console.log(owner)
        const ownerItem = $("<li></li>")
          .addClass("list-group-item")
          .text(owner.name)
          .on("click", async () => {
            try {
              const carsResponse = await fetch(
                `https://ownersapi.onrender.com/owners/${owner.id}/cars`
              );
              const carsData = await carsResponse.json();
              console.log(carsData);

              if (carsData && carsData.rows && carsData.rows.length > 0) {
                const carsList = $("<ul></ul>").addClass("list-group");
                carsData.rows.forEach((car) => {
                  const carItem = $("<li></li>")
                    .addClass("list-group-item")
                    .text(car.model);
                  carsList.append(carItem);
                });
                $("#ownersCarsContainer").empty().append(carsList);
              } else {
                $("#ownersCarsContainer").text("No cars found for this owner.");
              }
            } catch (error) {
              console.log("Error fetching cars for owner", error);
              $("#ownersCarsContainer").text("Error fetching cars for owner.");
            }
          });
        ownersList.append(ownerItem);
      });

      $("#ownersCarsContainer").empty().append(ownersList);
    } else {
      $("#ownersCarsContainer").text("No owners found.");
    }
  } catch (err) {
    console.log("Error fetching owners", err);
    $("#ownersCarsContainer").text("Error fetching owners.");
  }
};

const displayAllCars = async () => {
  try {
    const response = await fetch("https://ownersapi.onrender.com/cars");
    const data = await response.json();

    if (data && data.rows && data.rows.length > 0) {
      const allCarsList = $("<ul></ul>").addClass("list-group");
      data.rows.forEach((car) => {
        const carItem = $("<li></li>")
          .addClass("list-group-item")
          .text(car.model);
        allCarsList.append(carItem);
      });
      $("#ownersCarsContainer").empty().append(allCarsList);
    } else {
      $("#ownersCarsContainer").text("No cars found in the system.");
    }
  } catch (err) {
    console.log("Error fetching all cars", err);
    $("#ownersCarsContainer").text("Error fetching all cars.");
  }
};

$("#ownersBtn").on("click", () => {
  selectedOwnerId = null;
  displayOwners();
});

$("#carsBtn").on("click", () => {
  selectedOwnerId = null;
  displayAllCars();
});
