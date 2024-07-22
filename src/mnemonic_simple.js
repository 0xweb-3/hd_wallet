import { generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

// 生成助记词短语
function generateMnemonicPhrase(bits = 256) {
    if (![128, 160, 192, 224, 256].includes(bits)) {
        throw new Error('Entropy must be 128, 160, 192, 224, or 256 bits.');
    }
    return generateMnemonic(bits);
}

console.log(generateMnemonicPhrase(128));
