package com.sithuhantun.game_ranking_system.dto;

import com.sithuhantun.game_ranking_system.model.Role;
import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
}
