import {PartType} from "./partType";
import {PartTypeCharacteristicWithValue} from "./partTypeCharacteristicWithValue";

export class PartTypeWithCharacteristic {
  public partType: PartType;
  public characteristicsWithValues: PartTypeCharacteristicWithValue[];

  constructor(partType: PartType, characteristicsWithValues: PartTypeCharacteristicWithValue[]) {
    this.partType = partType;
    this.characteristicsWithValues = characteristicsWithValues;
  }
}
