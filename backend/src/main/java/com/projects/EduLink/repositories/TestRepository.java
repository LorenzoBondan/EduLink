package com.projects.EduLink.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;

@Repository
public interface TestRepository extends JpaRepository<Test,Long>{

	@Query("SELECT obj FROM Test obj WHERE "
			+ "(obj.students CONTAINS(:user)) AND "
			+ "(obj.subject = :subject) AND "
			+ "(obj.subject.team = :team) "
			+ "ORDER BY obj.date DESC")
	Page<Test> getTestsFromStudentSubjectTeam(User user, Subject subject, String team, Pageable pageable);
}
