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

import com.projects.EduLink.dto.NoteDTO;
import com.projects.EduLink.entities.Note;
import com.projects.EduLink.entities.Notification;
import com.projects.EduLink.entities.User;
import com.projects.EduLink.repositories.NoteRepository;
import com.projects.EduLink.repositories.NotificationRepository;
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
	
	@Autowired
	private NotificationRepository notificationRepository;

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
		
		// send a notification for the students
		for (User student : entity.getSubject().getStudents()) {
			Notification notification = new Notification();
			notification.setDescription("You have a new note in the subject " + entity.getSubject().getName() + ".");
			LocalDateTime now = LocalDateTime.now();
			notification.setMoment(now);
			notification.setRead(false);
			notification.setUser(student);
			notification = notificationRepository.save(notification);
			// send a notification for the parents
			for(User parent : student.getParents()) {
				Notification notification2 = new Notification();
				notification2.setDescription("Your children " + student.getName() + " have a new note in the subject " + entity.getSubject().getName() + ".");
				notification2.setMoment(now);
				notification2.setRead(false);
				notification2.setUser(parent);
				notification2 = notificationRepository.save(notification2);
			}
		}
		
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
		entity.setTitle(dto.getTitle());
		entity.setText(dto.getText());
		entity.setMoment(dto.getMoment());
		entity.setSubject(subjectRepository.getOne(dto.getSubjectId()));
		entity.setTeacher(userRepository.getOne(dto.getTeacherId()));
	}
}
