package com.sithuhantun.game_ranking_system.dao;

import com.sithuhantun.game_ranking_system.model.ClanRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "clanRank", path = "clan-rank")
public interface ClanRankRepository extends JpaRepository<ClanRank, Long> {
}
