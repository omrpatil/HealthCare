package com.healthcare.doctor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "specializations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Specialization extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;
}
