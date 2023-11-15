export class CharacteristicType {
  id : number;
  type : string;
  measurementUnit : string;


  constructor(id: number, type: string, measurementUnit: string) {
    this.id = id;
    this.type = type;
    this.measurementUnit = measurementUnit;
  }
}
