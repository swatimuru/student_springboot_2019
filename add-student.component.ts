import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice:StudentService) { }  
  
  student : Student=new Student();  
  submitted = false;  
  
  ngOnInit() {  
    this.submitted=false;  
  } 

  studentsaveform=new FormGroup({  
    name:new FormControl('' , [Validators.required , Validators.minLength(5)]),  
    email:new FormControl('',[Validators.required,Validators.email]),  
    department:new FormControl()  
  });

  saveStudent(saveStudent){  
    this.student=new Student();     
    this.student.name=this.StudentName.value;  
    this.student.email=this.StudentEmail.value;  
    this.student.department=this.StudentDepartment.value;  
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.studentservice.createStudent(this.student)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.student = new Student();  
  }  
  
  get StudentName(){  
    return this.studentsaveform.get('name');  
  }  
  
  get StudentEmail(){  
    return this.studentsaveform.get('email');  
  }  
  
  get StudentDepartment(){  
    return this.studentsaveform.get('department');  
  }  
  
  addStudentForm(){  
    this.submitted=false;  
    this.studentsaveform.reset();  
  }

}
