package com.edumantra.portal.controller;

import com.edumantra.portal.model.ClassDetail;
import com.edumantra.portal.repository.ClassDetailRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/classdetails")
public class ClassDetailController {

    @Autowired
    private ClassDetailRepository classDetailRepository;

    @GetMapping
    public ResponseEntity<List<ClassDetail>> getAllClasses() {
        return ResponseEntity.ok(classDetailRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createClass(@Valid @RequestBody ClassDetail classDetail) {
        if (classDetail.getClassid() == null) {
            classDetail.setClassid(java.util.concurrent.ThreadLocalRandom.current().nextInt(100000, 999999999));
        }
        classDetail.setCreateTs(LocalDateTime.now());
        ClassDetail savedClass = classDetailRepository.save(classDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedClass);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClass(@PathVariable Integer id, @Valid @RequestBody ClassDetail classDetails) {
        Optional<ClassDetail> classOpt = classDetailRepository.findById(id);
        if (classOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ClassDetail classDetail = classOpt.get();

        classDetail.setSubjectName(classDetails.getSubjectName());
        classDetail.setTeacherName(classDetails.getTeacherName());
        classDetail.setClassDays(classDetails.getClassDays());
        classDetail.setClassTime(classDetails.getClassTime());
        classDetail.setClassJoinlink(classDetails.getClassJoinlink());
        classDetail.setUpdateTs(LocalDateTime.now());

        ClassDetail updatedClass = classDetailRepository.save(classDetail);
        return ResponseEntity.ok(updatedClass);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Integer id) {
        if (!classDetailRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        classDetailRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Class deleted successfully"));
    }
}
