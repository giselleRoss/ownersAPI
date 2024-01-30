
const readOwners = async () => {
    try{
        const owners = await fetch("https://ownersapi.onrender.com/owners", {method:"GET"})
        const data = await response.json();
    } catch(err){
        console.log("Error reading owners");
    }
    return{
        data
    }
}
readOwners();