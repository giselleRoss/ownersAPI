
const readOwners = async () => {
    try{
        const owners = await fetch("https://ownersapi.onrender.com/owners")
        const data = await response.json();
        console.log(data)
    } catch(err){
        console.log("Error reading owners");
    }
}
readOwners();
