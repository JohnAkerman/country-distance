export const distanceBetween = (a, b) => {
    var R = 6371; // Radius of the earth in km

    let lat1 = a.lat
    let lng1 = a.lng

    let lat2 = b.lat
    let lng2 = b.lng

    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lng2 - lng1) * Math.PI / 180;

    let d =
       0.5 - Math.cos(dLat)/2 +
       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
       (1 - Math.cos(dLon))/2;

    return Math.floor(R * 2 * Math.asin(Math.sqrt(d)))
}

export const randomBetween = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
}
