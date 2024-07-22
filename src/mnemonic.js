import { wordlists } from 'bip39';

const bip39Words = wordlists.english;

// 生成随机熵
function generateEntropy(bits) {
    const entropyBytes = bits / 8;
    const randomBytes = new Uint8Array(entropyBytes);
    window.crypto.getRandomValues(randomBytes);
    return randomBytes;
}

// 计算校验和
async function calculateChecksum(entropyBytes) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', entropyBytes);
    const hashBytes = new Uint8Array(hashBuffer);
    // 校验和长度应为熵长度的1/32，即 1 字节
    return hashBytes.slice(0, 1); // 修改为返回 1 字节
}

// 组合熵和校验和
function combineEntropyAndChecksum(entropyBytes, checksumBytes) {
    const combined = new Uint8Array(entropyBytes.length + checksumBytes.length);
    combined.set(entropyBytes);
    combined.set(checksumBytes, entropyBytes.length);
    return combined;
}

// 分割为助记词索引
function splitIntoWords(combinedBytes) {
    const bits = Array.from(combinedBytes).map(byte => byte.toString(2).padStart(8, '0')).join('');
    const wordIndices = [];

    // 每 11 位作为一个索引
    for (let i = 0; i < bits.length; i += 11) {
        // 处理不足 11 位的情况
        const segment = bits.substr(i, 11);
        if (segment.length === 11) {
            wordIndices.push(parseInt(segment, 2));
        }
    }

    return wordIndices;
}

// 映射为助记词
function mapToWords(wordIndices) {
    return wordIndices.map(index => bip39Words[index]);
}

// 生成助记词
export async function generateMnemonic(bits) {
    if (![128, 160, 192, 224, 256].includes(bits)) {
        throw new Error('Invalid entropy length. Choose 128, 160, 192, 224, or 256 bits.');
    }

    const entropyBytes = generateEntropy(bits);
    const checksumBytes = await calculateChecksum(entropyBytes);
    const combinedBytes = combineEntropyAndChecksum(entropyBytes, checksumBytes);

    // 调试输出
    // console.log(`Entropy Bytes: ${Array.from(entropyBytes)}`);
    // console.log(`Checksum Bytes: ${Array.from(checksumBytes)}`);
    // console.log(`Combined Bytes: ${Array.from(combinedBytes)}`);

    const wordIndices = splitIntoWords(combinedBytes);

    // 确保生成的助记词数量与预期一致
    // console.log(`Word Indices: ${wordIndices}`);
    const mnemonic = mapToWords(wordIndices).join(' ');
    return mnemonic;
}

generateMnemonic(256).then((mnemonic) => {
    console.log(mnemonic);
});
