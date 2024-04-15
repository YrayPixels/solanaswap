import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Context />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// new TokenListProvider().resolve().then((tokens) => {
//     const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
//     if (tokenList.length > token_list.length) {
//         setToken_list(tokenList);
//     }
//     localStorage.setItem('tokenList', JSON.stringify(tokenList));
//     // console.log(tokenList);
// });
// console.log(token_list);


// async function getTokenAccounts(wallet, solanaConnection) {
//   const filters = [
//     {
//       dataSize: 165,    //size of account (bytes)
//     },
//     {
//       memcmp: {
//         offset: 32,     //location of our query in the account (bytes)
//         bytes: wallet,  //our search criteria, a base58 encoded string
//       },
//     }];
//   const accounts = await solanaConnection.getParsedProgramAccounts(
//     TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
//     { filters }
//   );
//   console.log(accounts)
//   // console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
//   // accounts.forEach((account, i) => {
//   //     //Parse the account data
//   //     const parsedAccountInfo = account.account.data;
//   //     const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"];
//   //     const tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
//   //     //Log results
//   //     console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
//   //     console.log(`--Token Mint: ${mintAddress}`);
//   //     console.log(`--Token Balance: ${tokenBalance}`);
//   // });
// }
