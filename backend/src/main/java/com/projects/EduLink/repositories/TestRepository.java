package com.projects.EduLink.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;

@Repository
public interface TestRepository extends JpaRepository<Test,Long>{

	@Query("SELECT obj FROM Test obj WHERE "
			+ "(:user MEMBER OF obj.students) AND "
			+ "(obj.subject = :subject) "
			+ "ORDER BY obj.date DESC")
	Page<Test> getTestsFromStudentSubject(User user, Subject subject, Pageable pageable);
	
	@Query("SELECT MIN(obj.score) FROM Test obj	WHERE "
			+ "obj.subject = :subject AND "
			+ "UPPER(obj.name) LIKE UPPER(:name)")
	Double getMinScoreFromTest(Subject subject, String name);
	
	@Query("SELECT MAX(obj.score) FROM Test obj WHERE "
			+ "obj.subject = :subject AND "
			+ "UPPER(obj.name) LIKE UPPER(:name)")
	Double getMaxScoreFromTest(Subject subject, String name);
	
	@Query("SELECT AVG(obj.score) FROM Test obj WHERE "
			+ "obj.subject = :subject AND "
			+ "UPPER(obj.name) LIKE UPPER(:name)")
	Double getAvgScoreFromTest(Subject subject, String name);
	
	@Query("SELECT obj FROM Test obj WHERE "
			+ "(:user MEMBER OF obj.students.parents) AND "
			+ "(obj.subject = :subject) "
			+ "ORDER BY obj.date DESC")
	Page<Test> getTestsFromChildrenSubject(User user, Subject subject, Pageable pageable);
	
	@Query("SELECT obj.score FROM Test obj WHERE "
			+ "(:user MEMBER OF obj.students) AND "
			+ "UPPER(obj.name) LIKE UPPER(:name)")
	Double getScoreFromTest(User user, String name);
	
	@EntityGraph(attributePaths = "students")
    Optional<Test> findById(Long id);
}
