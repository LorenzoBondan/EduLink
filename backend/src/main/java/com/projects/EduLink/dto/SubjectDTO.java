package com.projects.EduLink.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.EduLink.entities.Subject;

public class SubjectDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String team;
	private String imgUrl;
	private Long teacherId;
	
	private List<UserDTO> students = new ArrayList<>();
	
	private List<TestDTO> tests = new ArrayList<>();
	
	private List<NoteDTO> notes = new ArrayList<>();
	
	public SubjectDTO() {}

	public SubjectDTO(Long id, String name, String team, String imgUrl, Long teacherId) {
		super();
		this.id = id;
		this.name = name;
		this.team = team;
		this.teacherId = teacherId;
		this.imgUrl = imgUrl;
	}
	
	public SubjectDTO(Subject entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.team = entity.getTeam();
		this.imgUrl = entity.getImgUrl();
		this.teacherId = entity.getTeacher().getId();
		
		entity.getStudents().forEach(stu -> this.students.add(new UserDTO(stu)));
		entity.getTests().forEach(test -> this.tests.add(new TestDTO(test)));
		entity.getNotes().forEach(note -> this.notes.add(new NoteDTO(note)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}

	public List<UserDTO> getStudents() {
		return students;
	}

	public List<TestDTO> getTests() {
		return tests;
	}

	public List<NoteDTO> getNotes() {
		return notes;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SubjectDTO other = (SubjectDTO) obj;
		return Objects.equals(id, other.id);
	}
}
