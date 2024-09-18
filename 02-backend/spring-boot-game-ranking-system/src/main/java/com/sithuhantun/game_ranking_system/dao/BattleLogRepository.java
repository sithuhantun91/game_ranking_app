package com.sithuhantun.game_ranking_system.dao;

import com.sithuhantun.game_ranking_system.model.BattleLog;
import com.sithuhantun.game_ranking_system.model.ClanRank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "battleLog", path = "battle-log")
public interface BattleLogRepository extends JpaRepository<BattleLog, Long> {
    Page<List<BattleLog>> findAllByPlayer1IdOrPlayer2IdOrderByLogTimeDesc(Long player1Id, Long player2Id, Pageable pageable);

    List<BattleLog> findAllByPlayer1IdOrPlayer2IdOrderByLogTimeDesc(Long player1Id, Long player2Id);

    Page<List<BattleLog>> findAllByOrderByLogTimeDesc(Pageable pageable);

    @Query("SELECT count(b.winner) FROM BattleLog b WHERE b.winner = :id")
    Long getBattleWonByUserId(@Param("id") Long id);
}
