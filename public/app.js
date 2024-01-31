const displayOwners = async () => {
    try {
      const response = await fetch("https://ownersapi.onrender.com/owners");
      const data = await response.json();
      console.log(data);
  
      if (Array.isArray(data) && data.length > 0) {
        const ownersList = $("<ul></ul>").addClass("list-group");
        const handleOwnerClick = async (ownerId) => {
          try {
            const carsResponse = await fetch(
              `https://ownersapi.onrender.com/owners/${ownerId}/cars`
            );
            const carsData = await carsResponse.json();
            console.log(carsData);
  
            if (Array.isArray(carsData) && carsData.length > 0) {
              const carsList = $("<ul></ul>").addClass("list-group");
              carsData.forEach((car) => {
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
        };
  
        data.forEach((owner) => {
          const ownerItem = $("<li></li>")
            .addClass("list-group-item")
            .text(owner.name)
            .on("click", () => {
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
  