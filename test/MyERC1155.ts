import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber, Contract, ContractReceipt } from "ethers";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MyERC1155", () => {
  let myERC1155 : Contract;
  let owner : SignerWithAddress, user1: SignerWithAddress;

  const AMOUNT_TO_MINT = ethers.utils.parseEther('1');
  const TOKEN_URI = "https://viktor.tolstov.com/nft/1";

  beforeEach(async () => {
    const MyERC1155 = await ethers.getContractFactory("MyERC1155");

    myERC1155 = await MyERC1155.deploy(TOKEN_URI);

    [owner, user1] = await ethers.getSigners();
  });

  it("should mint new ERC1155 tokens with correct uri address", async () => {
    const account = user1.address;

    const transaction = await myERC1155.connect(user1).mint(AMOUNT_TO_MINT);
    
    const contractReceipt: ContractReceipt = await transaction.wait();
    const event = contractReceipt.events?.find(event => event.event === 'Minted');

    const tokenId = event?.args?.tokenId
    expect(event?.args?.addr).to.equal(account);
    expect(await myERC1155.balanceOf(account, tokenId)).to.equal(AMOUNT_TO_MINT);
    expect(await myERC1155.uri(tokenId)).to.equal(TOKEN_URI);
  });
});
