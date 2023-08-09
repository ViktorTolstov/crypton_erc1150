import { ethers } from 'hardhat';

const uriMetadata = "https://ipfs.io/ipfs/QmSVJdLR4bEgbqCDFDw63vkwrMFDxcYmXncaMEEX66Kwye";

async function main() {
    const [deployer] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory('MyERC1155');

    const nftToken = await NFT.deploy(uriMetadata);
    await nftToken.deployed();
    console.log(`Nft deployed to: ${nftToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

