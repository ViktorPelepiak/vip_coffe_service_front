import {CharacteristicType} from "./characteristicType";

export class PartTypeCharacteristicWithValue {
  public characteristicType: CharacteristicType;
  public characteristicTypeVal: string;

  constructor(characteristicType: CharacteristicType, characteristicTypeVal: string) {
    this.characteristicType = characteristicType;
    this.characteristicTypeVal = characteristicTypeVal;
  }
}
