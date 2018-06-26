export const getCoordinates = (payload) => {
    const coordinates = [];
    payload.forEach(elem => {
        coordinates.push(...elem.coord);
    });
    return coordinates
};

export const getCoordinatesSank = (payload) => {
    const coordinates = [];
    payload.forEach(elem => {
        if (elem.isSank) {
            coordinates.push(...elem.coord);
        }
    });
    return coordinates
};