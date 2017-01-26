import {Injectable} from '@angular/core';

@Injectable()
export class ContractProviderService {


  private static _REGISTRY_CONTRACT_ADDRESS = "0x8d9d122f69522a302b9829beba2a78e1eb2fd393";
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

  private static _USER_CONTRACT_BINARY = "0x60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b6108cc806100906000396000f360606040523615610095576000357c0100000000000000000000000000000000000000000000000000000000900480631371cd1d1461009a5780631c45c91a146100b757806341c0e1b5146101175780634ddd108a1461012b57806363ffab31146101535780638da5cb5b1461017f57806393e7d1c3146101bd578063b60d42881461021d578063b76dd1471461022c57610095565b610002565b34610002576100b56004808035906020019091905050610249565b005b34610002576100d260048080359060200190919050506102b9565b604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018460001916815260200183815260200182815260200194505050505060405180910390f35b34610002576101296004805050610315565b005b346100025761013d60048050506103b4565b6040518082815260200191505060405180910390f35b346100025761016560048050506103bd565b604051808260001916815260200191505060405180910390f35b346100025761019160048050506103c6565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101d860048080359060200190919050506103ec565b604051808573ffffffffffffffffffffffffffffffffffffffff1681526020018460001916815260200183815260200182815260200194505050505060405180910390f35b61022a6004805050610448565b005b346100025761024760048080359060200190919050506104bf565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102a957610002566102b5565b806001600050819055505b5b5b50565b60036000506020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054908060020160005054908060030160005054905084565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561037557610002566103b1565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60026000505481565b60016000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60046000506020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054908060020160005054908060030160005054905084565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104a857610002566104bc565b3460026000828282505401925050819055505b5b5b565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561052157610002566108c7565b6000600360005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561065d57608060405190810160405280838152602001600060010281526020014281526020016001815260200150600360005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506020820151816001016000505560408201518160020160005055606082015181600301600050559050506106dc565b42600360005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060020160005081905550600360005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506003016000818150548092919060010191905055505b8190508073ffffffffffffffffffffffffffffffffffffffff16632cb50acf8273ffffffffffffffffffffffffffffffffffffffff1663ec67d2d3600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150600160005054600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051847c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303818588803b156100025761235a5a03f11561000257505050508073ffffffffffffffffffffffffffffffffffffffff166363ffab31600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150600360005060008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055505b5b5b505056";
  private static _USER_CONTRACT_ABI = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor","payable":true}]

private static _SERVICE_CONTRACT_BINARY = "0x606060405234610000575b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6107e58061009f6000396000f300606060405236156100c3576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631371cd1d146100c85780632cb50acf146100e95780633ccfd60b1461012457806341c0e1b51461013357806363f199361461014257806363ffab31146101635780636ba13a821461018e5780638da5cb5b146101b157806391b7f5ed14610200578063a87430ba1461021d578063c623674f1461027a578063cf309012146102a5578063ec67d2d3146102c8575b610000565b34610000576100e76004808035600019169060200190919050506102eb565b005b61012260048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610358565b005b34610000576101316104fd565b005b34610000576101406105da565b005b3461000057610161600480803560001916906020019091905050610675565b005b34610000576101706106e2565b60405180826000191660001916815260200191505060405180910390f35b346100005761019b6106e8565b6040518082815260200191505060405180910390f35b34610000576101be6106ee565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761021b6004808035906020019091905050610714565b005b346100005761024e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061077d565b604051808460001916600019168152602001838152602001828152602001935050505060405180910390f35b34610000576102876107a7565b60405180826000191660001916815260200191505060405180910390f35b34610000576102b26107ad565b6040518082815260200191505060405180910390f35b34610000576102d56107b3565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561034757610000565b80600381600019169055505b5b5b50565b60015480341015156104f2576000600102600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015460001916141561045357606060405190810160405280846000191681526020014281526020016001815250600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190600019169055602082015181600101556040820151816002015590505060016002600082825401925050819055506104ec565b42600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055505b5b6104f7565b610000565b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f1935050505015156105d557610000565b5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561063657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106d157610000565b80600481600019169055505b5b5b50565b60035481565b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561077057610000565b806001819055505b5b5b50565b60066020528060005260406000206000915090508060000154908060010154908060020154905083565b60045481565b60055481565b600154815600a165627a7a7230582069bb7244656ecb61ab05d1b6ae69494145059c40c50e47b534cdda45087f50ae0029";
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
    "constant": false,
    "inputs": [{"name": "_ipfsHash", "type": "bytes32"}],
    "name": "setIpfsHash",
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
    "inputs": [{"name": "", "type": "address"}],
    "name": "users",
    "outputs": [{"name": "publicKey", "type": "bytes32"}, {
      "name": "lastUpdate",
      "type": "uint256"
    }, {"name": "countUsage", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "ipfsHash",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "locked",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "servicePrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "payable": false, "type": "constructor"}];

  private static _USER_REGISTRY_CONTRACT_ADDRESS = "0xfcc04928a18f3d81d979159a4c57fae73aff1e12";
  private static _USER_REGISTRY_CONTRACT_ABI = [{
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "userContracts",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "userContractAdd", "type": "address"}],
    "name": "setUserContractAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "type": "constructor", "payable": true}];


  static get USER_REGISTRY_CONTRACT_ADDRESS(): string {
    return this._USER_REGISTRY_CONTRACT_ADDRESS;
  }

  static get USER_REGISTRY_CONTRACT_ABI() {
    return this._USER_REGISTRY_CONTRACT_ABI;
  }

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
