package com.edumantra.portal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "userid")
    private Integer userid;

    @Column(name = "username")
    private String username;

    @Column(name = "useremailid")
    private String useremailid;

    @Column(name = "userphonenumber")
    private String userphonenumber;

    @Column(name = "userpassword")
    private String userpassword;

    @Column(name = "userrole")
    private String userrole;

    @Column(name = "usercreate_ts")
    private LocalDateTime usercreateTs;

    @Column(name = "userupdate_ts")
    private LocalDateTime userupdateTs;

    @Column(name = "useractive_flag")
    private String useractiveFlag;

    // Getters and Setters
    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUseremailid() {
        return useremailid;
    }

    public void setUseremailid(String useremailid) {
        this.useremailid = useremailid;
    }

    public String getUserphonenumber() {
        return userphonenumber;
    }

    public void setUserphonenumber(String userphonenumber) {
        this.userphonenumber = userphonenumber;
    }

    public String getUserpassword() {
        return userpassword;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }

    public String getUserrole() {
        return userrole;
    }

    public void setUserrole(String userrole) {
        this.userrole = userrole;
    }

    public LocalDateTime getUsercreateTs() {
        return usercreateTs;
    }

    public void setUsercreateTs(LocalDateTime usercreateTs) {
        this.usercreateTs = usercreateTs;
    }

    public LocalDateTime getUserupdateTs() {
        return userupdateTs;
    }

    public void setUserupdateTs(LocalDateTime userupdateTs) {
        this.userupdateTs = userupdateTs;
    }

    public String getUseractiveFlag() {
        return useractiveFlag;
    }

    public void setUseractiveFlag(String useractiveFlag) {
        this.useractiveFlag = useractiveFlag;
    }
}
