package com.sithuhantun.game_ranking_system.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clanRank")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ClanRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    public ClanRank(String name) {
        this.name = name;
    }
}