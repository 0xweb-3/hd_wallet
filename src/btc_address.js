const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const { bufferToHex } = require('ethereumjs-util'); // 用于 buffer 转 hex
const { toChecksumAddress } = require('ethereumjs-util'); // 用于地址 checksum

async function generateBTCWallet(mnemonic, addressType = 'P2PKH') {
    // 生成种子
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const path = "m/44'/0'/0'/0/0";
    const child = root.derivePath(path);

    // 确保 child.privateKey 已定义
    if (!child.privateKey) {
        throw new Error('Failed to derive private key');
    }

    // 从子密钥生成比特币密钥对
    const keyPair = bitcoin.ECPair.fromPrivateKey(child.privateKey);

    // 生成地址
    let address;
    switch (addressType.toLowerCase()) {
        case 'p2pkh':
            address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
            break;
        case 'p2sh':
            address = bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })
            }).address;
            break;
        case 'bech32':
            address = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }).address;
            break;
        default:
            throw new Error('Unsupported address type');
    }

    console.log('BTC 私钥:', bufferToHex(keyPair.privateKey));
    console.log('BTC 地址:', address);
}

// 示例用法
// makeMnemonic().then((res)=>{
//     console.log(res)
// })
mnemonic = "fabric wagon soup reject then metal unaware forward frog elevator extra floor chase soap drip actress bike verify project physical invest capable goat bachelor"

generateBTCWallet(mnemonic, 'p2pkh'); // 生成 P2PKH 地址
generateBTCWallet(mnemonic, 'p2sh'); // 生成 P2SH 地址
generateBTCWallet(mnemonic, 'bech32'); // 生成 Bech32 地址
