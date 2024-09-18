package com.sithuhantun.game_ranking_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "trophies")
    private long trophies;

    @ManyToOne(fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST, //CascadeType.MERGE,
                        CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "clan_id")
    private Clan clan;

    @ManyToOne(cascade = {CascadeType.PERSIST, //CascadeType.MERGE,
                        CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "clan_rank_id")
    private ClanRank clanRank;

    @ManyToOne(cascade = {CascadeType.PERSIST, //CascadeType.MERGE,
                            CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "role_id")
    private Role role;

//    @OneToMany(fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL)
//    @JoinColumn(name = "battle_log_id")
//    private List<BattleLog> battleLogs;

    public User(String firstName
            , String lastName
            , String email
            , String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.trophies = 0;
    }
}
