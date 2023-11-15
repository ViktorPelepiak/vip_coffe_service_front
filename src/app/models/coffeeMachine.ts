import {PartTypeWithCharacteristic} from "./partTypeWithCharacteristic";

export class CoffeeMachine {
  brandId : number;
  modelId : number;
  isTemplate : boolean;
  uniqMachineNumber : string | null;
  warrantyEndDate : string | null;
  partTypesWithCharacteristics : PartTypeWithCharacteristic[];
  additionalInformation : string | null;

  constructor(brandId: number, modelId: number, isTemplate: boolean, uniqMachineNumber: string | null, warrantyEndDate: string | null, partTypesWithCharacteristics: PartTypeWithCharacteristic[], additionalInformation: string | null) {
    this.brandId = brandId;
    this.modelId = modelId;
    this.isTemplate = isTemplate;
    this.uniqMachineNumber = uniqMachineNumber;
    this.warrantyEndDate = warrantyEndDate;
    this.partTypesWithCharacteristics = partTypesWithCharacteristics;
    this.additionalInformation = additionalInformation;
  }
}

export class TemplateShort {
  id : number;
  brand : string;
  model : string;

  constructor(id: number, brand: string, model: string) {
    this.id = id;
    this.brand = brand;
    this.model = model;
  }
}

export class MachineShort {
  id : number;
  uniqMachineNumber : string;
  brand : string;
  model : string;
  warrantyUntil : string;
  owner : string;

  constructor(id: number, uniqMachineNumber: string, brand: string, model: string, warrantyUntil: string, owner: string) {
    this.id = id;
    this.uniqMachineNumber = uniqMachineNumber;
    this.brand = brand;
    this.model = model;
    this.warrantyUntil = warrantyUntil;
    this.owner = owner;
  }
}
