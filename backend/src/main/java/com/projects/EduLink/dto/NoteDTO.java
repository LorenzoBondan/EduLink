package com.projects.EduLink.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.EduLink.entities.Note;

public class NoteDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String text;
	private LocalDateTime moment;
	private Long teacherId;
	private Long subjectId;
	
	public NoteDTO() {}
	
	public NoteDTO(Note entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.moment = entity.getMoment();
		this.teacherId = entity.getTeacher().getId();
		this.subjectId = entity.getSubject().getId();
	}

	public NoteDTO(Long id, String text, LocalDateTime moment, Long teacherId, Long subjectId) {
		super();
		this.id = id;
		this.text = text;
		this.moment = moment;
		this.teacherId = teacherId;
		this.subjectId = subjectId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public LocalDateTime getMoment() {
		return moment;
	}

	public void setMoment(LocalDateTime moment) {
		this.moment = moment;
	}

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
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
		NoteDTO other = (NoteDTO) obj;
		return Objects.equals(id, other.id);
	}
}
