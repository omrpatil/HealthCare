package com.healthcare.doctor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "doctor_specializations",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"doctor_id", "specialization_id"}
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DoctorSpecialization extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialization_id", nullable = false)
    private Specialization specialization;

    @Column(nullable = false)
    private int experienceYears;
}
