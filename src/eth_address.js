// 引入所需的库
const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const { bufferToHex, toChecksumAddress } = require('ethereumjs-util');
const generateMnemonic = require("./mnemonic");

async function makeMnemonic() {
    try {
        const mnemonic = await generateMnemonic.generateMnemonic(256);
        return mnemonic;
    } catch (error) {
        console.error('错误:', error);
        throw error; // 抛出错误，以便可以在调用 `makeMnemonic` 时进行处理
    }
}

// 生成 HD ETH 钱包
async function generateHDWalletFromMnemonic(mnemonic) {
    try {
        // 1. 从助记词生成种子
        const seed = await bip39.mnemonicToSeed(mnemonic);

        // 2. 从种子生成根密钥
        const root = hdkey.fromMasterSeed(seed);

        // 3. 从根密钥生成以太坊密钥对
        // 生成第一个钱包地址
        const path = "m/44'/60'/0'/0/0"; // BIP44路径
        const child = root.derivePath(path);
        const wallet = child.getWallet();
        const privateKey = wallet.getPrivateKey();
        const publicKey = wallet.getPublicKey();
        const address = wallet.getAddress();
        const addressHex = bufferToHex(address);

        // 4. 打印生成的密钥对和地址
        console.log("助记词为：", mnemonic);
        console.log('私钥:', bufferToHex(privateKey)); // 打印私钥
        console.log('公钥:', bufferToHex(publicKey)); // 打印公钥
        console.log('以太坊地址:', toChecksumAddress(addressHex)); // 打印以太坊地址
    } catch (error) {
        console.error('生成钱包时出错:', error);
    }
}


async function generateETHWallet(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const path = "m/44'/60'/0'/0/0";
    const child = root.derivePath(path);
    const wallet = child.getWallet();
    const privateKey = wallet.getPrivateKey();
    const publicKey = wallet.getPublicKey();
    const address = wallet.getAddress();
    const addressHex = bufferToHex(address);

    console.log('ETH 私钥:', bufferToHex(privateKey));
    console.log('ETH 地址:', toChecksumAddress(addressHex));
}


// makeMnemonic().then((res)=>{
//     console.log("获得的", res)
// })


 mnemonic = "relax album real truck weekend client laptop region post idle float expire oil actual basic give cactus ridge fee glove shoulder duty join banana"
generateHDWalletFromMnemonic(mnemonic).then(() => {});
console.log("-=======")
generateETHWallet(mnemonic).then(()=>{})

// ETH 私钥: 0x70bd99ab45b666b1280c003a8852f66d4350219869e97f2fb0306c0e2bdfd057
// ETH 地址: 0x061ae63923C2553D693BBEFb2084C1995d3B04B3
