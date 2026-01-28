package com.healthcare.doctor.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DoctorCardDTO {

    private Long doctorId;
    private String doctorName;
    private String specialization;
    private String location;
    private BigDecimal consultationFee;
    private float rating;
    private String doctorImage;

    public DoctorCardDTO(
            Long doctorId,
            String doctorName,
            String specialization,
            String location,
            BigDecimal consultationFee,
            float rating,
            String doctorImage
    ) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.specialization = specialization;
        this.location = location;
        this.consultationFee = consultationFee;
        this.rating = rating;
        this.doctorImage = doctorImage;
    }

    // getters only (or Lombok @Getter)
}
