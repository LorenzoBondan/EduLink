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

import com.projects.EduLink.dto.SubjectDTO;
import com.projects.EduLink.dto.TestDTO;
import com.projects.EduLink.dto.UserDTO;
import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;
import com.projects.EduLink.repositories.SubjectRepository;
import com.projects.EduLink.repositories.TestRepository;
import com.projects.EduLink.repositories.UserRepository;
import com.projects.EduLink.services.exceptions.DataBaseException;
import com.projects.EduLink.services.exceptions.ResourceNotFoundException;

@Service
public class SubjectService {

	@Autowired
	private SubjectRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TestRepository testRepository;

	@Transactional(readOnly = true)
	public Page<SubjectDTO> findAllPaged(Pageable pageable) {
		Page<Subject> list = repository.findAll(pageable);
		return list.map(x -> new SubjectDTO(x));
	}

	@Transactional(readOnly = true)
	public SubjectDTO findById(Long id) {
		Optional<Subject> obj = repository.findById(id);
		Subject entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new SubjectDTO(entity);
	}

	@Transactional
	public SubjectDTO insert(SubjectDTO dto) {
		Subject entity = new Subject();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectDTO(entity);
	}

	@Transactional
	public SubjectDTO update(Long id, SubjectDTO dto) {
		try {
			Subject entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new SubjectDTO(entity);
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
	
	private void copyDtoToEntity(SubjectDTO dto, Subject entity) {
		entity.setName(dto.getName());
		entity.setTeam(dto.getTeam());
		entity.setImgUrl(dto.getImgUrl());
		entity.setTeacher(userRepository.getOne(dto.getTeacherId()));
		
		for(UserDTO studentDto : dto.getStudents()) {
			User student = userRepository.getOne(studentDto.getId());
			entity.getStudents().add(student);
		}
		
		for(TestDTO testDto : dto.getTests()) {
			Test test = testRepository.getOne(testDto.getId());
			entity.getTests().add(test);
		}
		
	}
}
