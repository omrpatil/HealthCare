package com.healthcare.doctor.controller;

import com.healthcare.doctor.entity.Doctor;
import com.healthcare.doctor.dto.DoctorCardDTO;
import com.healthcare.doctor.dto.DoctorResponseDTO;
import com.healthcare.doctor.service.DoctorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // CREATE DOCTOR
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) {

        Doctor savedDoctor = doctorService.createDoctor(doctor);

        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

   

    // GET DOCTOR BY USER ID (important in microservices)
    @GetMapping("/user/{userId}")
    public ResponseEntity<Doctor> getDoctorByUserId(@PathVariable Long userId) {

        Doctor doctor = doctorService.getDoctorByUserId(userId);

        return ResponseEntity.ok(doctor);
    }

    // GET ALL DOCTORS
 // GET ALL DOCTORS OR BY SPECIALIZATION
 // GET ALL DOCTORS OR BY SPECIALIZATION
    

    @GetMapping
    public ResponseEntity<List<DoctorCardDTO>> getDoctors(
            @RequestParam(required = false) String specialization) {

        return ResponseEntity.ok(
            doctorService.getDoctorCards(specialization)
        );
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponseDTO> getDoctorById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorService.getDoctorResponseById(id)
        );
    }



    
    

}
