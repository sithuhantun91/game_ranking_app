package com.sithuhantun.game_ranking_system.controller;

import com.sithuhantun.game_ranking_system.dao.BattleLogRepository;
import com.sithuhantun.game_ranking_system.dao.UserRepository;
import com.sithuhantun.game_ranking_system.model.*;
import com.sithuhantun.game_ranking_system.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private UserService userService;
    private RoleService roleService;
    private ClanService clanService;
    private ClanRankService clanRankService;
    private BattleLogRepository battleLogRepository;

    @Autowired
    public UserController(UserService userService,
                          RoleService roleService,
                          ClanService clanService,
                          ClanRankService clanRankService,
                          BattleLogRepository battleLogRepository, UserRepository userRepository) {
        this.userService = userService;
        this.roleService = roleService;
        this.clanService = clanService;
        this.clanRankService = clanRankService;
        this.battleLogRepository = battleLogRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        // assign player role for first user creation
        user.setRole(roleService.findById(1L));
        user.setClan(null);
        user.setClanRank(null);
        User dbUser = userService.save(user);
    }

    @GetMapping("/getRoleByUserId")
    public Role getRoleByUserId(@RequestParam Long id) {
        return userService.getRoleByUserId(id);
    }

    @GetMapping("/getClanByUserId")
    public Clan getClanByUserId(@RequestParam Long id) {
        return userService.getClanByUserId(id);
    }

    @GetMapping("/getClanRankByUserId")
    public ClanRank getClanRankByUserId(@RequestParam Long id) {
        return userService.getClanRankByUserId(id);
    }

    @GetMapping
    public Page<List<User>> getAllUsers(@RequestParam int page, @RequestParam int size) {
        return userService.findAll(page, size);
    }

    @GetMapping("/getAllUsersByClanId")
    public Page<List<User>> getAllUsersByClanId(@RequestParam Long clanId, @RequestParam int page, @RequestParam int size) {
        return userService.findAllByClanId(clanId, page, size);
    }

    @GetMapping("/getOtherPlayer")
    public User getOtherPlayer(@RequestParam Long currentUserId) {
        User dbUser = userService.findRandomUser(currentUserId);
        return dbUser;
    }

    @GetMapping("/getUsersTopTen")
    public Page<List<User>> getUsersTopTen() {
        return userService.findUsersTopTen();
    }

    @GetMapping("/getUserIdByEmailAndPassword")
    public Long getUserIdByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        return userService.getUserIdByEmailAndPassword(email, password);
    }

    @GetMapping("/checkUserByEmail")
    public Boolean checkUserByEmail(@RequestParam String email) {
        User dbUser = userRepository.findByEmail(email);
        return dbUser != null;
    }

    @PutMapping
    public void updateUser(@RequestBody User user) {
        //user.setClan(userService.getClanByUserId(user.getId()));
        //user.setClanRank(userService.getClanRankByUserId(user.getId()));
        User dbUser = userService.save(user);
    }

    @PutMapping("/leaveClan")
    public void leaveClan(@RequestBody User user) {
        // unlink clan
        User dbUser = userService.findById(user.getId());
        Long dbClanId = dbUser.getClan().getId();
        dbUser.setClan(null);
        dbUser.setClanRank(null);
        userService.save(dbUser);

        List<User> dbUserList = userService.findAllByClanId(dbClanId);
        if(dbUserList.isEmpty()) {
            clanService.deleteById(dbClanId);
        }
        else if(dbUserList.size() > 1) {
            User u = dbUserList.getFirst();
            if(u.getClanRank().getId() == 2 || u.getClanRank().getId() == 3) {
                u.setClanRank(clanRankService.findById(1L));
                userService.save(u);
            }
        }
    }

    @PutMapping("/joinClan")
    public void joinClan(@RequestBody User user) {
        System.out.println(user);
        Long id = user.getId();
        Long clanId = user.getClan().getId();
        Long clanRankId = user.getClanRank().getId();

        User dbUser = userService.findById(id);
        if (dbUser == null) {
            throw new RuntimeException("User with id " + id + " not found");
        }

        Clan dbClan = clanService.findById(clanId);
        if (dbClan == null) {
            throw new RuntimeException("Clan with id " + clanId + " not found");
        }
        dbUser.setClan(dbClan);

        ClanRank dbClanRank = clanRankService.findById(clanRankId);
        if (dbClanRank == null) {
            throw new RuntimeException("Clan Rank with id " + clanRankId + " not found");
        }
        dbUser.setClanRank(dbClanRank);
        userService.save(dbUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        User dbUser = userService.findById(userId);
        dbUser.setClan(null);
        dbUser.setClanRank(null);
        dbUser.setRole(null);
        userService.save(dbUser);

        List<BattleLog> dbBattleLogs = this.battleLogRepository.findAllByPlayer1IdOrPlayer2IdOrderByLogTimeDesc(userId, userId);

        for (BattleLog dbBattleLog : dbBattleLogs) {
            battleLogRepository.delete(dbBattleLog);
        }

        return ResponseEntity.noContent().build();
    }
}