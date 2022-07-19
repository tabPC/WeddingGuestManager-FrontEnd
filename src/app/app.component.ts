import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Label } from './label';
import { LabelService } from './label.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public labels: Label[] | undefined;
  public editLabel: Label;
  public deleteLabel: Label;

  constructor(private labelService: LabelService) {}

  ngOnInit() {
    this.getLabels();
  }

  public getLabels(): void {
    this.labelService.getLabels().subscribe(
      {
        next: (response: Label[]) => {this.labels = response;},
        error: (error: HttpErrorResponse) => {alert(error.message);}
      }
    );
  }

  public onAddLabel(addForm: NgForm): void {
    document.getElementById('add-Label-form').click();
    this.labelService.addLabel(addForm.value).subscribe({
      next: (response: Label) => {
        console.log(response);
        this.getLabels();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  
  public onUpdateLabel(label: Label): void {
    this.labelService.updateLabel(label).subscribe({
      next: (response: Label) => {
        // console.log(response);
        this.getLabels();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  
  public onDeleteLabel(id: number): void {
    this.labelService.deleteLabel(id).subscribe({
      next: (response: void) => {
        // console.log(response);
        this.getLabels();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchLabels(key: string): void {
    // console.log(key);
    const results: Label[] = [];
    for (const label of this.labels) {
      if (label.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || label.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || label.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || label.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || label.diet.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(label);
      }
    }
    this.labels = results;
    if (results.length === 0 || !key) {
      this.getLabels();
    }
  }

  public onOpenModal(mode: string, label?: Label): void {
    const container = document.getElementById('main-container'); // get access to entire main-container div
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'; // hide button while its modal is open
    button.setAttribute('data-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-target','#addLabelModal');
    } else if (mode === 'edit') {
      this.editLabel = label;
      button.setAttribute('data-target','#updateLabelModal');
    } else if (mode === 'delete') {
      this.deleteLabel = label;
      button.setAttribute('data-target','#deleteLabelModal');
    }
    container?.appendChild(button); // add button to container
    button.click();
  }
}
