package com.projects.EduLink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.EduLink.entities.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note,Long>{

}
