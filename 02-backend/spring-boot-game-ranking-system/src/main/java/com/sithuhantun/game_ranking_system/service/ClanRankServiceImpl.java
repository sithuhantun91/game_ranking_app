package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dao.ClanRankRepository;
import com.sithuhantun.game_ranking_system.model.ClanRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ClanRankServiceImpl implements ClanRankService {
    ClanRankRepository clanRankRepository;

    @Autowired
    public ClanRankServiceImpl(ClanRankRepository clanRankRepository) {
        this.clanRankRepository = clanRankRepository;
    }

    @Transactional(readOnly = true)
    public ClanRank findById(Long id) {
        Optional<ClanRank> result = clanRankRepository.findById(id);
        ClanRank clanRank = null;
        if (result.isPresent()) {
            clanRank = result.get();
        }
        return clanRank;
    }
}
