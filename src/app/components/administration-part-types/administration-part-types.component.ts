import {Component} from '@angular/core';
import {PartType} from "../../models/partType";
import {PartTypeService} from "../../services/machine-part-type.service";

@Component({
  selector: 'app-administration-part-types',
  templateUrl: './administration-part-types.component.html',
  styleUrls: ['./administration-part-types.component.css']
})
export class AdministrationPartTypesComponent {
  public partTypes: PartType[] = [];

  constructor(
    private partTypeService : PartTypeService
  ) {
    partTypeService.getAllPartTypes().subscribe( response => {
      this.partTypes = response.result;
      console.log( "brands => " + JSON.stringify(this.partTypes));

      this.rebuildTable();
    });
  }

  public editPartType(partTypeNumber: number){
    // @ts-ignore
    document.getElementById("partTypeId").value = this.partTypes[partTypeNumber].id;
    // @ts-ignore
    document.getElementById("partTypeName").value = this.partTypes[partTypeNumber].type;
  }

  public sendEditRequest() {
    // @ts-ignore
    var partTypeId = document.getElementById("partTypeId").value;
    // @ts-ignore
    var partTypeName = document.getElementById("partTypeName").value;

    if (partTypeId != null && partTypeName != null && partTypeName.length >= 2) {
      this.partTypeService.editPartTypeName(partTypeId, partTypeName).subscribe(response => {
        if (response.success) {
          for (let i = 0; i < this.partTypes.length; i++) {
            if (this.partTypes[i].id == response.result.id) {
              this.partTypes[i].type = response.result.type;
              break;
            }
          }
          this.rebuildTable();
        }
      })
    }

  }

  public sendSaveRequest() {
    // @ts-ignore
    var newPartTypeName = document.getElementById("newPartType").value;

    if (newPartTypeName == null || newPartTypeName.length == 0) {
      // @ts-ignore
      document.getElementsByClassName("newPartTypeError")[0].innerText = "Поле \"Нова деталь\" повинно бути заповнено!"
    } else {
      var isExist = false;
      for (let i = 0; i < this.partTypes.length; i++) {
        if (this.partTypes[i].type == newPartTypeName) {
          isExist = true;
          break;
        }
      }

      if (isExist) {
        // @ts-ignore
        document.getElementsByClassName("newPartTypeError")[0].innerText = "Деталь з такою назвою вже існує!"
      } else {
        this.partTypeService.savePartType(newPartTypeName).subscribe(response => {
          if (response.success) {
            this.partTypes.push(response.result);
            this.partTypes.sort((a,b) => a.type.localeCompare(b.type));
            this.rebuildTable();
          }
        });
      }
    }
  }

  public deletePartType(partTypeNumber: number){
    // @ts-ignore
    document.getElementById("deletePartTypeId").value = this.partTypes[partTypeNumber].id;
    // @ts-ignore
    document.getElementById("removeQuestion").innerText =
      "Ви дійсно бажаєте видалити деталь \"" + this.partTypes[partTypeNumber].type + "\" та всі записи пов'язані з нею?";
  }

  public sendDeleteRequest() {
    // @ts-ignore
    var deletePartTypeId = document.getElementById("deletePartTypeId").value;
    if (deletePartTypeId != null) {
      this.partTypeService.deletePartType(deletePartTypeId).subscribe(response => {
        if (response.success) {
          var position = -1;
          for (let i = 0; i< this.partTypes.length; ++i) {
            if (this.partTypes[i].id == deletePartTypeId) {
              position = i;
              break;
            }
          }
          this.partTypes.splice(position, 1);
          this.rebuildTable();
        }
      })
    }
  }

  public rebuildTable() {
    var table = document.getElementById("partTypeTable");
    if (table != null) {
      table.innerHTML = ""

      var tbody = document.createElement("tbody");

      var headerRow = document.createElement("tr");
      const numberH = document.createElement("th")
      numberH.style.textAlign = "right";
      headerRow.appendChild(numberH);
      const nameH = document.createElement("th")
      nameH.classList.add("col-md")
      const nameHText = document.createTextNode("Деталь");
      nameH.appendChild(nameHText);
      headerRow.appendChild(nameH);
      const editH = document.createElement("th")
      editH.classList.add("col");
      headerRow.appendChild(editH);
      const removeH = document.createElement("th")
      removeH.classList.add("col");
      headerRow.appendChild(removeH);
      tbody.appendChild(headerRow);

      console.log("partTypes.length => " + this.partTypes.length)
      for (let i = 0; i < this.partTypes.length; i++) {
        var contentRaw = document.createElement("tr");

        var numberCell = document.createElement("td");
        var numberCellText = document.createTextNode("" + (i + 1));
        numberCell.style.textAlign = "right";
        numberCell.appendChild(numberCellText);
        contentRaw.appendChild(numberCell);

        var partTypeCell = document.createElement("td");
        var partTypeCellText = document.createTextNode(this.partTypes[i].type);
        partTypeCell.appendChild(partTypeCellText);
        contentRaw.appendChild(partTypeCell);

        var editCell = document.createElement("td");
        editCell.style.textAlign = "right";
        var editCellBtn = document.createElement("button");
        editCellBtn.classList.add("btn");
        editCellBtn.classList.add("btn-primary");
        editCellBtn.setAttribute("data-toggle", "modal");
        editCellBtn.setAttribute("data-target", "#editPartTypeModal");
        editCellBtn.innerText = "EDIT"
        editCellBtn.addEventListener("click", () => this.editPartType(i))
        editCell.appendChild(editCellBtn);
        contentRaw.appendChild(editCell);


        var deleteCell = document.createElement("td");
        deleteCell.style.textAlign = "left";
        var deleteCellBtn = document.createElement("button");
        deleteCellBtn.classList.add("btn");
        deleteCellBtn.classList.add("btn-danger");
        deleteCellBtn.setAttribute("data-toggle", "modal");
        deleteCellBtn.setAttribute("data-target", "#deletePartTypeModal");
        deleteCellBtn.innerText = "DELETE"
        deleteCellBtn.addEventListener("click", () => this.deletePartType(i))
        deleteCell.appendChild(deleteCellBtn);
        contentRaw.appendChild(deleteCell);

        tbody.appendChild(contentRaw);
      }

      table.appendChild(tbody);
    }
  }
}
