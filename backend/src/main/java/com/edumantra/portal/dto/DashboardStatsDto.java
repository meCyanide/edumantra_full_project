package com.edumantra.portal.dto;

public class DashboardStatsDto {
    private long totalUsers;
    private long totalSuperusers;
    private long totalClassDetails;
    private long pendingApprovals;

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalSuperusers() { return totalSuperusers; }
    public void setTotalSuperusers(long totalSuperusers) { this.totalSuperusers = totalSuperusers; }

    public long getTotalClassDetails() { return totalClassDetails; }
    public void setTotalClassDetails(long totalClassDetails) { this.totalClassDetails = totalClassDetails; }

    public long getPendingApprovals() { return pendingApprovals; }
    public void setPendingApprovals(long pendingApprovals) { this.pendingApprovals = pendingApprovals; }
}
