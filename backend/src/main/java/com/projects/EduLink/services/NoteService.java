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

import com.projects.EduLink.dto.NoteDTO;
import com.projects.EduLink.entities.Note;
import com.projects.EduLink.repositories.NoteRepository;
import com.projects.EduLink.repositories.SubjectRepository;
import com.projects.EduLink.repositories.UserRepository;
import com.projects.EduLink.services.exceptions.DataBaseException;
import com.projects.EduLink.services.exceptions.ResourceNotFoundException;

@Service
public class NoteService {

	@Autowired
	private NoteRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;

	@Transactional(readOnly = true)
	public Page<NoteDTO> findAllPaged(Pageable pageable) {
		Page<Note> list = repository.findAll(pageable);
		return list.map(x -> new NoteDTO(x));
	}

	@Transactional(readOnly = true)
	public NoteDTO findById(Long id) {
		Optional<Note> obj = repository.findById(id);
		Note entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new NoteDTO(entity);
	}

	@Transactional
	public NoteDTO insert(NoteDTO dto) {
		Note entity = new Note();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new NoteDTO(entity);
	}

	@Transactional
	public NoteDTO update(Long id, NoteDTO dto) {
		try {
			Note entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new NoteDTO(entity);
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
	
	private void copyDtoToEntity(NoteDTO dto, Note entity) {
		entity.setText(dto.getText());
		entity.setMoment(dto.getMoment());
		entity.setSubject(subjectRepository.getOne(dto.getSubjectId()));
		entity.setTeacher(userRepository.getOne(dto.getTeacherId()));
	}
}
