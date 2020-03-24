import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit {
  scroll = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.newRandom()),
    b: new FormControl(this.newRandom()),
    answer: new FormControl('')
  }, [
    (form: AbstractControl) => {
      const { a, b, answer } = form.value;
      // tslint:disable-next-line: radix
      if (a + b === parseInt(answer)) {
        return null;
      }
      return { addition: true };
    }
  ]);

  constructor() { }
  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }
  ngOnInit(): void {
    this.mathForm.statusChanges.subscribe(() => {
      const { a, b, answer } = this.mathForm.value;
      // tslint:disable-next-line: radix
      if (a + b === parseInt(answer)) {
        this.mathForm.controls.a.setValue(this.newRandom());
        this.mathForm.controls.b.setValue(this.newRandom());
        this.mathForm.controls.answer.setValue('');
        this.scroll++;
        if (this.scroll >= 10) {
          this.mathForm.controls.answer.disable();
        }
      }
    });
  }
  newRandom() {
    return Math.floor(Math.random() * 10);
  }
}
