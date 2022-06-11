import abi from "./ABI/abi.json" assert {type:"json"};
//import Metaverse from "./metaverse.sol";

const polygon = new Promise((resolve,reject)=>{
    
    //make it look easier and code readability 
    async function meta(){

        //check if metamask is installed or not
        if(typeof window.ethereum=='undefined')
        {
            reject("Metamask not installed. Please install Metamask to proceed further")
        }

        //need web3 library to be able to connect to metmask test network
        let web3 = new Web3(window.ethereum);

        //will need instance of the contract to acces the smart contract functionality for which we will be the ABI of the smart contract and the contract address
        let contract = new web3.eth.Contract(abi, "0x32640941cda36f12F3795D080fF509777113Cd8f");


        //lets check to which account we are connected to in the metmask
        let accounts = await web3.eth.requestAccounts(); // its an array which fetches the list of accounts in metamask
        console.log("Account currently connected: ", accounts[0]) //displying the active and first account from metamask


        //now lets check the total supply of NFTs in the market using the contract instance to access the sol functions
        let totalSupply = await contract.methods.totalSupply().call({ from: accounts[0] });
        console.log("Total Supply of NFTs now: ",totalSupply);
        // let totalSupply = await contract.methods.totalSupply().call({ from: accounts[0] });
        // console.log("Total Supply", totalSupply);


        //get the max supply of NFT
        let maxSupply = await contract.methods.maxSupplyofNFT().call({from:accounts[0]});
        console.log("Max Supply of NFTs: ", maxSupply);

        //get the NFTs details or objects
        let objects = await contract.methods.getNFTDetails().call({from:accounts[0]});
        console.log("NFT details are: ", objects);
    

    //now we will resolve the promises by creating tasks after one promised is resolved to move to next and so on
        web3.eth.requestAccounts()
        .then((accounts)=>{ contract.methods.totalSupply().call({from: accounts[0]})
                .then((supply)=>{ contract.methods.getObjects().call({from:accounts[0]})
                    .then((objectData)=>{ 
                        resolve({'Supply':supply, 'NFT':objectData});

                    });
            
            
            });
        });
    }
    meta();
});

export default polygon;