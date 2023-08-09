// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyERC1155 is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Minted(address addr, uint256 tokenId);

    constructor(string memory uri) ERC1155(uri) {}

    function mint(uint256 amount) external {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId, amount, "");
        emit Minted(msg.sender, tokenId);
    }

    function _setTokenURI(string memory tokenUri) internal {
        bytes memory metadata = bytes(tokenUri);
        require(metadata.length > 0, "URI must be non-empty");
        _setURI(tokenUri);
    }
}
