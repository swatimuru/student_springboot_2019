package com.springboot.angular.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.angular.student.model.Student;
import com.springboot.angular.student.service.StudentService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping({"/stud"})
public class StudentController {

	@Autowired
	private StudentService studentservice;
	
	@PostMapping("/save")  
    public boolean saveStudent(@RequestBody Student student) {  
         return studentservice.saveStudent(student);  
          
    }  
      
    @GetMapping("/list")  
    public List<Student> allstudents() {  
         return studentservice.getStudents();  
          
    }  
      
    @DeleteMapping("/delete/{id}")  
    public boolean deleteStudent(@PathVariable("id") long id,Student student) {  
        student.setId(id);  
        return studentservice.deleteStudent(student);  
    }  
  
    @GetMapping("/get/{id}")  
    public List<Student> allstudentByID(@PathVariable("id") long id,Student student) {  
         student.setId(id);  
         return studentservice.getStudentByID(student);  
          
    }  
      
    @PostMapping("/upd/{id}")  
    public boolean updateStudent(@RequestBody Student student,@PathVariable("id") long id) {  
        student.setId(id);  
        return studentservice.updateStudent(student);  
    }  
}  

