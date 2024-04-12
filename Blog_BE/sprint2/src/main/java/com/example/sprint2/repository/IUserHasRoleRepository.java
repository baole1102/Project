package com.example.sprint2.repository;

import com.example.sprint2.model.User;
import com.example.sprint2.model.UserHasRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserHasRoleRepository extends JpaRepository<UserHasRole, Long> {

    List<UserHasRole> findAllByUser(User user);
}
