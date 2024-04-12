package com.example.sprint2.repository;

import com.example.sprint2.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IRoleRepository extends JpaRepository<Role, Long> {
}
