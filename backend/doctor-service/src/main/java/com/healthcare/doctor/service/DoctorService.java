package com.healthcare.doctor.service;

import com.healthcare.doctor.dto.DoctorCardDTO;
import com.healthcare.doctor.dto.DoctorResponseDTO;
import com.healthcare.doctor.entity.Doctor;

import java.util.List;

public interface DoctorService {

    Doctor createDoctor(Doctor doctor);

    Doctor getDoctorById(Long doctorId);

    Doctor getDoctorByUserId(Long userId);

    List<Doctor> getAllDoctors();

    List<DoctorCardDTO> getDoctorCards(String specialization);

    // ✅ ADD / FIX THIS
    DoctorResponseDTO getDoctorResponseById(Long doctorId);
}
