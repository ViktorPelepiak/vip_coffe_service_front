import {Component} from '@angular/core';
import {CharacteristicType} from "../../models/characteristicType";
import {CharacteristicTypeService} from "../../services/characteristic-type.service";

@Component({
  selector: 'app-administration-characteristic-types',
  templateUrl: './administration-characteristic-types.component.html',
  styleUrls: ['./administration-characteristic-types.component.css']
})
export class AdministrationCharacteristicTypesComponent {

  public characteristicTypes: CharacteristicType[] = [];

  constructor(private characteristicTypeService: CharacteristicTypeService) {
    characteristicTypeService.getAllCharacteristicTypes().subscribe(response => {
      this.characteristicTypes = response.result;

      this.rebuildTable();
    });
  }

  public sendSaveRequest() {
    // @ts-ignore
    var newCharacteristicType = document.getElementById("newCharacteristicType").value;
    // @ts-ignore
    var newMeasurementUnit = document.getElementById("newMeasurementUnit").value;

    var isErrorExist = false;
    if (newCharacteristicType == null || newCharacteristicType.length == 0) {
      isErrorExist = true
      // @ts-ignore
      document.getElementsByClassName("newCharacteristicTypeError")[0].innerText = "Поле \"Нова характеристика\" повинно бути заповнено!"
    }
    if (newMeasurementUnit == null || newMeasurementUnit.length == 0) {
      isErrorExist = true
      // @ts-ignore
      document.getElementsByClassName("newMeasurementUnitError")[0].innerText = "Поле \"Одиниці виміру\" повинно бути заповнено!"
    }

    if (isErrorExist) return;

    var isExist = false;
    for (let i = 0; i < this.characteristicTypes.length; i++) {
      if (this.characteristicTypes[i].type == newCharacteristicType
        && this.characteristicTypes[i].measurementUnit == newMeasurementUnit) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      // @ts-ignore
      document.getElementsByClassName("newCharacteristicTypeError")[0].innerText = "Така характеристика вже існує!"
      // @ts-ignore
      document.getElementsByClassName("newMeasurementUnitError")[0].innerText = "Така характеристика вже існує!"
      return;
    }
    this.characteristicTypeService.saveCharacteristicType(newCharacteristicType, newMeasurementUnit).subscribe(response => {
      if (response.success) {
        this.characteristicTypes.push(response.result);
        this.characteristicTypes.sort((a, b) => a.type.localeCompare(b.type)
          || a.measurementUnit.localeCompare(b.measurementUnit));
        this.rebuildTable();
      }
    });

  }

  public editCharacteristicType(characteristicTypeNumber: number){
    // @ts-ignore
    document.getElementById("characteristicId").value = this.characteristicTypes[characteristicTypeNumber].id;
    // @ts-ignore
    document.getElementById("characteristicName").value = this.characteristicTypes[characteristicTypeNumber].type;
    // @ts-ignore
    document.getElementById("measurementUnit").value = this.characteristicTypes[characteristicTypeNumber].measurementUnit;
  }

  public sendEditRequest() {
    // @ts-ignore
    var characteristicId = document.getElementById("characteristicId").value;
    // @ts-ignore
    var characteristicName = document.getElementById("characteristicName").value;
    // @ts-ignore
    var measurementUnit = document.getElementById("measurementUnit").value;

    if (characteristicId != null && characteristicName != null && characteristicName.length > 0
    && measurementUnit != null && measurementUnit.length > 0) {
      this.characteristicTypeService.editCharacteristicType(characteristicId, characteristicName, measurementUnit)
        .subscribe(response => {
        if (response.success) {
          for (let i = 0; i < this.characteristicTypes.length; i++) {
            if (this.characteristicTypes[i].id == response.result.id) {
              this.characteristicTypes[i].type = response.result.type;
              this.characteristicTypes[i].measurementUnit = response.result.measurementUnit;
              break;
            }
          }
          this.rebuildTable();
        }
      })
    }
  }

