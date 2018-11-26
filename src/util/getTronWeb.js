

const TronWeb = require('tronweb');

let getTronWeb = new Promise(function(resolve, reject) {
    
    const HttpProvider = TronWeb.providers.HttpProvider;

    const fullNode = new HttpProvider('https://api.trongrid.io');
    const solidityNode = new HttpProvider('https://api.trongrid.io');
    const eventServer = 'https://api.trongrid.io/';
    const privateKey = '';

    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );
    resolve(tronWeb)
})

export default getTronWeb