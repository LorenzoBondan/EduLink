package com.projects.EduLink.resources;

import java.net.URI;

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

import com.projects.EduLink.dto.NoteDTO;
import com.projects.EduLink.services.NoteService;

@RestController
@RequestMapping(value = "/notes")
public class NoteResource {

	@Autowired
	private NoteService service;
	
	@GetMapping
	public ResponseEntity<Page<NoteDTO>> findAll(Pageable pageable)	{		
		Page<NoteDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<NoteDTO> findById(@PathVariable Long id) {
		NoteDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<NoteDTO> insert (@RequestBody NoteDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<NoteDTO> update(@PathVariable Long id, @RequestBody NoteDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<NoteDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
