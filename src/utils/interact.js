
import EventHub from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
export const nftContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'

// export const contract = (kit) => {
//   // const kit = await getConnectedKit()
//   return new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
// }
//
//
// export const createNewEvent = async (contract, address, kit, { eventTimestamp, deposit, maxCapacity, CID, ID }) => {
//
//   try {
//     const stableToken = await kit.contracts.getStableToken()
//     const res = await contract.methods.createNewEvent(eventTimestamp, deposit, maxCapacity, CID, ID).send({
//       from: address,
//       feeCurrency: stableToken.address,
//       gasLimit: '910000',
//
//     })
//     console.log('res ', res)
//     return {
//       status: (
//         <span>
//           ✅{" "}
//           <a target="_blank" href={`https://explorer.celo.org/alfajores/tx/${res.transactionHash}/token-transfers/`} rel="noreferrer">
//             View the status of your transaction on Celo Explorer!
//           </a>
//           <br />
//           ℹ️ Once the transaction is verified by the network, the message will
//           be updated automatically.
//         </span>
//       ),
//     };
//   } catch (error) {
//     return {
//       status: "😥 " + error.message,
//     };
//   }
// };
