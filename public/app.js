let selectedOwnerId = null;

const displayOwners = async () => {
    try {
        const response = await fetch("https://ownersapi.onrender.com/owners");
        const data = await response.json();

        if (data && data.rows && data.rows.length > 0) {
            const ownersList = $("<ul></ul>").addClass("list-group");
            data.rows.forEach((owner) => {
                const ownerItem = $("<li></li>")
                    .addClass("list-group-item")
                    .text(owner.name)
                    .on("click", () => displayCars(owner.id));
                ownersList.append(ownerItem);
            });

            // Display the owners list
            $("#ownersCarsContainer").empty().append(ownersList);
        } else {
            $("#ownersCarsContainer").text("No owners found.");
        }
    } catch (err) {
        console.log("Error fetching owners", err);
        $("#ownersCarsContainer").text("Error fetching owners.");
    }
};

// Function to display cars based on owner ID
const displayCars = async (ownerId) => {
    try {
        const response = await fetch(`https://ownersapi.onrender.com/cars?ownerId=${ownerId}`);
        const data = await response.json();

        if (data && data.rows && data.rows.length > 0) {
            // Display cars in a list
            const carsList = $("<ul></ul>").addClass("list-group");
            data.rows.forEach((car) => {
                const carItem = $("<li></li>")
                    .addClass("list-group-item")
                    .text(car.model);
                carsList.append(carItem);
            });

            // Display the cars list
            $("#ownersCarsContainer").empty().append(carsList);
        } else {
            $("#ownersCarsContainer").text("No cars found for this owner.");
        }
    } catch (err) {
        console.log("Error fetching cars", err);
        $("#ownersCarsContainer").text("Error fetching cars.");
    }
};

$("#searchBtnOwners").on("click", () => {
    selectedOwnerId = null; 
    displayOwners();
});

$("#searchBtnCars").on("click", () => {
    if (selectedOwnerId) {
        displayCars(selectedOwnerId);
    } else {
        $("#ownersCarsContainer").text("Please select an owner first.");
    }
});
