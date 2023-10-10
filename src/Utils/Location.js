async function Location(lat,lan){
    var data=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lan}`)
    //setcurontLocation(await data.json())
    data=await data.json();
     return await data;
    }
export default Location;