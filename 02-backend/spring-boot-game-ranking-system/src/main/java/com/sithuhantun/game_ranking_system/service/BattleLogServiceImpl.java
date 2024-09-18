package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dao.BattleLogRepository;
import com.sithuhantun.game_ranking_system.dao.RoleRepository;
import com.sithuhantun.game_ranking_system.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BattleLogServiceImpl implements BattleLogService{
    private BattleLogRepository battleLogRepository;

    @Autowired
    public BattleLogServiceImpl(BattleLogRepository battleLogRepository) {
        this.battleLogRepository = battleLogRepository;
    }

    @Override
    public Long getBattleWonByUserId(Long userId) {
        return battleLogRepository.getBattleWonByUserId(userId);
    }
}
