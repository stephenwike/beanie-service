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
      this.manager.GetScoreBoardById(id);
      this.route.navigate(['/dashboard']);
    }
  }
}
