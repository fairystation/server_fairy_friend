import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
//import * as abi from "./contracts/apps.json";
var WebSocket2 = require('ws'),
	SocksProxyAgent = require('socks-proxy-agent').SocksProxyAgent;
function CreateTorWebSocket(aOnionHostname, aOnionPort, aScheme, aTorSocksPort) {
	// Or use 9150:
	aTorSocksPort = aTorSocksPort||9050;
	aScheme = aScheme||"ws";
	// WebSocket endpoint for the proxy to connect to
	var vEndPoint = aScheme + '://' + aOnionHostname + ':' + aOnionPort;
	// TOR Socks5 URI:
	var vSocks5Agent = new SocksProxyAgent({hostname:process.env.TOR_HOST, port:aTorSocksPort});
	// Return WebSocket handle
	return new WebSocket2(vEndPoint, { agent: vSocks5Agent });
}

@Injectable()
export class AppService {
  async connect(): Promise<string> {
    const web3 = new Web3(process.env.ETH_NETWORK);
  const { abi } = require('./contracts/apps.json');
  var fairyContract = new web3.eth.Contract(abi, process.env.CONTRACT_ID);
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
  let result = await fairyContract.methods.getAppList().call({from: accountAddress});

  var host = "ic73z43upaeywv6i4uno5c5ndtzhtbxyocmqnjwxpn622n7osqgr6nqd.onion";
  var port = 5566;
  // use require("./index.js") or whatever to import CreateTorWebSocket
  var socket = CreateTorWebSocket(host, port, "ws", 9050);
  
  socket.on('open', function () {
    console.log('"open" event!');
    socket.send('ping');
  });
  
  socket.on('message', function (data, flags) {
    console.log('received %j %j', data, flags);
    //socket.close();
  });

  // foreach - connect to socket && remove from list
  //console.log()

  //console.log(await myContract.methods.mint('distant').call({from: '0x1a7d5bF03d2a72494B9487fF0E0B9491c13965B4'}));
  //const asd = await myContract.methods.getAppList().call({from: '0x1a7d5bF03d2a72494B9487fF0E0B9491c13965B4'});
  //console.log(asd);
    return result;
  }
}


