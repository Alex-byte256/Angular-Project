import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-calculator',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss'
})
export class MyCalculatorComponent {
 public first :number = 1;
 public second :number = 1;

 public operation :string = "+";

 public operations :string[] = ["+","-","*","/"];

 // public result :number | undefined = undefined;
 public result?: number;

 public Calc(){
      switch (this.operation){
        case "+":
          this.result = this.first + this.second;
          break
        case "-":
          this.result = this.first - this.second;
          break
        case "*":
          this.result = this.first * this.second;
          break
        case "/":
          this.result = this.first / this.second;
          break
        default:
          this.result = undefined;
          break
      }
 }
}
