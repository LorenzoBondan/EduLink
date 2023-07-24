package com.projects.EduLink.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.EduLink.entities.Message;

public class MessageDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String text;
	private LocalDateTime moment;
	private Boolean read;
	private Long senderId;
	private Long receiverId;
	
	public MessageDTO() {}

	public MessageDTO(Long id, String text, LocalDateTime moment, Boolean read, Long senderId, Long receiverId) {
		super();
		this.id = id;
		this.text = text;
		this.moment = moment;
		this.read = read;
		this.senderId = senderId;
		this.receiverId = receiverId;
	}
	
	public MessageDTO(Message entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.moment = entity.getMoment();
		this.read = entity.getRead();
		this.senderId = entity.getSender().getId();
		this.receiverId = entity.getReceiver().getId();
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

	public Boolean getRead() {
		return read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	public Long getSenderId() {
		return senderId;
	}

	public void setSenderId(Long senderId) {
		this.senderId = senderId;
	}
	
	public Long getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(Long receiverId) {
		this.receiverId = receiverId;
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
		MessageDTO other = (MessageDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
