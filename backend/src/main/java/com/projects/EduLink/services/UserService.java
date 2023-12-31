package com.projects.EduLink.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.EduLink.dto.MessageDTO;
import com.projects.EduLink.dto.NoteDTO;
import com.projects.EduLink.dto.NotificationDTO;
import com.projects.EduLink.dto.RoleDTO;
import com.projects.EduLink.dto.TestDTO;
import com.projects.EduLink.dto.UserDTO;
import com.projects.EduLink.dto.UserInsertDTO;
import com.projects.EduLink.dto.UserUpdateDTO;
import com.projects.EduLink.entities.Message;
import com.projects.EduLink.entities.Note;
import com.projects.EduLink.entities.Notification;
import com.projects.EduLink.entities.Role;
import com.projects.EduLink.entities.Subject;
import com.projects.EduLink.entities.Test;
import com.projects.EduLink.entities.User;
import com.projects.EduLink.repositories.MessageRepository;
import com.projects.EduLink.repositories.NoteRepository;
import com.projects.EduLink.repositories.NotificationRepository;
import com.projects.EduLink.repositories.RoleRepository;
import com.projects.EduLink.repositories.SubjectRepository;
import com.projects.EduLink.repositories.TestRepository;
import com.projects.EduLink.repositories.UserRepository;
import com.projects.EduLink.services.exceptions.DataBaseException;
import com.projects.EduLink.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class); 

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	@Autowired
	private TestRepository testRepository;
	
	@Autowired
	private NoteRepository noteRepository;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(String name, Pageable pageable) {
		Page<User> list = repository.find(name, pageable);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findStudents(Pageable pageable) {
		Page<User> list = repository.findStudents(pageable);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findTeachers(Pageable pageable) {
		Page<User> list = repository.findTeachers(pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		Optional<User> obj = Optional.ofNullable(repository.findByEmail(email));
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);

		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
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

	private void copyDtoToEntity(UserDTO dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setImgUrl(dto.getImgUrl());

		for (RoleDTO rolDto : dto.getRoles()) {
			Role role = roleRepository.getOne(rolDto.getId());
			entity.getRoles().add(role);
		}
		
		for (NotificationDTO notDto : dto.getNotifications()) {
			Notification notification = notificationRepository.getOne(notDto.getId());
			entity.getNotifications().add(notification);
		}
		
		for (Long parentId : dto.getParentsId()) {
			User parent = repository.getOne(parentId);
			entity.getParents().add(parent);
		}
		
		for (Long childrenId : dto.getChildrenId()) {
			User children = repository.getOne(childrenId);
			entity.getChildren().add(children);
		}
		
		for (MessageDTO mesDto : dto.getMessagesSent()) {
			Message message = messageRepository.getOne(mesDto.getId());
			entity.getMessagesSent().add(message);
		}
		
		for (MessageDTO mesDto : dto.getMessagesReceived()) {
			Message message = messageRepository.getOne(mesDto.getId());
			entity.getMessagesReceived().add(message);
		}
		
		for (Long subjectId : dto.getSubjectsSubscribedId()) {
			Subject subject = subjectRepository.getOne(subjectId);
			entity.getSubjectsSubscribed().add(subject);
		}
		
		for (Long subjectId : dto.getSubjectsTaughtId()) {
			Subject subject = subjectRepository.getOne(subjectId);
			entity.getSubjectsTaught().add(subject);
		}
		
		for (TestDTO testDto : dto.getUserTests()) {
			Test t = testRepository.getOne(testDto.getId());
			entity.getUserTests().add(t);
		}
		
		for (NoteDTO noteDto : dto.getNotes()) {
			Note note = noteRepository.getOne(noteDto.getId());
			entity.getNotes().add(note);
		}

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		}
		logger.info("User found: " + username);
		return user;
	}

	
}
