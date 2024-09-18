package com.sithuhantun.game_ranking_system.service;

import com.sithuhantun.game_ranking_system.dao.ClanRepository;
import com.sithuhantun.game_ranking_system.dao.RoleRepository;
import com.sithuhantun.game_ranking_system.dto.TopTenClan;
import com.sithuhantun.game_ranking_system.model.Clan;
import com.sithuhantun.game_ranking_system.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ClanServiceImpl implements ClanService {
    ClanRepository clanRepository;

    @Autowired
    public ClanServiceImpl(ClanRepository clanRepository) {
        this.clanRepository = clanRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<List<Clan>> findAllByClanName(String searchValue, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return clanRepository.findAllByNameContainingOrderByNameAsc(searchValue, pageable);
    }

    @Transactional(readOnly = true)
    public Clan findById(Long id) {
        Optional<Clan> result = clanRepository.findById(id);
        Clan clan = null;
        if (result.isPresent()) {
            clan = result.get();
        }
        return clan;
    }

    @Transactional(readOnly = true)
    public List<TopTenClan> getClansTopTen(){
        List<TopTenClan> list = new ArrayList<>();
        list = clanRepository.findClansTopTen();
        Collections.sort(list, new Comparator<TopTenClan>() {
            @Override
            public int compare(TopTenClan c1, TopTenClan c2) {
                return Long.compare(c1.getTotalTrophies(), c2.getTotalTrophies());
            }
        });
        return list.reversed();
    }

    @Transactional(readOnly = true)
    public Clan findByName(String name) {
        return clanRepository.findByName(name);
    }

    @Transactional
    public void deleteById(Long id){
        clanRepository.deleteById(id);
    }
}
