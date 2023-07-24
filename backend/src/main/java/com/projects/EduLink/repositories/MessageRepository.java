package com.projects.EduLink.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projects.EduLink.entities.Message;
import com.projects.EduLink.entities.Notification;
import com.projects.EduLink.entities.User;

public interface MessageRepository extends JpaRepository<Notification,Long>{
	
	@Query("SELECT obj FROM Message obj WHERE "
			+ "(obj.sender = :sender) AND "
			+ "(obj.receiver = :receiver) "
			+ "ORDER BY obj.moment DESC")
	Page<Message> getMessagesBySenderAndReceiver(User sender, User receiver, Pageable pageable);

}
