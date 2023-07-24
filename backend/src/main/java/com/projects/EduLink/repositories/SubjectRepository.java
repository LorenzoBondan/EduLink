package com.projects.EduLink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.EduLink.entities.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Long>{

}
