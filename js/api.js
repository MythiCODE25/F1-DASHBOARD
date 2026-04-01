
export default async function fetchData(url){
    try{
        let data = await fetch(url);
        let res = await data.json();
        return res;
    }
    catch(err){
        console.log("API Error:", err)
    }
}