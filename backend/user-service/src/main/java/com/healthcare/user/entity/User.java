package com.healthcare.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@AttributeOverride(name = "id", column = @Column(name = "user_id"))

public class User extends BaseEntity {

	@Column(name="first_name",length = 30, nullable = false)
	private String firstName;

	@Column(name="last_name",length = 40, nullable = false)
	private String  lastName;

	@Column(length = 50,unique = true, nullable = false)
	private String email;

	@Column(length = 300,nullable = false)
	private String password;

	@Column(unique = true,length = 14)
	private String phone;

	@Column(nullable = false)
	private String gender;

	@Column(nullable = false)

	private LocalDate dob;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Lob
	private byte[] image;
	@Column(length = 6)
	private String otp;

	@Column(nullable = false)
	private boolean verified = false;



	

	public User(String firstName, String lastName, LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
	}
}
