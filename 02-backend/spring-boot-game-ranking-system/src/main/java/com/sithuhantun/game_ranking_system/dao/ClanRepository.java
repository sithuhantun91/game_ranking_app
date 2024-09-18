package com.sithuhantun.game_ranking_system.dao;

import com.sithuhantun.game_ranking_system.dto.TopTenClan;
import com.sithuhantun.game_ranking_system.model.Clan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "clans", path = "clans")
public interface ClanRepository extends JpaRepository<Clan, Long> {
    Page<List<Clan>> findAllByNameContainingOrderByNameAsc(String name, Pageable pageable);

    @Query("SELECT new com.sithuhantun.game_ranking_system.dto.TopTenClan(c, SUM(u.trophies)) FROM User u JOIN u.clan c GROUP BY u.clan.id ORDER BY u.clan.id LIMIT 10")
    List<TopTenClan> findClansTopTen();

    Clan findByName(String name);
}
