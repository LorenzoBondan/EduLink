package com.projects.EduLink.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "tb_user")
public class User implements UserDetails, Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	@Column(unique = true)
	private String email;
	private String password;
	@Column(columnDefinition = "TEXT")
	private String imgUrl;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_parent_childen",
				joinColumns = @JoinColumn(name = "parent_id"), 
				inverseJoinColumns = @JoinColumn(name = "children_id"))
	private Set<User> parents = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "parents")
	private Set<User> children = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_user_role",
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<Notification> notifications = new ArrayList<>();
	
	@OneToMany(mappedBy = "sender", fetch = FetchType.EAGER)
	private List<Message> messagesSent = new ArrayList<>();
	
	@OneToMany(mappedBy = "receiver", fetch = FetchType.EAGER)
	private List<Message> messagesReceived = new ArrayList<>();
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "students")
	private Set<Subject> subjectsSubscribed = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_user_test",
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "test_id"))
	private Set<Test> userTests = new HashSet<>();
	
	@OneToMany(mappedBy = "teacher", fetch = FetchType.EAGER)
	private List<Subject> subjectsTaught = new ArrayList<>();
	
	@OneToMany(mappedBy = "teacher", fetch = FetchType.EAGER)
	private List<Note> notes = new ArrayList<>();
	
	public User() {
	}
	
	public User(Long id, String name, String email, String password, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.imgUrl = imgUrl;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<Notification> getNotifications() {
		return notifications;
	}

	public List<Message> getMessagesSent() {
		return messagesSent;
	}

	public List<Message> getMessagesReceived() {
		return messagesReceived;
	}

	public Set<User> getParents() {
		return parents;
	}

	public Set<User> getChildren() {
		return children;
	}

	public Set<Subject> getSubjectsSubscribed() {
		return subjectsSubscribed;
	}

	public Set<Test> getUserTests() {
		return userTests;
	}

	public List<Subject> getSubjectsTaught() {
		return subjectsTaught;
	}

	public List<Note> getNotes() {
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
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}
	
	public Set<Role> getRoles() {
		return roles;
	}

	/// ---------- METODOS GERADOS PELO IMPLEMENTS USERDETAILS
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// PERCORRER CADA ELEMENTO DA LISTA DE ROLES E CONVERTER ELE PARA GRANTEDAUTHOTIRY
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getAuthority()))
				.collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return email;
	}
	

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	// MÉTODO USADO PARA O SERVICE AUTHSERVICE, PARA SABER SE O USUÁRIO LOGADO É ADMIN
	public boolean hasRole(String roleName) {
		for (Role role : roles) {
			if(role.getAuthority().equals(roleName)) {
				return true; // ENCONTROU O QUE ESTAVA PROCURANDO
			}
		}
		return false;
	}
}
