package com.edumantra.portal.dto;

public class AuthUser {
    private Integer id;
    private String username;
    private String emailid;
    private String role;
    private String activeflag;
    private String type; // "user" or "superuser"

    public AuthUser() {}

    public AuthUser(Integer id, String username, String emailid, String role, String activeflag, String type) {
        this.id = id;
        this.username = username;
        this.emailid = emailid;
        this.role = role;
        this.activeflag = activeflag;
        this.type = type;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmailid() { return emailid; }
    public void setEmailid(String emailid) { this.emailid = emailid; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getActiveflag() { return activeflag; }
    public void setActiveflag(String activeflag) { this.activeflag = activeflag; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
