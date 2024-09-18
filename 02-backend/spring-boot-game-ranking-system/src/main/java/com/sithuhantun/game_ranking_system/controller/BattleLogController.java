package com.sithuhantun.game_ranking_system.controller;

import com.sithuhantun.game_ranking_system.dao.BattleLogRepository;
import com.sithuhantun.game_ranking_system.dao.ClanRepository;
import com.sithuhantun.game_ranking_system.model.BattleLog;
import com.sithuhantun.game_ranking_system.model.User;
import com.sithuhantun.game_ranking_system.service.BattleLogService;
import com.sithuhantun.game_ranking_system.service.ClanServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api2/battle-log")
public class BattleLogController {
    private BattleLogRepository battleLogRepository;
    private BattleLogService battleLogService;

    @Autowired
    public BattleLogController(BattleLogRepository battleLogRepository,
                               BattleLogService battleLogService) {
        this.battleLogRepository = battleLogRepository;
        this.battleLogService = battleLogService;
    }

    @PostMapping
    public void createBattleLog(@RequestBody BattleLog battleLog) {
        System.out.println(battleLog);
        BattleLog dbBattleLog = battleLogRepository.save(battleLog);
    }

    @GetMapping
    public Page<List<BattleLog>> getAllBattleLogByLoginId(@RequestParam Long loginId, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return battleLogRepository.findAllByPlayer1IdOrPlayer2IdOrderByLogTimeDesc(loginId, loginId, pageable);
    }

    @GetMapping("/getAllBattleLog")
    public Page<List<BattleLog>> getAllBattleLog(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return battleLogRepository.findAllByOrderByLogTimeDesc(pageable);
    }

    @GetMapping("getBattleWonByUserId")
    public Long getBattleWonByUserId(@RequestParam Long userId) {
        return battleLogService.getBattleWonByUserId(userId);
    }
}
