package com.healthcare.doctor.service.impl;

import com.healthcare.doctor.entity.Specialization;
import com.healthcare.doctor.repository.SpecializationRepository;
import com.healthcare.doctor.service.SpecializationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecializationServiceImpl implements SpecializationService {

    private final SpecializationRepository specializationRepository;

    public SpecializationServiceImpl(SpecializationRepository specializationRepository) {
        this.specializationRepository = specializationRepository;
    }

    @Override
    public List<Specialization> getAllSpecializations() {
        return specializationRepository.findAll();
    }
}
