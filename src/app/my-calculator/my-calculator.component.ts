import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

interface CalcGroup{
  first: CalcVar,
  second: CalcVar,
  operation:CalcOperations
}

interface CalcVar {
  value: number,
  modificator: CalcModifiers
}

enum CalcOperations{
  plus = "+",
  minus = "-",
  multiply = "*",
  divide = "/"
}

enum CalcModifiers{
  none = "none",
  sin = "sin",
  cos = "cos",
  square = "square"
}

@Component({
  selector: 'app-my-calculator',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    KeyValuePipe,
    NgIf
  ],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss'
})
export class MyCalculatorComponent {
  public calcOperations = CalcOperations;
  public calcModifiers = CalcModifiers;

  public CalcGroups: CalcGroup[]= [
    {
      first:{
        value:5,
        modificator:CalcModifiers.none
      },
      second:{
        value:5,
        modificator:CalcModifiers.none
      },
      operation:CalcOperations.plus,
    }
  ]

  public history :string[] = []

  public operationsBetweenGroups :CalcOperations[] = []



 // public result :number | undefined = undefined;
 public result?: number;

  public addGroup() :void{
    this.CalcGroups.push(
      {
        first:{
          value:0,
          modificator:CalcModifiers.none
        },
        second:{
          value:0,
          modificator:CalcModifiers.none
        },
        operation:CalcOperations.plus,
      }
    )

    this.operationsBetweenGroups.push(
      CalcOperations.plus
    )
  }


  public removeGroup(index : number)  {
    this.CalcGroups.splice(index, 1);
  }

 // public Calc(){
 //      switch (this.operation){
 //        case "+":
 //          this.result = this.first + this.second;
 //          break
 //        case "-":
 //          this.result = this.first - this.second;
 //          break
 //        case "*":
 //          this.result = this.first * this.second;
 //          break
 //        case "/":
 //          this.result = this.first / this.second;
 //          break
 //        default:
 //          this.result = undefined;
 //          break
 //      }
 // }
  protected readonly CalcOperations = CalcOperations;
}
