package com.projects.EduLink.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projects.EduLink.entities.Message;
import com.projects.EduLink.entities.User;

public interface MessageRepository extends JpaRepository<Message,Long>{
	
	@Query("SELECT obj FROM Message obj WHERE "
			+ "((obj.sender = :sender) OR (obj.sender = :receiver)) AND "
			+ "((obj.receiver = :receiver) OR (obj.receiver =: sender)) "
			+ "ORDER BY obj.moment ASC")
	Page<Message> getMessagesBySenderAndReceiver(User sender, User receiver, Pageable pageable);

	@Query("SELECT COUNT(obj) FROM Message obj WHERE "
			+ "(obj.sender = :sender) AND "
			+ "(obj.receiver = :receiver) AND "
			+ "obj.read = false")
	Integer getUnreadMessagesBySenderAndReceiver(User sender, User receiver);
}
