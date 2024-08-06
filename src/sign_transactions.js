// signTransactions.js
import Web3 from 'web3';

async function signTransactions(privateKey, fromAddress, toAddress, rpcURL, ethNum, chainId = 1) {
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

    const nonce = await web3.eth.getTransactionCount(fromAddress);

    // 传统交易
    const txTraditional = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(ethNum, 'ether'),
        gas: 21000,
        gasPrice: web3.utils.toWei('20', 'gwei'),
        nonce: nonce
    };

    // EIP-1559 交易
    const txEIP1559 = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(ethNum, 'ether'),
        gas: 21000,
        maxFeePerGas: web3.utils.toWei('20', 'gwei'),
        maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
        nonce: nonce,
        chainId: chainId // Mainnet
    };

    // 签名传统交易
    const signedTxTraditional = await web3.eth.accounts.signTransaction(txTraditional, privateKey);

    // 签名 EIP-1559 交易
    const signedTxEIP1559 = await web3.eth.accounts.signTransaction(txEIP1559, privateKey);

    return {signedTxTraditional, signedTxEIP1559};
}


export default signTransactions;
