import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class AppService {
  async connect(): Promise<string> {
    const web3 = new Web3('http://localhost:8545');
    const balance = await web3.utils.fromWei(
      await web3.eth.getBalance('0x8da7245ED352ea6A278657Fd47Fe1E31c177c51C'),
      'ether'
   ); 
    return balance;
  }
}


