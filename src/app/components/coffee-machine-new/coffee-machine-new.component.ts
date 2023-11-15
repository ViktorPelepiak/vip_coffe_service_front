import {Component} from '@angular/core';
import {Brand} from "../../models/brand";
import {MachineBrandService} from "../../services/machine-brand.service";
import {FormBuilder} from "@angular/forms";
import {Model} from "../../models/model";
import {MachineModelService} from "../../services/machine-model.service";
import {PartTypeWithCharacteristic} from "../../models/partTypeWithCharacteristic";
import {PartType} from "../../models/partType";
import {PartTypeService} from "../../services/machine-part-type.service";
import {CharacteristicType} from "../../models/characteristicType";
import {CharacteristicTypeService} from "../../services/characteristic-type.service";
import {PartTypeCharacteristicWithValue} from "../../models/partTypeCharacteristicWithValue";
import {CoffeeMachineService} from "../../services/coffee-machine.service";
import {Observable} from "rxjs";
import {CustomResponse} from "../../models/customResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coffee-machine-new',
  templateUrl: './coffee-machine-new.component.html',
  styleUrls: ['./coffee-machine-new.component.css']
})
export class CoffeeMachineNewComponent {
  public isTemplate : Boolean = true;
  public brands : Brand[] = [];
  public models : Model[] = [];
  public availablePartTypes : PartType[] = [];
  public availablePartTypeCharacteristics : CharacteristicType[] = [];

  public partTypesWithCharacteristics : PartTypeWithCharacteristic[] = [];

  constructor(
    private characteristicTypeService : CharacteristicTypeService,
    private coffeeMachineService : CoffeeMachineService,
    private formBuilder: FormBuilder,
    private router: Router,
    private machineBrandService : MachineBrandService,
    private machineModelService : MachineModelService,
    private partTypeService : PartTypeService
  ) {
    machineBrandService.getAllBrands().subscribe( response => {
      this.brands = response.result;

      this.machineModelService.getAllModelsForBrandWithId(this.brands[0].id).subscribe( response => {
        this.models = response.result;
      })
    });
  }

  isTemplateChangeHandler() {
    this.isTemplate = !this.isTemplate;
  }

  handleBrandSelection() {
    var brandSelect = document.getElementById("brandSelect");
    var brandId;
    if (brandSelect) {
       // @ts-ignore
      brandId = brandSelect.value;
    }
    console.log("models for brand with id= \"" + brandId + "\"")
    this.machineModelService.getAllModelsForBrandWithId(brandId).subscribe( response => {
      this.models = response.result;
    })
  }

  prepareAvailablePartTypes() {
    this.availablePartTypes = [];
    let selectedPartTypes = this.partTypesWithCharacteristics.map(pt => pt.partType);
    this.partTypeService.getAllPartTypes().subscribe( response => {
      this.availablePartTypes = response.result.filter(function(pt1 : PartType) {
        return !selectedPartTypes.some(function(pt2 : PartType) {
          return pt1.id == pt2.id;
        });
      });
    })
  }

  addPartType() {
    // @ts-ignore
    let partTypeId = document.getElementById("addPartTypeSelect").value;
    if (partTypeId) {
      for (let pt of this.availablePartTypes) {
        if (pt.id == partTypeId){
          this.partTypesWithCharacteristics.push(new PartTypeWithCharacteristic(pt, []));
        }
      }
    }
  }

  prepareCharacteristicModalForPartWithId(partTypeId: number) {
    // @ts-ignore
    document.getElementById("partTypeId").value = partTypeId;

    this.availablePartTypeCharacteristics = [];
    let selectedCharTypes : CharacteristicType[] = [];
    for (let pt of this.partTypesWithCharacteristics) {
      if (pt.partType.id == partTypeId) {
        selectedCharTypes = pt.characteristicsWithValues.map(char => char.characteristicType);
        break;
      }
    }
    this.characteristicTypeService.getAllCharacteristicTypes().subscribe(response => {
      this.availablePartTypeCharacteristics = response.result.filter(function(ct1 : CharacteristicType) {
        return !selectedCharTypes.some(function(ct2 : CharacteristicType) {
          return ct1.id == ct2.id;
        });
      });
    })
  }

  addPartTypeCharacteristic() {
    // @ts-ignore
    let partTypeId = document.getElementById("partTypeId").value;
    // @ts-ignore
    let partTypeCharacteristicId = document.getElementById("addPartTypeCharacteristicSelect").value;
    // @ts-ignore
    let partTypeCharacteristicValue = document.getElementById("partTypeCharacteristicValue").value;

    if (partTypeId && partTypeCharacteristicId && partTypeCharacteristicValue && partTypeCharacteristicValue.length > 0) {
      let selectedCharacteristic;
      for (let c of this.availablePartTypeCharacteristics) {
        if (c.id == partTypeCharacteristicId) {
          selectedCharacteristic = c;
          break;
        }
      }

      if (selectedCharacteristic) {
        for (let pt of this.partTypesWithCharacteristics) {
          if (pt.partType.id == partTypeId) {
            pt.characteristicsWithValues.push(new PartTypeCharacteristicWithValue(
              selectedCharacteristic,
              partTypeCharacteristicValue
            ));
            break;
          }
        }
      }
    }

    // @ts-ignore
    document.getElementById("partTypeId").value = "";
    // @ts-ignore
    document.getElementById("partTypeCharacteristicValue").value = "";
  }

  removePartTypeWitId(partTypeId: number) {
    let position = 0;
    for (let pt of this.partTypesWithCharacteristics) {
      if (pt.partType.id == partTypeId){
        break;
      }
      ++position;
    }

    this.partTypesWithCharacteristics.splice(position, 1);
  }

  removePartTypeCharacteristic(partTypeId: number, characteristicId: number) {
    let position = 0;
    for (let pt of this.partTypesWithCharacteristics) {
      if (pt.partType.id == partTypeId){
        break;
      }
      ++position;
    }
    let partType = this.partTypesWithCharacteristics[position];
    position = 0;
    for(let char of partType.characteristicsWithValues) {
      if (char.characteristicType.id == characteristicId) {
        break;
      }
      ++position
    }

    partType.characteristicsWithValues.splice(position, 1);
  }

  onSubmit() {
    // @ts-ignore
    let modelId = document.getElementById("modelSelect").value;

    let sub : Observable<CustomResponse>;
    if (this.isTemplate) {
      sub = this.coffeeMachineService.saveTemplate(modelId, this.partTypesWithCharacteristics);
    } else {
      // @ts-ignore
      let uniqMachineNumber = document.getElementById("uniqMachineNumber").value;
      // @ts-ignore
      let warrantyEndDate = document.getElementById("warrantyEndDate").value;
      // @ts-ignore
      let additionalInformation = document.getElementById("additionalInformation").value;

      sub = this.coffeeMachineService.saveMachine(modelId, this.partTypesWithCharacteristics, uniqMachineNumber, warrantyEndDate, additionalInformation);
    }

    sub.subscribe(response => {
      if(response.success) {
        this.router.navigate(['/']);
      }
    })
  }
}
