package com.projects.EduLink.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.EduLink.dto.TestDTO;
import com.projects.EduLink.entities.Notification;
import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;
import com.projects.EduLink.repositories.NotificationRepository;
import com.projects.EduLink.repositories.SubjectRepository;
import com.projects.EduLink.repositories.TestRepository;
import com.projects.EduLink.repositories.UserRepository;
import com.projects.EduLink.services.exceptions.DataBaseException;
import com.projects.EduLink.services.exceptions.ResourceNotFoundException;

@Service
public class TestService {

	@Autowired
	private TestRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private NotificationRepository notificationRepository;

	@Transactional(readOnly = true)
	public Page<TestDTO> findAllPaged(Pageable pageable) {
		Page<Test> list = repository.findAll(pageable);
		return list.map(x -> new TestDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<TestDTO> findTestsFromStudentSubject(Long subjectId, Pageable pageable) {
		User me = authService.authenticated();
		Subject subject = subjectRepository.getOne(subjectId);
		Page<Test> list = repository.getTestsFromStudentSubject(me, subject, pageable);
		return list.map(x -> new TestDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<TestDTO> findTestsFromChildrenSubject(Long subjectId, Pageable pageable) {
		User me = authService.authenticated();
		Subject subject = subjectRepository.getOne(subjectId);
		Page<Test> list = repository.getTestsFromChildrenSubject(me, subject, pageable);
		return list.map(x -> new TestDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<TestDTO> findTestsFromStudentSubjectTeacher(Long userId, Long subjectId, Pageable pageable) {
		User user = userRepository.getOne(userId);
		Subject subject = subjectRepository.getOne(subjectId);
		Page<Test> list = repository.getTestsFromStudentSubject(user, subject, pageable);
		return list.map(x -> new TestDTO(x));
	}

	@Transactional(readOnly = true)
	public TestDTO findById(Long id) {
		Optional<Test> obj = repository.findById(id);
		Test entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new TestDTO(entity);
	}

	@Transactional
	public TestDTO insert(TestDTO dto) {
		Test entity = new Test();
		copyDtoToEntity(dto, entity);
		
		//send a notification to the students
		for(User student : entity.getStudents()) {
			Notification notification = new Notification();
			notification.setDescription("A new test score has been published for the test " + entity.getName() + " of " + entity.getSubject().getName() + ".");
			LocalDateTime date = LocalDateTime.now();
			notification.setMoment(date);
			notification.setRead(false);
			notification.setUser(student);
			notification = notificationRepository.save(notification);
		}
		
		//send a notification to the parents
		for(User student : entity.getStudents()) {
			for(User parent : student.getParents()) {
				Notification notification = new Notification();
				notification.setDescription("A new test score has been published for the test " + entity.getName() + " of " + entity.getSubject().getName() + " of your children " + student.getName() + ".");
				LocalDateTime date = LocalDateTime.now();
				notification.setMoment(date);
				notification.setRead(false);
				notification.setUser(parent);
				notification = notificationRepository.save(notification);
			}
		}
		
		entity = repository.save(entity);
		return new TestDTO(entity);
	}

	@Transactional
	public TestDTO update(Long id, TestDTO dto) {
		try {
			Test entity = repository.getOne(id);
			Double oldScore = entity.getScore();
			
			copyDtoToEntity(dto, entity);
			
			Double newScore = entity.getScore();
			
			if(oldScore != newScore) {
				//send a notification to the students
				for(User student : entity.getStudents()) {
					Notification notification = new Notification();
					notification.setDescription("Your test score has been updated for the test " + entity.getName() + " of " + entity.getSubject().getName() + ".");
					LocalDateTime date = LocalDateTime.now();
					notification.setMoment(date);
					notification.setRead(false);
					notification.setUser(student);
					notification = notificationRepository.save(notification);
				}
				
				//send a notification to the parents
				for(User student : entity.getStudents()) {
					for(User parent : student.getParents()) {
						Notification notification = new Notification();
						notification.setDescription("The test score has been updated for the test " + entity.getName() + " of " + entity.getSubject().getName() + " of your children " + student.getName() + ".");
						LocalDateTime date = LocalDateTime.now();
						notification.setMoment(date);
						notification.setRead(false);
						notification.setUser(parent);
						notification = notificationRepository.save(notification);
					}
				}
			}
			
			entity = repository.save(entity);
			return new TestDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}
	
	private void copyDtoToEntity(TestDTO dto, Test entity) {
		entity.setName(dto.getName());
		entity.setPoints(dto.getPoints());
		entity.setDate(dto.getDate());
		entity.setScore(dto.getScore());
		entity.setSubject(subjectRepository.getOne(dto.getSubjectId()));
		
		for(Long studentId : dto.getStudentsId()) {
			User student = userRepository.getOne(studentId);
			entity.getStudents().add(student);
		}
	}
	
	public Double getMinScore(Long subjectId, String name) {
		Subject subject = subjectRepository.getOne(subjectId);
		String newName = name.replace(' ', '_');
		Double minScore = repository.getMinScoreFromTest(subject, newName);
		return Math.round(minScore * 100.0) / 100.0;
	}
	
	public Double getMaxScore(Long subjectId, String name) {
		Subject subject = subjectRepository.getOne(subjectId);
		String newName = name.replace(' ', '_');
		Double maxScore = repository.getMaxScoreFromTest(subject, newName);
		return Math.round(maxScore * 100.0) / 100.0;
	}
	
	public Double getAvgScore(Long subjectId, String name) {
		Subject subject = subjectRepository.getOne(subjectId);
		String newName = name.replace(' ', '_');
		Double avgScore = repository.getAvgScoreFromTest(subject, newName);
		return Math.round(avgScore * 100.0) / 100.0;
	}
}
