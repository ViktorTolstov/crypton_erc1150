// hardhat.config.ts
import { task } from "hardhat/config";
import { BigNumber, Contract, ContractReceipt } from "ethers";

task("mint", "Mint new ERC1155 tokens")
    .addParam("contract", 'Contract address')
    .addParam("amount", "The amount of tokens to mint")
    .setAction(async ({ contract, amount }, { ethers }) => {
        const myERC1155 = await ethers.getContractAt('MyERC1155', contract);

        const transaction = await myERC1155.mint(amount);
        const contractReceipt: ContractReceipt = await transaction.wait();
        const event = contractReceipt.events?.find(event => event.event === 'Minted');

        const tokenId = event?.args?.tokenId

        console.log(`Minted ERC1155 tokens with ID ${tokenId}`);
});
