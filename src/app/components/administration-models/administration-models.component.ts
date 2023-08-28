import { Component } from '@angular/core';
import {Brand} from "../../models/brand";
import {Model} from "../../models/model";
import {MachineBrandService} from "../../services/machine-brand.service";
import {MachineModelService} from "../../services/machine-model.service";

@Component({
  selector: 'app-administration-models',
  templateUrl: './administration-models.component.html',
  styleUrls: ['./administration-models.component.css']
})
export class AdministrationModelsComponent {
  public brands : Brand[] = [];
  public models: Model[] = [];

  constructor(
    private machineBrandService : MachineBrandService,
    private machineModelService: MachineModelService
  ) {
    machineBrandService.getAllBrands().subscribe( response => {
      this.brands = response.result;
    });
    machineModelService.getAllModels().subscribe( response => {
      this.models = response.result;
      this.rebuildTable();
    });
  }

  public sendSaveRequest() {
    // @ts-ignore
    var newBrandName = document.getElementById("newBrandName").value;
    // @ts-ignore
    var newModelName = document.getElementById("newModelName").value;

    var flag = true;
    if (newBrandName == null || newBrandName.length == 0) {
      flag = false;
      // @ts-ignore
      document.getElementsByClassName("newBrandError")[0].innerText = "Поле \"Новий бренд\" повинно бути заповнено!"
    }
    if (newModelName == null || newModelName.length == 0) {
      flag = false;
      // @ts-ignore
      document.getElementsByClassName("newModelError")[0].innerText = "Поле \"Нова модель\" повинно бути заповнено!"
    }

    if (flag) {
      var isExist = false;
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].brand == newBrandName && this.models[i].model == newModelName) {
          isExist = true;
          break;
        }
      }

      if (isExist) {
        // @ts-ignore
        document.getElementsByClassName("newBrandError")[0].innerText = "Така модель вже існує!"
      } else {
        console.log("tying to create new model")
        this.machineModelService.saveModel(newBrandName, newModelName).subscribe(response => {
          if (response.success) {
            console.log("save response => " + JSON.stringify(response.result));
            this.models.push(response.result);
            this.models.sort(
              (a,b) => ("" + a.brand).localeCompare("" + b.brand)
                || ("" + a.model).localeCompare(("" + b.model))
            );
            this.rebuildTable();
          }
        });
      }
    }
  }

  public editModel(modelNumber: number){
    // @ts-ignore
    document.getElementById("editModelId").value = this.models[modelNumber].id;
    // @ts-ignore
    document.getElementById("editBrandName").value = this.models[modelNumber].brand
    // @ts-ignore
    document.getElementById("editModelName").value = this.models[modelNumber].model;
  }

  sendEditRequest() {
    // @ts-ignore
    var modelId = document.getElementById("editModelId").value;
    // @ts-ignore
    var brandName = document.getElementById("editBrandName").value;
    // @ts-ignore
    var modelName = document.getElementById("editModelName").value;

    console.log("trying to edit model")
    if (modelId != null && brandName != null && brandName.length >= 2 && modelName != null && modelName.length > 0) {
      this.machineModelService.editModel(modelId, brandName, modelName).subscribe(response => {
        if (response.success) {
          for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].id == response.result.id) {
              this.models[i].brand = response.result.brand;
              this.models[i].model = response.result.model;
              break;
            }
          }
          this.models.sort(
            (a,b) => ("" + a.brand).localeCompare("" + b.brand)
              || ("" + a.model).localeCompare(("" + b.model))
          );
          this.rebuildTable();
        }
      })
    }
  }

  deleteModel(modelNumber: number) {
    // @ts-ignore
    document.getElementById("deleteModelId").value = this.models[modelNumber].id;
    // @ts-ignore
    document.getElementById("removeQuestion").innerText =
      "Ви дійсно бажаєте видалити модель \"" + this.models[modelNumber].brand + " "
      + this.models[modelNumber].model + "\" та всі записи пов'язані з нею?";
  }

  sendDeleteRequest() {
    // @ts-ignore
    var deleteModelId = document.getElementById("deleteModelId").value;
    if (deleteModelId != null) {
      this.machineModelService.deleteModel(deleteModelId).subscribe(response => {
        if (response.success) {
          var position = -1;
          for (let i = 0; i< this.models.length; ++i) {
            if (this.models[i].id == deleteModelId) {
              position = i;
              break;
            }
          }
          this.models.splice(position, 1);
          this.rebuildTable();
        }
      })
    }
  }

  public rebuildTable() {
    var table = document.getElementById("modelTable");
    if (table != null) {
      table.innerHTML = ""

      var tbody = document.createElement("tbody");

      var headerRow = document.createElement("tr");
      const numberH = document.createElement("th");
      numberH.classList.add("col-index");
      headerRow.appendChild(numberH);
      const brandH = document.createElement("th")
      brandH.classList.add("col-brand")
      const brandHText = document.createTextNode("Бренд");
      brandH.appendChild(brandHText);
      headerRow.appendChild(brandH);
      const modelH = document.createElement("th")
      modelH.classList.add("col-model")
      const modelHText = document.createTextNode("Модель");
      modelH.appendChild(modelHText);
      headerRow.appendChild(modelH);
      const editH = document.createElement("th")
      editH.classList.add("col-edit");
      headerRow.appendChild(editH);
      const removeH = document.createElement("th")
      removeH.classList.add("col-delete");
      headerRow.appendChild(removeH);
      tbody.appendChild(headerRow);

      for (let i = 0; i < this.models.length; i++) {
        var contentRaw = document.createElement("tr");

        var numberCell = document.createElement("td");
        var numberCellText = document.createTextNode("" + (i + 1));
        numberCell.style.textAlign = "right";
        numberCell.appendChild(numberCellText);
        contentRaw.appendChild(numberCell);

        var brandCell = document.createElement("td");
        var brandCellText = document.createTextNode(this.models[i].brand);
        brandCell.appendChild(brandCellText);
        contentRaw.appendChild(brandCell);

        var modelCell = document.createElement("td");
        var modelCellText = document.createTextNode(this.models[i].model);
        modelCell.appendChild(modelCellText);
        contentRaw.appendChild(modelCell);

        var editCell = document.createElement("td");
        editCell.style.textAlign = "right";
        var editCellBtn = document.createElement("button");
        editCellBtn.classList.add("btn");
        editCellBtn.classList.add("btn-primary");
        editCellBtn.setAttribute("data-toggle", "modal");
        editCellBtn.setAttribute("data-target", "#editModelModal");
        editCellBtn.innerText = "EDIT"
        editCellBtn.addEventListener("click", () => this.editModel(i))
        editCell.appendChild(editCellBtn);
        contentRaw.appendChild(editCell);


        var deleteCell = document.createElement("td");
        deleteCell.style.textAlign = "left";
        var deleteCellBtn = document.createElement("button");
        deleteCellBtn.classList.add("btn");
        deleteCellBtn.classList.add("btn-danger");
        deleteCellBtn.setAttribute("data-toggle", "modal");
        deleteCellBtn.setAttribute("data-target", "#deleteModelModal");
        deleteCellBtn.innerText = "DELETE"
        deleteCellBtn.addEventListener("click", () => this.deleteModel(i))
        deleteCell.appendChild(deleteCellBtn);
        contentRaw.appendChild(deleteCell);

        tbody.appendChild(contentRaw);
      }

      table.appendChild(tbody);
    }
  }
}
