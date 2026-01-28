package com.healthcare.doctor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "doctor_id"))
public class Doctor extends BaseEntity {

    // 🔑 Reference to user-service (ONLY ID, no User entity)
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;
    
    @Column(name = "doctor_name")
    private String doctorName;

    @Column(name = "doctor_image")
    private String doctorImage;


    @Column(nullable = false)
    private String location;

    @Column(name = "consultation_fee", nullable = false)
    private BigDecimal consultationFee;

    private float rating;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorSpecialization> specializations;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorAvailability> availabilitySlots;
}
