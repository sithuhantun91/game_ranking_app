package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dto.TopTenClan;
import com.sithuhantun.game_ranking_system.model.Clan;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClanService {
    Page<List<Clan>> findAllByClanName(String searchValue, int page, int size);
    Clan findById(Long id);
    List<TopTenClan> getClansTopTen();
    Clan findByName(String name);
    void deleteById(Long id);
}
