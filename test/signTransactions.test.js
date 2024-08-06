const privateKey = '0x70bd99ab45b666b1280c003a8852f66d4350219869e97f2fb0306c0e2bdfd057';
const fromAddress = '0x061ae63923C2553D693BBEFb2084C1995d3B04B3';
const toAddress = '0x8ff44C9b5Eab5E5CE8d1d642184b70e9b9587F74';
const ethNum = "0.01"
const rpcURL = "https://sepolia.infura.io/v3/dcb9662b00fe4879861f8d3d1ae563a9"
const chainId = 11155111


// test/signTransactions.test.js
import { expect } from 'chai';
import Web3 from 'web3';
import signTransactions from '../src/sign_transactions.js';

describe('signTransactions', function () {
    this.timeout(10000); // 增加超时时间，以便处理网络请求

    // const privateKey = 'YOUR_PRIVATE_KEY';
    // const fromAddress = 'YOUR_ADDRESS';
    // const toAddress = 'RECEIVER_ADDRESS';
    // const rpcURL = 'http://localhost:8545'; // 或者其他你使用的本地区块链节点

    it('should sign a traditional transaction', async function () {
        const { signedTxTraditional } = await signTransactions(privateKey, fromAddress, toAddress, rpcURL, ethNum, chainId);
        console.log("传统交易签名", signedTxTraditional)

        // expect(signedTxTraditional).to.have.property('messageHash');
        // expect(signedTxTraditional).to.have.property('v');
        // expect(signedTxTraditional).to.have.property('r');
        // expect(signedTxTraditional).to.have.property('s');
        // expect(signedTxTraditional).to.have.property('rawTransaction');
    });

    it('should sign an EIP-1559 transaction', async function () {
        const { signedTxEIP1559 } = await signTransactions(privateKey, fromAddress, toAddress, rpcURL, ethNum, chainId);

        console.log("EIP-1559 交易签名",signedTxEIP1559)

        // expect(signedTxEIP1559).to.have.property('messageHash');
        // expect(signedTxEIP1559).to.have.property('v');
        // expect(signedTxEIP1559).to.have.property('r');
        // expect(signedTxEIP1559).to.have.property('s');
        // expect(signedTxEIP1559).to.have.property('rawTransaction');
    });
});
