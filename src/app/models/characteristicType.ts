export class CharacteristicType {
  id : bigint;
  type : string;
  measurementUnit : string;


  constructor(id: bigint, type: string, measurementUnit: string) {
    this.id = id;
    this.type = type;
    this.measurementUnit = measurementUnit;
  }
}
