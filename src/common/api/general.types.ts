export interface TornMinimalAttack {
    code: string;
    timestamp_started: number;
    timestamp_ended: number;
    attacker_id: number;
    attacker_faction: number;
    defender_id: number;
    defender_faction: number;
    result: string; // Could be its own type if really needed.
    stealthed: 0 | 1;
    respect: number;
}

export type TornAttack = TornMinimalAttack & {
    attacker_name: string;
    attacker_factionname: string;
    defender_name: string;
    defender_factionname: string;
    chain: number;
    raid: 0 | 1;
    ranked_war: 0 | 1;
    respect_gain: number;
    respect_loss: number;
    modifiers: {
        fair_fight: number;
        war: 1 | 2;
        retaliation: 1 | 2;
        group_attack: number;
        overseas: 1 | 1.25;
        chain_bonus: number;
    };
};

export interface TornMinimalRevive {
    timestamp: number;
    result: "success" | "failure";
    chance: number;
    reviver_id: number;
    reviver_faction: number;
    target_id: number;
    target_faction: number;
    target_hospital_reason: string;
    target_early_discharge: NumberBoolean;
    target_last_action: {
        status: string; // Could be its own type if really needed.
        timestamp: number;
    };
}

export type TornRevive = TornMinimalRevive & {
    reviver_name: string;
    reviver_factionname: string;
    target_name: string;
    target_factionname: string;
};

export type TornGender = "Male" | "Female" | "Enby";

export type NumberBoolean = 0 | 1;
