package com.sithuhantun.game_ranking_system.controller;

import com.sithuhantun.game_ranking_system.dto.TopTenClan;
import com.sithuhantun.game_ranking_system.model.Clan;
import com.sithuhantun.game_ranking_system.model.User;
import com.sithuhantun.game_ranking_system.service.ClanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api2/clans")
public class ClanController {
    private ClanService clanService;

    @Autowired
    public ClanController(ClanService clanService) {
        this.clanService = clanService;
    }

    @GetMapping
    public Page<List<Clan>> getAllClansByClanName(@RequestParam("name") String searchValue, @RequestParam int page, @RequestParam int size) {
        return clanService.findAllByClanName(searchValue, page, size);
    }

    @GetMapping("/{name}")
    public boolean checkClanName(@PathVariable String name) {
        return clanService.findByName(name) == null;
    }

    @GetMapping("getTotalMembersByClanId")
    public int getTotalMembersByClanId(@RequestParam("id") Long clanId) {
        return clanService.findById(clanId).getPlayerList().size();
    }

    @GetMapping("getTotalTrophiesByClanId")
    public long getTotalTrophiesByClanId(@RequestParam("id") Long clanId) {
        long totalTrophies = 0;
        List<User> userList = clanService.findById(clanId).getPlayerList();
        for (User user : userList) {
            totalTrophies += user.getTrophies();
        }
        return totalTrophies;
    }

    @GetMapping("/getClansTopTen")
    public List<TopTenClan> getClansTopTen() {
        return clanService.getClansTopTen();
    }
}
