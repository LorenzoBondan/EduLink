package com.projects.EduLink.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tb_subject")
public class Subject implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String team;
	
	@ManyToOne
    @JoinColumn(name = "teacher_id")
	private User teacher;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_subject_student",
				joinColumns = @JoinColumn(name = "subject_id"), 
				inverseJoinColumns = @JoinColumn(name = "student_id"))
	private Set<User> students = new HashSet<>();
	
	@OneToMany(mappedBy = "subject", fetch = FetchType.EAGER)
	private List<Test> tests = new ArrayList<>();
	
	public Subject() {}

	public Subject(Long id, String name, String team, User teacher) {
		super();
		this.id = id;
		this.name = name;
		this.team = team;
		this.teacher = teacher;
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

	public User getTeacher() {
		return teacher;
	}

	public void setTeacher(User teacher) {
		this.teacher = teacher;
	}

	public Set<User> getStudents() {
		return students;
	}

	public List<Test> getTests() {
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
		Subject other = (Subject) obj;
		return Objects.equals(id, other.id);
	}

}
