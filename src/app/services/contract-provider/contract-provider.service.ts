import {Injectable} from '@angular/core';

@Injectable()
export class ContractProviderService {


  private static _REGISTRY_CONTRACT_ADDRESS = "0x0c8ba29d5152dc5f6cee557dcf3312db11c76b45";
  private static _REGISTRY_CONTRACT_ABI = [{
    "constant": true,
    "inputs": [],
    "name": "servicesCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "add", "type": "address"}, {"name": "serviceHash", "type": "bytes32"}],
    "name": "changeOwnership",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "services",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "serviceHash", "type": "bytes32"}],
    "name": "register",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "owners",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "type": "constructor", "payable": true}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_services", "type": "bytes32"}],
    "name": "NewService",
    "type": "event"
  }];

  private static _USER_CONTRACT_BINARY = "0x60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b61070c806100906000396000f3606060405236156100c1576000357c0100000000000000000000000000000000000000000000000000000000900480631371cd1d146100c65780632cb50acf146100e35780633ccfd60b1461010457806341c0e1b51461011857806363ffab311461012c5780636ba13a8214610158578063717d5527146101805780638da5cb5b1461019857806391b7f5ed146101d6578063972c0b51146101f35780639d23b4f91461021b578063cbedbf5a14610259578063ec67d2d31461026d576100c1565b610002565b34610002576100e16004808035906020019091905050610295565b005b6101026004808035906020019091908035906020019091905050610305565b005b34610002576101166004805050610470565b005b346100025761012a60048050506104d5565b005b346100025761013e6004805050610574565b604051808260001916815260200191505060405180910390f35b346100025761016a600480505061057d565b6040518082815260200191505060405180910390f35b6101966004808035906020019091905050610586565b005b34610002576101aa60048050506105d1565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101f160048080359060200190919050506105f7565b005b34610002576102056004805050610667565b6040518082815260200191505060405180910390f35b346100025761022d6004805050610670565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761026b6004805050610696565b005b346100025761027f6004805050610703565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f55761000256610301565b806003600050819055505b5b5b50565b600160005054803410151561046a576000600102600460005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050546000191614156103ea576060604051908101604052808481526020014281526020016001815260200150600460005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008201518160000160005055602082015181600101600050556040820151816002016000505590505060016002600082828250540192505081905550610468565b42600460005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055506001600460005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506002016000828282505401925050819055505b5b5b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d057610002566104d2565b5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105355761000256610571565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60036000505481565b60026000505481565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550346006600050819055505b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106575761000256610663565b806001600050819055505b5b5b50565b60066000505481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6006600050549081150290604051809050600060405180830381858888f19350505050151561070057610002565b5b565b6001600050548156";
  private static _USER_CONTRACT_ABI = [{
    "constant": false,
    "inputs": [{"name": "_publicKey", "type": "bytes32"}],
    "name": "setPublicKey",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_publicKey", "type": "bytes32"}, {"name": "userAddress", "type": "address"}],
    "name": "consume",
    "outputs": [],
    "payable": true,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "publicKey",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "usersCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "providerAddress", "type": "address"}],
    "name": "getMoney",
    "outputs": [],
    "payable": true,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_price", "type": "uint256"}],
    "name": "setPrice",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "sendingMoney",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "sendingAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "sendMoney",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "servicePrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "type": "constructor", "payable": true}];

  private static _SERVICE_CONTRACT_BINARY = "0x60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b61070c806100906000396000f3606060405236156100c1576000357c0100000000000000000000000000000000000000000000000000000000900480631371cd1d146100c65780632cb50acf146100e35780633ccfd60b1461010457806341c0e1b51461011857806363ffab311461012c5780636ba13a8214610158578063717d5527146101805780638da5cb5b1461019857806391b7f5ed146101d6578063972c0b51146101f35780639d23b4f91461021b578063cbedbf5a14610259578063ec67d2d31461026d576100c1565b610002565b34610002576100e16004808035906020019091905050610295565b005b6101026004808035906020019091908035906020019091905050610305565b005b34610002576101166004805050610470565b005b346100025761012a60048050506104d5565b005b346100025761013e6004805050610574565b604051808260001916815260200191505060405180910390f35b346100025761016a600480505061057d565b6040518082815260200191505060405180910390f35b6101966004808035906020019091905050610586565b005b34610002576101aa60048050506105d1565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101f160048080359060200190919050506105f7565b005b34610002576102056004805050610667565b6040518082815260200191505060405180910390f35b346100025761022d6004805050610670565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761026b6004805050610696565b005b346100025761027f6004805050610703565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f55761000256610301565b806003600050819055505b5b5b50565b600160005054803410151561046a576000600102600460005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050546000191614156103ea576060604051908101604052808481526020014281526020016001815260200150600460005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008201518160000160005055602082015181600101600050556040820151816002016000505590505060016002600082828250540192505081905550610468565b42600460005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055506001600460005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506002016000828282505401925050819055505b5b5b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d057610002566104d2565b5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105355761000256610571565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60036000505481565b60026000505481565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550346006600050819055505b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106575761000256610663565b806001600050819055505b5b5b50565b60066000505481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6006600050549081150290604051809050600060405180830381858888f19350505050151561070057610002565b5b565b6001600050548156";

  private static _SERVICE_CONTRACT_ABI = [{
    "constant": false,
    "inputs": [{"name": "_publicKey", "type": "bytes32"}],
    "name": "setPublicKey",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_publicKey", "type": "bytes32"}, {"name": "userAddress", "type": "address"}],
    "name": "consume",
    "outputs": [],
    "payable": true,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "publicKey",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "usersCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "providerAddress", "type": "address"}],
    "name": "getMoney",
    "outputs": [],
    "payable": true,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_price", "type": "uint256"}],
    "name": "setPrice",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "sendingMoney",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "sendingAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "sendMoney",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "servicePrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "type": "constructor", "payable": true}];


  static get SERVICE_CONTRACT_BINARY() {
    return this._SERVICE_CONTRACT_BINARY;
  }

  static get SERVICE_CONTRACT_ABI() {
    return this._SERVICE_CONTRACT_ABI;
  }

  static get REGISTRY_CONTRACT_ADDRESS(): string {
    return this._REGISTRY_CONTRACT_ADDRESS;
  }

  static get REGISTRY_CONTRACT_ABI(): any {
    return this._REGISTRY_CONTRACT_ABI;
  }

  static get USER_CONTRACT_BINARY(): string {
    return this._USER_CONTRACT_BINARY;
  }

  static get USER_CONTRACT_ABI() {
    return this._USER_CONTRACT_ABI;
  }
}
