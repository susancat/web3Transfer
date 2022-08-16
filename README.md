## Description
A token transfer tool based on:
- frontend: next.js/react-boostrap
- backend: pages/api @Next.js
- web3: web3.js/web3Modal(for multiple wallet connection)
- web3 network: Rinkeby testnet 
- database: mongoDB
- deployment:Vercel

## features
- show basic info from wallet account: balance, account
- transfer rinkeby faucet tokens to another address
- popups help to display submitted, confirmed and failed transactions
- balance history saved to mongoDB when connect wallet
- balance history fetched from mongoDB and displayed when click account address button at Nav
- switch network (if login with chain other than Rinkeby, will inject a switch network request automatically)

## bugs report
- after connect the wallet, the balance history would be uploaded to mongoDB automatically, but connecting the DB and uploading takes time so sometimes when click the wallet address button at Nav bar, the history doesn't show;
- sometimes the history records are less than 11 pieces