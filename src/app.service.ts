import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
//import * as abi from "./contracts/apps.json";
@Injectable()
export class AppService {
  async connect(): Promise<string> {
    console.log(process.env.ETH_NETWORK);
    const web3 = new Web3(process.env.ETH_NETWORK);
    const balance = await web3.utils.fromWei(
      await web3.eth.getBalance('0x8da7245ED352ea6A278657Fd47Fe1E31c177c51C'),
      'ether'
   ); 
   console.log(balance);
  // https://github.com/ethereumjs/ethereumjs-abi
  // https://www.npmjs.com/package/@truffle/hdwallet-provider
  const { abi } = require('./contracts/apps.json');
  var myContract = new web3.eth.Contract(abi, process.env.CONTRACT_ID);
  // PRIVATE_KEY variable defined
  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)
  // define METHOD_NAME, ARG1, ARG2 here
  // const transaction = myContract.methods.mint('distant');
  // // define CONTRACT_ADDRESS
  // const options = {
  //         to: process.env.CONTRACT_ID,
  //         data: transaction.encodeABI(),
  //         gas: await transaction.estimateGas({from: account.address}),
  //         gasPrice: await web3.eth.getGasPrice() // or use some predefined value
  //     };
  // const signed  = await web3.eth.accounts.signTransaction(options, process.env.PRIVATE_KEY);
  // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  // console.log(receipt) // print receipt

  // const transaction = myContract.methods.getAppList();
  // // define CONTRACT_ADDRESS
  // const options = {
  //         to: process.env.CONTRACT_ID,
  //         data: transaction.encodeABI(),
  //         gas: await transaction.estimateGas({from: account.address}),
  //         gasPrice: await web3.eth.getGasPrice() // or use some predefined value
  //     };
  // const signed  = await web3.eth.accounts.signTransaction(options, process.env.PRIVATE_KEY);
  // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  // console.log(receipt) // print receipt

  const accountAddress = account.address
  let result = await myContract.methods.getAppList().call({from: accountAddress});
  console.log(result)

  //console.log(await myContract.methods.mint('distant').call({from: '0x1a7d5bF03d2a72494B9487fF0E0B9491c13965B4'}));
  //const asd = await myContract.methods.getAppList().call({from: '0x1a7d5bF03d2a72494B9487fF0E0B9491c13965B4'});
  //console.log(asd);
    return balance;
  }
}


