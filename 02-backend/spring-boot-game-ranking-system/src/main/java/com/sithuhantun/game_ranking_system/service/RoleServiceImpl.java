package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dao.RoleRepository;
import com.sithuhantun.game_ranking_system.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }
}
