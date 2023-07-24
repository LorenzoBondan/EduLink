package com.projects.EduLink.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.EduLink.entities.Test;

public class TestDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private Double points;
	private Double score;
	private LocalDateTime date;
	private Long subjectId;
	
	private List<Long> studentsId = new ArrayList<>();
	
	public TestDTO() {}
	
	public TestDTO(Test entity) {
		this.id = entity.getId();
		this.points = entity.getPoints();
		this.name = entity.getName();
		this.score = entity.getScore();
		this.date = entity.getDate();
		this.subjectId = entity.getSubject().getId();
		
		entity.getStudents().forEach(student -> this.studentsId.add(student.getId()));
	}

	public TestDTO(Long id, String name, Double score, LocalDateTime date, Long subjectId, Double points) {
		super();
		this.id = id;
		this.name = name;
		this.points = points;
		this.score = score;
		this.date = date;
		this.subjectId = subjectId;
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

	public Double getPoints() {
		return points;
	}

	public void setPoints(Double points) {
		this.points = points;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public List<Long> getStudentsId() {
		return studentsId;
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
		TestDTO other = (TestDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
