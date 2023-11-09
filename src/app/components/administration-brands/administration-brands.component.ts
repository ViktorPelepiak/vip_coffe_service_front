import {Component} from '@angular/core';
import {MachineBrandService} from "../../services/machine-brand.service";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-administration-brands',
  templateUrl: './administration-brands.component.html',
  styleUrls: ['./administration-brands.component.css']
})
export class AdministrationBrandsComponent {
  public brands : Brand[] = [];

  constructor(
    private machineModelService : MachineBrandService
  ) {
    machineModelService.getAllBrands().subscribe( response => {
      this.brands = response.result;
      console.log( "brands => " + JSON.stringify(this.brands));

      this.rebuildTable();
    });
  }

  public editBrand(brandNumber: number){
    // @ts-ignore
    document.getElementById("brandId").value = this.brands[brandNumber].id;
    // @ts-ignore
    document.getElementById("brandName").value = this.brands[brandNumber].brand;
  }

  public sendEditRequest() {
    // @ts-ignore
    var brandId = document.getElementById("brandId").value;
    // @ts-ignore
    var brandName = document.getElementById("brandName").value;

    if (brandId != null && brandName != null && brandName.length >= 2) {
      this.machineModelService.editBrandName(brandId, brandName).subscribe(response => {
        if (response.success) {
          for (let i = 0; i < this.brands.length; i++) {
            if (this.brands[i].id == response.result.id) {
              this.brands[i].brand = response.result.brand;
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
    var newBrandName = document.getElementById("newBrandName").value;

    if (newBrandName == null || newBrandName.length == 0) {
      // @ts-ignore
      document.getElementsByClassName("newBrandError")[0].innerText = "Поле \"Новий бренд\" повинно бути заповнено!"
    } else {
      var isExist = false;
      for (let i = 0; i < this.brands.length; i++) {
        if (this.brands[i].brand == newBrandName) {
          isExist = true;
          break;
        }
      }

      if (isExist) {
        // @ts-ignore
        document.getElementsByClassName("newBrandError")[0].innerText = "Бренд з такою назвою вже існує!"
      } else {
        this.machineModelService.saveBrandName(newBrandName).subscribe(response => {
          if (response.success) {
            this.brands.push(response.result);
            this.brands.sort((a,b) => a.brand.localeCompare(b.brand));
            this.rebuildTable();
          }
        });
      }
    }
  }

  public deleteBrand(brandNumber: number){
    // @ts-ignore
    document.getElementById("deleteBrandId").value = this.brands[brandNumber].id;
    // @ts-ignore
    document.getElementById("removeQuestion").innerText =
      "Ви дійсно бажаєте видалити бренд \"" + this.brands[brandNumber].brand + "\" та всі записи пов'язані з ним?";
  }

  public sendDeleteRequest() {
    // @ts-ignore
    var deleteBrandId = document.getElementById("deleteBrandId").value;
    if (deleteBrandId != null) {
      this.machineModelService.deleteBrand(deleteBrandId).subscribe(response => {
        if (response.success) {
          var position = -1;
          for (let i = 0; i< this.brands.length; ++i) {
            if (this.brands[i].id == deleteBrandId) {
              position = i;
              break;
            }
          }
          this.brands.splice(position, 1);
          this.rebuildTable();
        }
      })
    }
  }

  public rebuildTable() {
    var table = document.getElementById("brandTable");
    if (table != null) {
      table.innerHTML = ""

      var tbody = document.createElement("tbody");

      var headerRow = document.createElement("tr");
      const numberH = document.createElement("th")
      numberH.style.textAlign = "right";
      headerRow.appendChild(numberH);
      const nameH = document.createElement("th")
      nameH.classList.add("col-md")
      const nameHText = document.createTextNode("Бренд");
      nameH.appendChild(nameHText);
      headerRow.appendChild(nameH);
      const editH = document.createElement("th")
      editH.classList.add("col");
      headerRow.appendChild(editH);
      const removeH = document.createElement("th")
      removeH.classList.add("col");
      headerRow.appendChild(removeH);
      tbody.appendChild(headerRow);

      console.log("brands.length => " + this.brands.length)
      for (let i = 0; i < this.brands.length; i++) {
        var contentRaw = document.createElement("tr");

        var numberCell = document.createElement("td");
        var numberCellText = document.createTextNode("" + (i + 1));
        numberCell.style.textAlign = "right";
        numberCell.appendChild(numberCellText);
        contentRaw.appendChild(numberCell);

        var brandCell = document.createElement("td");
        var brandCellText = document.createTextNode(this.brands[i].brand);
        brandCell.appendChild(brandCellText);
        contentRaw.appendChild(brandCell);

        var editCell = document.createElement("td");
        editCell.style.textAlign = "right";
        var editCellBtn = document.createElement("button");
        editCellBtn.classList.add("btn");
        editCellBtn.classList.add("btn-primary");
        editCellBtn.setAttribute("data-toggle", "modal");
        editCellBtn.setAttribute("data-target", "#editBrandModal");
        editCellBtn.innerText = "EDIT"
        editCellBtn.addEventListener("click", () => this.editBrand(i))
        editCell.appendChild(editCellBtn);
        contentRaw.appendChild(editCell);


        var deleteCell = document.createElement("td");
        deleteCell.style.textAlign = "left";
        var deleteCellBtn = document.createElement("button");
        deleteCellBtn.classList.add("btn");
        deleteCellBtn.classList.add("btn-danger");
        deleteCellBtn.setAttribute("data-toggle", "modal");
        deleteCellBtn.setAttribute("data-target", "#deleteBrandModal");
        deleteCellBtn.innerText = "DELETE"
        deleteCellBtn.addEventListener("click", () => this.deleteBrand(i))
        deleteCell.appendChild(deleteCellBtn);
        contentRaw.appendChild(deleteCell);

        tbody.appendChild(contentRaw);
      }

      table.appendChild(tbody);
    }
  }
}
