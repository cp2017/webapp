export class Microservice {

  private _id: string;
  private _name:string;
  private _description:string;
  private _hashToSwaggerFile:string;

  constructor(name: string, description: string, hashToSwaggerFile?:string) {
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
}
