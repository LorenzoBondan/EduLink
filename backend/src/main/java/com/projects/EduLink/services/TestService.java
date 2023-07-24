package com.projects.EduLink.services;

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
import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;
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

	@Transactional(readOnly = true)
	public Page<TestDTO> findAllPaged(Pageable pageable) {
		Page<Test> list = repository.findAll(pageable);
		return list.map(x -> new TestDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<TestDTO> findTestsFromStudentSubjectTeam(Long subjectId, Pageable pageable) {
		User me = authService.authenticated();
		Subject subject = subjectRepository.getOne(subjectId);
		Page<Test> list = repository.getTestsFromStudentSubjectTeam(me, subject, pageable);
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
		entity = repository.save(entity);
		return new TestDTO(entity);
	}

	@Transactional
	public TestDTO update(Long id, TestDTO dto) {
		try {
			Test entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
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
		Double minScore = repository.getMinScoreFromTest(subject, name);
		return Math.round(minScore * 100.0) / 100.0;
	}
	
	public Double getMaxScore(Long subjectId, String name) {
		Subject subject = subjectRepository.getOne(subjectId);
		Double maxScore = repository.getMaxScoreFromTest(subject, name);
		return Math.round(maxScore * 100.0) / 100.0;
	}
	
	public Double getAvgScore(Long subjectId, String name) {
		Subject subject = subjectRepository.getOne(subjectId);
		Double avgScore = repository.getAvgScoreFromTest(subject, name);
		return Math.round(avgScore * 100.0) / 100.0;
	}
}
