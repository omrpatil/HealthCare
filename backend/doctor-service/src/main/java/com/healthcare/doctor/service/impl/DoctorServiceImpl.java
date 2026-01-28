package com.healthcare.doctor.service.impl;

import com.healthcare.doctor.entity.Doctor;
import com.healthcare.doctor.dto.DoctorCardDTO;
import com.healthcare.doctor.dto.DoctorResponseDTO;
import com.healthcare.doctor.exception.ResourceNotFoundException;
import com.healthcare.doctor.repository.DoctorRepository;
import com.healthcare.doctor.service.DoctorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor getDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id " + doctorId));

    }

    @Override
    public Doctor getDoctorByUserId(Long userId) {
        return doctorRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found for user id " + userId));
    }
   
    @Override
    public List<DoctorCardDTO> getDoctorCards(String specialization) {

        // ✅ treat "all" as no filter
        if (specialization == null || specialization.equalsIgnoreCase("all")) {
            specialization = null;
        }

        return doctorRepository.findDoctorCards(specialization);
    }


    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public DoctorResponseDTO getDoctorResponseById(Long doctorId) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id " + doctorId));

        DoctorResponseDTO dto = new DoctorResponseDTO();
        dto.setDoctorId(doctor.getId()); // IMPORTANT
        dto.setDoctorName(doctor.getDoctorName());
        dto.setConsultationFee(doctor.getConsultationFee());
        dto.setLocation(doctor.getLocation());

        return dto;
    }


}
