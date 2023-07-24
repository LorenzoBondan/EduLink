package com.projects.EduLink.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.EduLink.dto.MessageDTO;
import com.projects.EduLink.entities.Message;
import com.projects.EduLink.entities.User;
import com.projects.EduLink.repositories.MessageRepository;
import com.projects.EduLink.repositories.UserRepository;
import com.projects.EduLink.services.exceptions.ResourceNotFoundException;

@Service
public class MessageService {

	@Autowired
	private MessageRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public Page<MessageDTO> messagesBySenderAndReceiver(User receiver, Pageable pageable){
		User user = authService.authenticated();
		Page<Message> page = repository.getMessagesBySenderAndReceiver(user, receiver, pageable);
		return page.map(x -> new MessageDTO(x));
	}
	
	@Transactional
	public MessageDTO insert(MessageDTO dto) {
		Message entity = new Message();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MessageDTO(entity);
	}
	
	@Transactional
	public MessageDTO updateToRead(Long id) { // Using react-on-screen
		try {
			Message entity = repository.getOne(id);
			entity.setRead(true);
			entity = repository.save(entity);
			return new MessageDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	private void copyDtoToEntity(MessageDTO dto, Message entity) {
		entity.setText(dto.getText());
		entity.setMoment(dto.getMoment());
		entity.setRead(dto.getRead());
		entity.setSender(userRepository.getOne(dto.getSenderId()));
		entity.setReceiver(userRepository.getOne(dto.getReceiverId()));
	}
	
}
