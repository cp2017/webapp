export class Microservice {

  private _id: string;
  private _price: number;
  private _name: string;
  private _description: string;
  private _hashToSwaggerFile: string;
  private _IPNS_URI: string;
  private _IPFS_VERSION_HISTORY: Array<string>;
  private _ipfsPreviousVersions: Array<Microservice>;

  constructor(name: string, description: string, hashToSwaggerFile?: string) {
    this._name = name;
    this._description = description;
    this._hashToSwaggerFile = hashToSwaggerFile;
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
}
