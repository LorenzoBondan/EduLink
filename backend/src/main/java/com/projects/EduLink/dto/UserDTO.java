package com.projects.EduLink.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.projects.EduLink.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	@Email(message = "Favor entrar com um email válido")
	private String email;
	private String imgUrl;
	
	private List<RoleDTO> roles = new ArrayList<>();
	
	private List<NotificationDTO> notifications = new ArrayList<>(); 
	
	private List<Long> parentsId = new ArrayList<>();
	
	private List<Long> childrenId = new ArrayList<>();
	
	private List<MessageDTO> messagesSent = new ArrayList<>();
	
	private List<MessageDTO> messagesReceived = new ArrayList<>();
	
	private List<Long> subjectsSubscribedId = new ArrayList<>();
	
	private List<Long> subjectsTaughtId = new ArrayList<>();
	
	private List<TestDTO> tests = new ArrayList<>();
	
	public UserDTO() {}

	public UserDTO(Long id, String name, String email, String password, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
	}
	
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();
		
		entity.getRoles().forEach(rol -> this.roles.add(new RoleDTO(rol)));
		entity.getNotifications().forEach(not -> this.notifications.add(new NotificationDTO(not)));
		entity.getParents().forEach(par -> this.parentsId.add(par.getId()));
		entity.getChildren().forEach(chi -> this.childrenId.add(chi.getId()));
		entity.getMessagesSent().forEach(mes -> this.messagesSent.add(new MessageDTO(mes)));
		entity.getMessagesReceived().forEach(mes -> this.messagesReceived.add(new MessageDTO(mes)));
		entity.getSubjectsSubscribed().forEach(sub -> this.subjectsSubscribedId.add(sub.getId()));
		entity.getSubjectsTaught().forEach(sub -> this.subjectsTaughtId.add(sub.getId()));
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<RoleDTO> getRoles() { 
		return roles;
	}

	public List<NotificationDTO> getNotifications() {
		return notifications;
	}

	public List<Long> getParentsId() {
		return parentsId;
	}

	public List<Long> getChildrenId() {
		return childrenId;
	}

	public List<MessageDTO> getMessagesSent() {
		return messagesSent;
	}

	public List<MessageDTO> getMessagesReceived() {
		return messagesReceived;
	}

	public List<Long> getSubjectsSubscribedId() {
		return subjectsSubscribedId;
	}

	public List<Long> getSubjectsTaughtId() {
		return subjectsTaughtId;
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
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
}
