export default (query) =>{
    // "?cid=5ff2a3dccc4d1f0ad0288881&type=store"
    if(query){
        const queryString = query.split("?")[1];
        if(queryString.length > 0){
            const params = queryString.split("&");
            const paramsObj = {};
            params.forEach(param =>{
                const keyValue = param.split("=");
                paramsObj[keyValue[0]]= keyValue[1];
            });
            return paramsObj
        }
    }
    return {}
}