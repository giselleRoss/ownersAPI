
const readOwners = async () => {
    try{
        const owners = await fetch("https://practice-rendering.onrender.com/owners", {method:"GET"})
    } catch(err){
        console.log("Error reading owners");
    }
    
}
readOwners();