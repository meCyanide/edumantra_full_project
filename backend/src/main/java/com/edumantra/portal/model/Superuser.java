package com.edumantra.portal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "superusers")
public class Superuser {

    @Id
    @Column(name = "superusersid")
    private Integer superusersid;

    @Column(name = "superusersname")
    private String superusersname;

    @Column(name = "superusersemailid")
    private String superusersemailid;

    @Column(name = "superusersphoneno")
    private String superusersphoneno;

    @Column(name = "superuserspasswords")
    private String superuserspasswords;

    @Column(name = "superusersrole")
    private String superusersrole;

    @Column(name = "superusersrequestdate")
    private LocalDateTime superusersrequestdate;

    @Column(name = "superusersapprovedate")
    private LocalDateTime superusersapprovedate;

    @Column(name = "superusersapproveby")
    private String superusersapproveby;

    @Column(name = "superusersactiveflag")
    private String superusersactiveflag;

    // Getters and Setters
    public Integer getSuperusersid() {
        return superusersid;
    }

    public void setSuperusersid(Integer superusersid) {
        this.superusersid = superusersid;
    }

    public String getSuperusersname() {
        return superusersname;
    }

    public void setSuperusersname(String superusersname) {
        this.superusersname = superusersname;
    }

    public String getSuperusersemailid() {
        return superusersemailid;
    }

    public void setSuperusersemailid(String superusersemailid) {
        this.superusersemailid = superusersemailid;
    }

    public String getSuperusersphoneno() {
        return superusersphoneno;
    }

    public void setSuperusersphoneno(String superusersphoneno) {
        this.superusersphoneno = superusersphoneno;
    }

    public String getSuperuserspasswords() {
        return superuserspasswords;
    }

    public void setSuperuserspasswords(String superuserspasswords) {
        this.superuserspasswords = superuserspasswords;
    }

    public String getSuperusersrole() {
        return superusersrole;
    }

    public void setSuperusersrole(String superusersrole) {
        this.superusersrole = superusersrole;
    }

    public LocalDateTime getSuperusersrequestdate() {
        return superusersrequestdate;
    }

    public void setSuperusersrequestdate(LocalDateTime superusersrequestdate) {
        this.superusersrequestdate = superusersrequestdate;
    }

    public LocalDateTime getSuperusersapprovedate() {
        return superusersapprovedate;
    }

    public void setSuperusersapprovedate(LocalDateTime superusersapprovedate) {
        this.superusersapprovedate = superusersapprovedate;
    }

    public String getSuperusersapproveby() {
        return superusersapproveby;
    }

    public void setSuperusersapproveby(String superusersapproveby) {
        this.superusersapproveby = superusersapproveby;
    }

    public String getSuperusersactiveflag() {
        return superusersactiveflag;
    }

    public void setSuperusersactiveflag(String superusersactiveflag) {
        this.superusersactiveflag = superusersactiveflag;
    }
}
