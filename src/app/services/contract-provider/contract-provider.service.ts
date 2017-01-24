import {Injectable} from '@angular/core';

@Injectable()
export class ContractProviderService {


  private static _REGISTRY_CONTRACT_ADDRESS = "0x8aa0afde10bc56236f3bd9c044696252f74b7c31";
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

  private static _USER_CONTRACT_BINARY = "0x606060405234610000575b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6115f68061009f6000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806309b951eb146100d35780631371cd1d146101305780631c45c91a1461015157806340af2ee7146101e157806341c0e1b5146101f057806363ffab31146101ff5780638c7c9e0c1461022a5780638da5cb5b1461024d57806393e7d1c31461029c578063b60d42881461032c578063b76dd14714610336578063d562f61614610369578063f7fdf01b1461038c578063f9c2b97b146103e9575b610000565b34610000576100ee600480803590602001909190505061040c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761014f60048080356000191690602001909190505061043f565b005b3461000057610182600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104ac565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001846000191660001916815260200183815260200182815260200194505050505060405180910390f35b34610000576101ee6104fc565b005b34610000576101fd610683565b005b346100005761020c61071e565b60405180826000191660001916815260200191505060405180910390f35b3461000057610237610724565b6040518082815260200191505060405180910390f35b346100005761025a61072a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102cd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610750565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001846000191660001916815260200183815260200182815260200194505050505060405180910390f35b6103346107a0565b005b3461000057610367600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610811565b005b3461000057610376610d07565b6040518082815260200191505060405180910390f35b34610000576103a76004808035906020019091905050610d0d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103f6610d40565b6040518082815260200191505060405180910390f35b60076020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561049b57610000565b80600181600019169055505b5b5b50565b60056020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055a57610000565b60405161088480610d47833901809050604051809103906000f080156100005790506080604051908101604052808273ffffffffffffffffffffffffffffffffffffffff1681526020016000600102600019168152602001600081526020016000815250600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019060001916905560408201518160020155606082015181600301559050506004600081548092919060010191905055505b5b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106df57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60015481565b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60066020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107fc57610000565b346002600082825401925050819055505b5b5b565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561086f57610000565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a49576080604051908101604052808373ffffffffffffffffffffffffffffffffffffffff16815260200160006001026000191681526020014281526020016001815250600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019060001916905560408201518160020155606082015181600301559050506003600081548092919060010191905055508160076000600354815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ae3565b42600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020181905550600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301600081548092919060010191905055505b8190508073ffffffffffffffffffffffffffffffffffffffff16632cb50acf8273ffffffffffffffffffffffffffffffffffffffff1663ec67d2d36000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050600154600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303818588803b156100005761235a5a03f11561000057505050508073ffffffffffffffffffffffffffffffffffffffff166363ffab316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010181600019169055505b5b5b5050565b60045481565b60086020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600354815600606060405234610000575b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6107e58061009f6000396000f300606060405236156100c3576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631371cd1d146100c85780632cb50acf146100e95780633ccfd60b1461012457806341c0e1b51461013357806363f199361461014257806363ffab31146101635780636ba13a821461018e5780638da5cb5b146101b157806391b7f5ed14610200578063a87430ba1461021d578063c623674f1461027a578063cf309012146102a5578063ec67d2d3146102c8575b610000565b34610000576100e76004808035600019169060200190919050506102eb565b005b61012260048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610358565b005b34610000576101316104fd565b005b34610000576101406105da565b005b3461000057610161600480803560001916906020019091905050610675565b005b34610000576101706106e2565b60405180826000191660001916815260200191505060405180910390f35b346100005761019b6106e8565b6040518082815260200191505060405180910390f35b34610000576101be6106ee565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761021b6004808035906020019091905050610714565b005b346100005761024e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061077d565b604051808460001916600019168152602001838152602001828152602001935050505060405180910390f35b34610000576102876107a7565b60405180826000191660001916815260200191505060405180910390f35b34610000576102b26107ad565b6040518082815260200191505060405180910390f35b34610000576102d56107b3565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561034757610000565b80600381600019169055505b5b5b50565b60015480341015156104f2576000600102600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015460001916141561045357606060405190810160405280846000191681526020014281526020016001815250600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190600019169055602082015181600101556040820151816002015590505060016002600082825401925050819055506104ec565b42600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825401925050819055505b5b6104f7565b610000565b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f1935050505015156105d557610000565b5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561063657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106d157610000565b80600481600019169055505b5b5b50565b60035481565b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561077057610000565b806001819055505b5b5b50565b60066020528060005260406000206000915090508060000154908060010154908060020154905083565b60045481565b60055481565b600154815600a165627a7a7230582069bb7244656ecb61ab05d1b6ae69494145059c40c50e47b534cdda45087f50ae0029a165627a7a7230582021036708de95592a532f3f1680c80cbec67c84a9264aa3f4688549c8319ec02c0029";
  private static _USER_CONTRACT_ABI = [{
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "consumedServices",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_publicKey", "type": "bytes32"}],
    "name": "setPublicKey",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "myConsumedServices",
    "outputs": [{"name": "serviceAddress", "type": "address"}, {
      "name": "publicKey",
      "type": "bytes32"
    }, {"name": "lastUsage", "type": "uint256"}, {"name": "countUsage", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "deployServiceContract",
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
    "name": "eth",
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
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "myProvidedServices",
    "outputs": [{"name": "serviceAddress", "type": "address"}, {
      "name": "publicKey",
      "type": "bytes32"
    }, {"name": "lastUsage", "type": "uint256"}, {"name": "countUsage", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "fund",
    "outputs": [],
    "payable": true,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"name": "_serviceAddress", "type": "address"}],
    "name": "consumeService",
    "outputs": [],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "providedServicesCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "providedServices",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "consumedServicesCount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }, {"inputs": [], "payable": false, "type": "constructor"}];

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

  private static _USER_REGISTRY_CONTRACT_ADDRESS = "0x5a578d135bbcf59da6f64dac6d0982707a3c9c3e";
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
