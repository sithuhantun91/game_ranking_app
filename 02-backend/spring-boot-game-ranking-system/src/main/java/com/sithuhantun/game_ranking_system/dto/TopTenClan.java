package com.sithuhantun.game_ranking_system.dto;

import com.sithuhantun.game_ranking_system.model.Clan;
import lombok.Data;

@Data
public class TopTenClan {
    private Clan clan;
    private Long totalTrophies;
    TopTenClan(Clan clan, Long totalTrophies) {
        this.clan = clan;
        this.totalTrophies = totalTrophies;
    }
}
