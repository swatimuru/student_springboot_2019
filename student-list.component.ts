import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentservice:StudentService) { }  

  studentsArray: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  students: Observable<Student[]>;  
  student : Student=new Student();  
  deleteMessage=false;  
  studentlist:any;  
  isupdated = false;      
   
  
  ngOnInit() {  
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.studentservice.getStudentList().subscribe(data =>{  
    this.students =data;  
    this.dtTrigger.next();  
    })  
  }  
    
  deleteStudent(id: number) {  
    this.studentservice.deleteStudent(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.studentservice.getStudentList().subscribe(data =>{  
            this.students =data  
            })  
        },  
        error => console.log(error));  
  }  
  
  updateStudent(id: number){  
    this.studentservice.getStudent(id)  
      .subscribe(  
        data => {  
          this.studentlist=data             
        },  
        error => console.log(error));  
  }  
  
  studentupdateform=new FormGroup({  
    id:new FormControl(),  
    name:new FormControl(),  
    email:new FormControl(),  
    department:new FormControl()  
  });  
  
  updateStu(updstu){  
    this.student=new Student();   
   this.student.id=this.StudentId.value;  
   this.student.name=this.StudentName.value;  
   this.student.email=this.StudentEmail.value;  
   this.student.department=this.StudentDepartment.value;  
   console.log(this.StudentDepartment.value);  
     
  
   this.studentservice.updateStudent(this.student.id,this.student).subscribe(  
    data => {       
      this.isupdated=true;  
      this.studentservice.getStudentList().subscribe(data =>{  
        this.students =data  
        })  
    },  
    error => console.log(error));  
  }  
  
  get StudentName(){  
    return this.studentupdateform.get('name');  
  }  
  
  get StudentEmail(){  
    return this.studentupdateform.get('email');  
  }  
  
  get StudentDepartment(){  
    return this.studentupdateform.get('department');  
  }  
  
  get StudentId(){  
    return this.studentupdateform.get('id');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
}  
