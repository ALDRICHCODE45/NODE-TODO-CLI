const fs = require('fs');
const arrchivo = './db/data.json'

const guardarDB = ( data ) => {
    fs.writeFileSync(arrchivo, JSON.stringify(data));
};

const leerDB = () => {

    if (!fs.existsSync(arrchivo)) {
        return null
    };

    const info = fs.readFileSync(arrchivo, { encoding: 'utf-8' });

    const data = JSON.parse(info);
    return data;
};

module.exports ={
    guardarDB,
    leerDB
};
