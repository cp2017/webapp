export class Microservice {

  private _id: string;
  private _price: number;
  private _name: string;
  private _description: string;
  private _hashToSwaggerFile: string;
  private _IPNS_URI: string;
  private _publicKey:string;
  private _IPFS_VERSION_HISTORY: Array<string>;
  private _ipfsPreviousVersions: Array<Microservice>;
  private _serviceContractAddress: string;
  private _serviceContract:any;
  private _balance:any;
  private _numberConsumers:number;

  constructor(name: string, description: string, hashToSwaggerFile?: string) {
    this._name = name;
    this._description = description;
    this._hashToSwaggerFile = hashToSwaggerFile;
  }

  get numberConsumers(): number {
    return this._numberConsumers;
  }

  set numberConsumers(value: number) {
    this._numberConsumers = value;
  }

  get serviceContractAddress(): string {
    return this._serviceContractAddress;
  }

  set serviceContractAddress(value: string) {
    this._serviceContractAddress = value;
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get hashToSwaggerFile(): string {
    return this._hashToSwaggerFile;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get IPNS_URI(): string {
    return this._IPNS_URI;
  }

  set IPNS_URI(value: string) {
    this._IPNS_URI = value;
  }

  get IPFS_VERSION_HISTORY(): Array<string> {
    return this._IPFS_VERSION_HISTORY;
  }

  set IPFS_VERSION_HISTORY(value: Array<string>) {
    this._IPFS_VERSION_HISTORY = value;
  }

  get publicKey(): string {
    return this._publicKey;
  }

  set publicKey(value: string) {
    this._publicKey = value;
  }

  get ipfsPreviousVersions(): Array<Microservice> {
    return this._ipfsPreviousVersions;
  }

  set ipfsPreviousVersions(value: Array<Microservice>) {
    this._ipfsPreviousVersions = value;
  }

  get serviceContract(): any {
    return this._serviceContract;
  }

  set serviceContract(value: any) {
    this._serviceContract = value;
  }

  get balance(): any {
    return this._balance;
  }

  set balance(value: any) {
    this._balance = value;
  }
}
