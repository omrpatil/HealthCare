package com.healthcare.doctor.dto;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponseDTO {

    private Long doctorId;
    private String doctorName;
    private BigDecimal consultationFee;
    private String location;
}
