package com.sithuhantun.game_ranking_system.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "battleLog")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BattleLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "winner")
    private String winner;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "player1_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User player1;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "player2_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User player2;

    @Column(name = "log_time")
    @CreationTimestamp
    private LocalDateTime logTime;

    public BattleLog(String winner, User player1, User player2, LocalDateTime logTime) {
        this.winner = winner;
        this.player1 = player1;
        this.player2 = player2;
        this.logTime = logTime;
    }
}
