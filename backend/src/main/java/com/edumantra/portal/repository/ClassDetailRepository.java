package com.edumantra.portal.repository;

import com.edumantra.portal.model.ClassDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClassDetailRepository extends JpaRepository<ClassDetail, Integer> {
    List<ClassDetail> findBySubjectNameContainingIgnoreCaseOrTeacherNameContainingIgnoreCase(String subjectName, String teacherName);
}
