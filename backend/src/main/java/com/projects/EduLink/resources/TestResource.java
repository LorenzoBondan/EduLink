package com.projects.EduLink.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.EduLink.dto.TestDTO;
import com.projects.EduLink.services.TestService;

@RestController
@RequestMapping(value = "/tests")
public class TestResource {

	@Autowired
	private TestService service;
	
	@GetMapping
	public ResponseEntity<Page<TestDTO>> findAll(Pageable pageable)	{		
		Page<TestDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/subject/{subjectId}")
	public ResponseEntity<Page<TestDTO>> findTestsFromStudentSubjectTeam(@PathVariable Long subjectId, Pageable pageable){		
		Page<TestDTO> list = service.findTestsFromStudentSubjectTeam(subjectId, pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<TestDTO> findById(@PathVariable Long id) {
		TestDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@PostMapping
	public ResponseEntity<TestDTO> insert (@RequestBody TestDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<TestDTO> update(@PathVariable Long id, @RequestBody TestDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<TestDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
