package com.healthcare.doctor.repository;

import com.healthcare.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.healthcare.doctor.dto.DoctorCardDTO;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByUserId(Long userId);
    
    // Find doctors by specialization name
    @Query("""
    		SELECT new com.healthcare.doctor.dto.DoctorCardDTO(
    		    d.id,
    		    d.doctorName,
    		    COALESCE(s.name, 'General'),
    		    d.location,
    		    d.consultationFee,
    		    d.rating,
    		    d.doctorImage
    		)
    		FROM Doctor d
    		LEFT JOIN d.specializations ds
    		LEFT JOIN ds.specialization s
    		WHERE (:spec IS NULL OR LOWER(s.name) = LOWER(:spec))
    		""")
    		List<DoctorCardDTO> findDoctorCards(@Param("spec") String spec);

    
}
