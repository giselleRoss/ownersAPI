let selectedOwnerId = null;
// let allCars = null;

const displayOwners = async () => {
    try {
      const response = await fetch("https://ownersapi.onrender.com/owners");
      const data = await response.json();
      console.log("Data from API:", data);
  
      if (Array.isArray(data) && data.length > 0) {
        const ownersList = $("<ul></ul>").addClass("list-group");
        const handleOwnerClick = async (ownerId) => {
          try {
            const carsResponse = await fetch(
              `https://ownersapi.onrender.com/owners/${ownerId}/cars`
            );
            const carsData = await carsResponse.json();
            console.log("Cars data from API:", carsData);
  
            if (Array.isArray(carsData) && carsData.length > 0) {
              const carsList = $("<ul></ul>").addClass("list-group");
              carsData.forEach((car) => {
                const carItem = $("<li></li>")
                  .addClass("list-group-item")
                  .text(`Make: ${car.make}, Model: ${car.model}, Year: ${car.year}`);
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
        };
  
        data.forEach((owner) => {
          const ownerItem = $("<li></li>")
            .addClass("list-group-item")
            .text(`Name: ${owner.name}, Job: ${owner.job}, Age: ${owner.age}`)
            .on("click", () => {
              console.log("Owner clicked:", owner.name);
              handleOwnerClick(owner.id);
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

    if (Array.isArray(data) && data.length > 0) {
      const allCarsList = $("<ul></ul>").addClass("list-group");
      data.forEach((car) => {
        const carItem = $("<li></li>")
          .addClass("list-group-item")
          .text(`Make: ${car.make}, Model: ${car.model}, Year: ${car.year}`);
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
  console.log("Owners button clicked");
  displayOwners();
});

$("#carsBtn").on("click", () => {
  selectedOwnerId = null;
  displayAllCars();
});
