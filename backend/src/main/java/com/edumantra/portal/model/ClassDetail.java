package com.edumantra.portal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "classdetails")
public class ClassDetail {

    @Id
    @Column(name = "classid")
    private Integer classid;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "teacher_name")
    private String teacherName;

    @Column(name = "class_days")
    private String classDays;

    @Column(name = "class_time")
    private LocalDateTime classTime;

    @Column(name = "class_joinlink")
    private String classJoinlink;

    @Column(name = "create_ts")
    private LocalDateTime createTs;

    @Column(name = "update_ts")
    private LocalDateTime updateTs;

    // Getters and Setters
    public Integer getClassid() {
        return classid;
    }

    public void setClassid(Integer classid) {
        this.classid = classid;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getClassDays() {
        return classDays;
    }

    public void setClassDays(String classDays) {
        this.classDays = classDays;
    }

    public LocalDateTime getClassTime() {
        return classTime;
    }

    public void setClassTime(LocalDateTime classTime) {
        this.classTime = classTime;
    }

    public String getClassJoinlink() {
        return classJoinlink;
    }

    public void setClassJoinlink(String classJoinlink) {
        this.classJoinlink = classJoinlink;
    }

    public LocalDateTime getCreateTs() {
        return createTs;
    }

    public void setCreateTs(LocalDateTime createTs) {
        this.createTs = createTs;
    }

    public LocalDateTime getUpdateTs() {
        return updateTs;
    }

    public void setUpdateTs(LocalDateTime updateTs) {
        this.updateTs = updateTs;
    }
}
