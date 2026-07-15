package com.edumantra.portal.repository;

import com.edumantra.portal.model.Superuser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SuperuserRepository extends JpaRepository<Superuser, Integer> {
    Optional<Superuser> findBySuperusersemailid(String email);
    List<Superuser> findBySuperusersactiveflag(String activeFlag);
    long countBySuperusersactiveflagNot(String activeFlag);
}