  public deleteCharacteristicType(characteristicTypeNumber: number){
    // @ts-ignore
    document.getElementById("deleteCharacteristicTypeId").value = this.characteristicTypes[characteristicTypeNumber].id;
    // @ts-ignore
    document.getElementById("removeQuestion").innerText =
      "Ви дійсно бажаєте видалити характеристику \"" + this.characteristicTypes[characteristicTypeNumber].type
      + " | " + this.characteristicTypes[characteristicTypeNumber].measurementUnit +
      "\" та всі записи пов'язані з нею?";
  }

  public sendDeleteRequest() {
    // @ts-ignore
    var deleteCharacteristicTypeId = document.getElementById("deleteCharacteristicTypeId").value;
    if (deleteCharacteristicTypeId != null) {
      this.characteristicTypeService.deleteCharacteristicType(deleteCharacteristicTypeId).subscribe(response => {
        if (response.success) {
          var position = -1;
          for (let i = 0; i< this.characteristicTypes.length; ++i) {
            if (this.characteristicTypes[i].id == deleteCharacteristicTypeId) {
              position = i;
              break;
            }
          }
          this.characteristicTypes.splice(position, 1);
          this.rebuildTable();
        }
      })
    }
  }

  public rebuildTable() {
    var table = document.getElementById("characteristicTypeTable");
    if (table == null) return;

    table.innerHTML = ""

    var tbody = document.createElement("tbody");

    var headerRow = document.createElement("tr");
    const numberH = document.createElement("th")
    numberH.style.textAlign = "right";
    headerRow.appendChild(numberH);
    const typeH = document.createElement("th")
    typeH.classList.add("col-md")
    const typeHText = document.createTextNode("Тип");
    typeH.appendChild(typeHText);
    headerRow.appendChild(typeH);
    const measurementH = document.createElement("th")
    measurementH.classList.add("col-md")
    const measurementHText = document.createTextNode("Одиниці виміру");
    measurementH.appendChild(measurementHText);
    headerRow.appendChild(measurementH);
    const editH = document.createElement("th")
    editH.classList.add("col");
    headerRow.appendChild(editH);
    const removeH = document.createElement("th")
    removeH.classList.add("col");
    headerRow.appendChild(removeH);
    tbody.appendChild(headerRow);

    for (let i = 0; i < this.characteristicTypes.length; i++) {
      var contentRaw = document.createElement("tr");

      var numberCell = document.createElement("td");
      var numberCellText = document.createTextNode("" + (i + 1));
      numberCell.style.textAlign = "right";
      numberCell.appendChild(numberCellText);
      contentRaw.appendChild(numberCell);

      var characteristicTypeCell = document.createElement("td");
      var characteristicTypeCellText = document.createTextNode(this.characteristicTypes[i].type);
      characteristicTypeCell.appendChild(characteristicTypeCellText);
      contentRaw.appendChild(characteristicTypeCell);

      var measurementUnitCell = document.createElement("td");
      var measurementUnitCellText = document.createTextNode(this.characteristicTypes[i].measurementUnit);
      measurementUnitCell.appendChild(measurementUnitCellText);
      contentRaw.appendChild(measurementUnitCell);

      var editCell = document.createElement("td");
      editCell.style.textAlign = "right";
      var editCellBtn = document.createElement("button");
      editCellBtn.classList.add("btn");
      editCellBtn.classList.add("btn-primary");
      editCellBtn.setAttribute("data-toggle", "modal");
      editCellBtn.setAttribute("data-target", "#editCharacteristicTypeModal");
      editCellBtn.innerText = "EDIT"
      editCellBtn.addEventListener("click", () => this.editCharacteristicType(i))
      editCell.appendChild(editCellBtn);
      contentRaw.appendChild(editCell);


      var deleteCell = document.createElement("td");
      deleteCell.style.textAlign = "left";
      var deleteCellBtn = document.createElement("button");
      deleteCellBtn.classList.add("btn");
      deleteCellBtn.classList.add("btn-danger");
      deleteCellBtn.setAttribute("data-toggle", "modal");
      deleteCellBtn.setAttribute("data-target", "#deleteCharacteristicModal");
      deleteCellBtn.innerText = "DELETE"
      deleteCellBtn.addEventListener("click", () => this.deleteCharacteristicType(i))
      deleteCell.appendChild(deleteCellBtn);
      contentRaw.appendChild(deleteCell);

      tbody.appendChild(contentRaw);
    }

    table.appendChild(tbody);

  }

}
