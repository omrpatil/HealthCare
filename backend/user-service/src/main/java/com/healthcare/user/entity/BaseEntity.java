package com.healthcare.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
@ToString
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreationTimestamp // to specify creation date | time | TS
    @Column(name = "created_on")
    private LocalDate createdOn;
    @UpdateTimestamp //to specify updation date | time | TS
    @Column(name="last_updated")
    private LocalDateTime lastUpdated;

}