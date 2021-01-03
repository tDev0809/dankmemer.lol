export default (obj) => {
    let flattened =  Object.keys(obj).reduce(function (r, k) {
        return r.concat(k, obj[k]);
    }, []);
    return flattened.filter(el => typeof(el) === 'object');
}