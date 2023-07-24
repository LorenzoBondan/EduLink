package com.projects.EduLink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.EduLink.entities.Test;

@Repository
public interface TestRepository extends JpaRepository<Test,Long>{

}
