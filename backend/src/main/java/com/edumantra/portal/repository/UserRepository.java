package com.edumantra.portal.repository;

import com.edumantra.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUseremailid(String email);
    Optional<User> findByUserphonenumber(String phone);
    long countByUseractiveFlag(String activeFlag);
    long countByUseractiveFlagNot(String activeFlag);
}
