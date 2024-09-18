package com.sithuhantun.game_ranking_system.dao;

import com.sithuhantun.game_ranking_system.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface RoleRepository extends JpaRepository<Role, Long> {
}
