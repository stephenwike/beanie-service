import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BeanieManagerService } from 'src/app/services/beanie-manager.service';

@Component({
  selector: 'app-find-game',
  templateUrl: './find-game.component.html',
  styleUrls: ['./find-game.component.scss']
})
export class FindGameComponent implements OnInit {

  findForm: FormGroup;
  warning: string = "No Warning Yet"; 

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private manager: BeanieManagerService) { }

  ngOnInit(): void {
    this.findForm = this.fb.group({
      id: ''
    });
  }

  Find() {
    let id = this.findForm.get("id").value;
    if (id) {
      this.manager.GetScoreBoardById(id).then((successful) => {
        if (successful) {
          this.route.navigate(['/dashboard']);
        }
        else {
          this.warning = "Could not find game with the provided ID."
        }
      }).catch(err => console.log(err));
    }
  }
}
