package com.projects.EduLink.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.EduLink.dto.MessageDTO;
import com.projects.EduLink.services.MessageService;

@RestController
@RequestMapping(value = "/messages")
public class MessageResource {
	
	@Autowired
	private MessageService service;
	
	@GetMapping(value = "/{receiverId}")
	public ResponseEntity<Page<MessageDTO>> messagesBySenderAndReceiver(@PathVariable Long receiverId, Pageable pageable) {
		Page<MessageDTO> page = service.messagesBySenderAndReceiver(receiverId, pageable);
		return ResponseEntity.ok().body(page);
	}
	
	@PostMapping
	public ResponseEntity<MessageDTO> insert (@RequestBody MessageDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}/read")
	public ResponseEntity<MessageDTO> updateToRead(@PathVariable Long id)	{
		MessageDTO newDto = service.updateToRead(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<MessageDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(value = "/{receiverId}/unread")
	public Integer unreadMessagesBySenderAndReceiver(@PathVariable Long receiverId) {
		Integer unreadMessages = service.messagesUnreadBySenderAndReceiver(receiverId);
		return unreadMessages;
	}
	
	@GetMapping(value = "/{receiverId}/lastMessage")
	public ResponseEntity<List<MessageDTO>> findLastMessage(@PathVariable Long receiverId, Pageable pageable) {
		List<MessageDTO> page = service.findLatestMessage(receiverId, pageable);
		return ResponseEntity.ok().body(page);
	}

}
