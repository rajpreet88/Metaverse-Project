// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

//openzepplin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

contract Metaverse is ERC721,Ownable{
    constructor() ERC721("META","MTA"){}

    using Counters for Counters.Counter;

    Counters.Counter private supply;

    uint public maxSupplyofNFT = 100;

    uint public baseNFTPrice = 1 ether;

    struct Object{
        string name; //name of NFT
        int8 width; //width of NFT
        int8 height; //height of NFT
        int8 depth; //depth of NFT
        int8 x; //x position of NFT
        int8 y; //y position of NFT
        int8 z; //z position of NFT
    }
    
    //Object array
    Object[] public objects;

    //mapping address to NFT
    mapping(address=>Object[]) NFTowners;

    //reuturning the objects on the array
    function getObjects() public view returns(Object[] memory){
        return objects;

    }

    //getting the total supply of NFTs
    function totalSupply() public view returns(uint){
        return supply.current();
    }


    //Minting NFTs
    function mintNFT(string memory _objects_name, int8 _objects_width, int8 _objects_height, int8 _objects_depth, 
    int8 _objects_x, int8 _objects_y, int8 _objects_z) public payable{

        //before minting we need to check the current supply <= maxsupply
        require(supply.current() <= maxSupplyofNFT, "Supply exceeds maximum");
        require(msg.value >= baseNFTPrice, "Not Enough Ethers");
        supply.increment();

        //minting
        _safeMint(msg.sender, supply.current());

        //new variable of object type to storage the NFT attributes
        Object memory _newObject = Object(_objects_name, _objects_width, _objects_height, _objects_depth, 
        _objects_x, _objects_y, _objects_z);

        //pushing the attributes to new objects array of Object type
        objects.push(_newObject);

        //keeping the NFTs details in an array from the addrress
        NFTowners[msg.sender].push(_newObject);
    }


    //only the owner of the smart contract can withdraw
    function withdraw() external payable onlyOwner{
        address payable _owner = payable(owner());

        //tranfering the balance of the contract(this) to the owner adrress
        _owner.transfer(address(this).balance);

    }

    //returning all the available NFTs(with its attributes) associated with the current sender(address) by passing it address
    function getNFTDetails() public view returns(Object[] memory){
        return NFTowners[msg.sender];
    }



}
