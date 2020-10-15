window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/81ad8e62ebbe4002bc9e40fdfbd18b92"));
    }
})


const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

async function getBalance() {
    var address, wei, balance
    address = "0x391504b56c35Ef43E68c3dFdC0bB2C80fAb0Dbc7";
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("output").innerHTML = balance + " ETH";
        document.getElementById("outputusd").innerHTML = balance + " ETH";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
        document.getElementById("outputusd").innerHTML = balance + " ETH";
    }

    
}

async function getCommunityFundBalance() {
    var address, wei, balance
    address = "0xb80a7458eec231a1c11be35711522f72511a6a27"; //comm fund address
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("output3").innerHTML = balance.toFixed(4) + " ETH";
        document.getElementById("outputusd").innerHTML = balance + " ETH";
    } catch (error) {
        document.getElementById("output3").innerHTML = error;
        document.getElementById("outputusd").innerHTML = balance + " ETH";
    }

    
}

window.addEventListener('load', function() {
    getBalance();
    
});




async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    address = web3.eth.accounts[0];
    contractAddress = "0x391504b56c35ef43e68c3dfdc0bb2c80fab0dbc7"
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals);
        console.log(adjustedBalance);
        document.getElementById("output2").innerHTML = adjustedBalance;
        // document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}

window.addEventListener('load', function() {
    getBalance();
    getCommunityFundBalance();
});



