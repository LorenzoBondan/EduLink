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
	private Long teacherId;
	
	private List<UserDTO> students = new ArrayList<>();
	
	private List<TestDTO> tests = new ArrayList<>();
	
	public SubjectDTO() {}

	public SubjectDTO(Long id, String name, String team, Long teacherId) {
		super();
		this.id = id;
		this.name = name;
		this.team = team;
		this.teacherId = teacherId;
	}
	
	public SubjectDTO(Subject entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.team = entity.getTeam();
		this.teacherId = entity.getTeacher().getId();
		
		entity.getStudents().forEach(stu -> this.students.add(new UserDTO(stu)));
		entity.getTests().forEach(test -> this.tests.add(new TestDTO(test)));
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
