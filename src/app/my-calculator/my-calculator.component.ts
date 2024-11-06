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

    if (this.CalcGroups.length > 1) {
      if (index < this.operationsBetweenGroups.length) {
        this.operationsBetweenGroups.splice(index, 1);
      } else {
        this.operationsBetweenGroups.pop();
      }
    } else {
      this.operationsBetweenGroups = [];
    }
  }

  public calcGroup(){
    let result = 0;

    let tempHistory: string[] = [];

    this.CalcGroups.forEach((group,i) => {
      if(i === 0){
        result = this.Calc(this.calcValueWithModify(group.first), this.calcValueWithModify(group.second),group.operation)
      }else{
       let tempResult = this.Calc(this.calcValueWithModify(group.first), this.calcValueWithModify(group.second),group.operation)
        result = this.Calc(result, tempResult, this.operationsBetweenGroups[i-1])
      }
      tempHistory.push(`(
        ${group.first.modificator !== CalcModifiers.none ?
        group.first.modificator :""})
          ${group.first.value}
          ${group.operation}
          ${group.second.modificator !== CalcModifiers.none ?
        group.second.modificator :""}
          ${group.second.value}
          `);

      tempHistory.push(`= ${result}`)
      this.history.push(tempHistory.join(" "))

      this.result = result;
    })
  }

  public calcValueWithModify(value: CalcVar): number{
    switch (value.modificator){
      case CalcModifiers.none:
        return value.value
      case CalcModifiers.cos:
        return Math.cos(value.value)
      case CalcModifiers.sin:
        return Math.sin(value.value)
      case CalcModifiers.square:
        return Math.pow(value.value,2)
    }
  }

 public Calc(first: number , second: number , operation: CalcOperations): number{
      switch (operation){
        case CalcOperations.plus:
         return  first + second;
        case CalcOperations.minus:
          return  first - second;
        case CalcOperations.multiply:
          return  first * second;
        case CalcOperations.divide:
          return  first / second;
      }
 }
  protected readonly CalcOperations = CalcOperations;
}
