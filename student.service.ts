import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/stud';  

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {  
    return this.http.get(this.baseUrl+'/list');
  }
  
  createStudent(student: object): Observable<object> {
    return this.http.post(this.baseUrl+'/save', student);  
  }
  
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+'/delete/'+id, { responseType: 'text' });  
  }
  
  getStudent(id: number): Observable<Object> {
    return this.http.get(this.baseUrl+'/get/'+id);  
  }
  
  updateStudent(id: number, value: any): Observable<Object> {
    return this.http.post(this.baseUrl+'/upd/${id}', value);  
  }

}
