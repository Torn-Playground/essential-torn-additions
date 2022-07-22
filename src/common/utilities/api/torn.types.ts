// noinspection JSUnusedGlobalSymbols

import { NumberBoolean } from "@common/utilities/api/general.types";

export type TornSelection =
    | "bank"
    | "cards"
    | "chainreport"
    | "cityshops"
    | "companies"
    | "competition"
    | "education"
    | "factiontree"
    | "gyms"
    | "honors"
    | "items"
    | "itemstats"
    | "logcategories"
    | "logtypes"
    | "medals"
    | "organisedcrimes"
    | "pawnshop"
    | "pokertables"
    | "properties"
    | "rackets"
    | "raids"
    | "rankedwarreport"
    | "rankedwars"
    | "stats"
    | "stocks"
    | "territory"
    | "territorywars";

export interface TornBank {
    bank: {
        "1w": number;
        "2w": number;
        "1m": number;
        "2m": number;
        "3m": number;
    };
}

export interface TornCards {
    cards: {
        [id: string]: {
            name: string;
            short: number;
            rank: number;
            class: string;
        };
    };
}

export type TornChainReport = {
    chainreport:
        | {
              success: false;
              msg: string;
          }
        | {
              factionID: number;
              chain: number;
              start: number;
              end: number;
              leave: number;
              mug: number;
              hospitalize: number;
              assists: number;
              overseas: number;
              draws: number;
              escapes: number;
              losses: number;
              respect: number;
              targets: number;
              warhits: number;
              besthit: number;
              retaliations: number;
              members: {
                  [user: string]: {
                      userID: number;
                      respect: number;
                      attacks: number;
                      overseas: number;
                      factionID: number;
                      level: number;
                      avg: number;
                      leave: number;
                      mug: number;
                      hosp: number;
                      war: number;
                      bonus: number;
                      assist: number;
                      retal: number;
                      draw: number;
                      escape: number;
                      loss: number;
                  };
              };
              bonuses: Array<{
                  chain: number;
                  attacker: number;
                  defender: number;
                  respect: number;
              }>;
          }
        | Array<never>;
};

export interface TornCityShops {
    cityshops: {
        [id: string]: {
            name: string;
            inventory: {
                [id: string]: {
                    name: string;
                    type: string;
                    price: number;
                    in_stock: number;
                };
            };
        };
    };
}

export interface TornCompanies {
    companies: {
        [id: string]: {
            name: string;
            cost: number;
            default_employees: number;
            positions: {
                [position: string]: {
                    man_required: number;
                    int_required: number;
                    end_required: number;
                    man_gain: number;
                    int_gain: number;
                    end_gain: number;
                    special_ability: string;
                    description: string;
                };
            };
            stock: {
                [item: string]: {
                    cost: "" | number;
                    rrp: number;
                };
            };
            specials: {
                [special: string]: {
                    effect: string;
                    cost: number;
                    rating_required: 1 | 3 | 5 | 7 | 10;
                };
            };
        };
    };
}

export interface TornCompetition {
    competition: null;
} // TODO - implement

export interface TornEducation {
    education: {
        [id: string]: {
            name: string;
            description: string;
            code: string;
            money_cost: number;
            tier: 1 | 2 | 3;
            duration: number;
            results: {
                perk?: Array<string>;
                manual_labor?: Array<string>;
                intelligence?: Array<string>;
                endurance?: Array<string>;
            };
            prerequisites: Array<number>;
        };
    };
}

export interface TornFactionTree {
    factiontree: {
        [id: string]: {
            [id: string]: {
                branch: "Core" | "Criminality" | "Steadfast" | "Fortitude" | "Voracity" | "Toleration" | "Aggression" | "Suppression" | "Excursion";
                name: string;
                ability: string;
                challenge: string;
                base_cost: number;
            };
        };
    };
}

export interface TornGyms {
    gyms: {
        [id: string]: {
            name: string;
            stage: 1 | 2 | 3 | 4 | 0;
            cost: number;
            energy: 5 | 10 | 25 | 50;
            strength: number;
            speed: number;
            defense: number;
            dexterity: number;
            note: string;
        };
    };
}

interface BaseHonor {
    name: string;
    description: string;
    type: number;
}

export interface TornHonors {
    honors: {
        [id: string]:
            | BaseHonor
            | (BaseHonor & {
                  circulation: number;
                  equipped: number;
                  rarity: "Very Common" | "Common" | "Uncommon" | "Limited" | "Rare" | "Very Rare" | "Extremely Rare" | "Unknown Rarity";
              });
    };
}

export interface TornItems {
    items: {
        [id: string]: {
            name: string;
            description: string;
            effect: string;
            requirement: string;
            type: string;
            weapon_type: string | null;
            buy_price: number;
            sell_price: number;
            market_value: number;
            circulation: number;
            image: string;
            coverage?: {
                "Full Body Coverage": number;
                "Heart Coverage": number;
                "Stomach Coverage": number;
                "Chest Coverage": number;
                "Arm Coverage": number;
                "Groin Coverage": number;
                "Leg Coverage": number;
                "Throat Coverage": number;
                "Hand Coverage": number;
                "Foot Coverage": number;
                "Head Coverage": number;
            };
        };
    };
}

export interface TornItemStats {
    ID: number;
    UID: number;
    name: string;
    type: string;
    market_price: number;
    stats: {
        damage: number;
        rounds_fired: number;
        hits: number;
        misses: number;
        reloads: number;
        highest_damage: number;
        finishing_hits: number;
        critical_hits: number;
        first_owner: number;
        time_created: number;
        respect_earned: number;
    };
}

export interface TornLogCategories {
    logcategories: {
        [id: string]: string;
    };
}

export interface TornLogTypes {
    logtypes: {
        [id: string]: string;
    };
}

export interface TornMedals {
    medals: {
        [id: string]: {
            name: string;
            description: string;
            type: "RNK" | "CRM" | "CMT" | "LVL" | "OTR" | "ATK" | "NTW";
            circulation: number;
            rarity: "Very Common" | "Common" | "Uncommon" | "Limited" | "Rare" | "Very Rare" | "Extremely Rare";
        };
    };
}

export interface TornOrganisedCrimes {
    organisedcrimes: {
        [id: string]: {
            name: string;
            members: number;
            time: number;
            min_cash: number;
            max_cash: number;
            min_respect: number;
            max_respect: number;
        };
    };
}

export interface TornPawnShop {
    pawnshop: {
        points_value: number;
        donatorpack_value: number;
    };
}

export interface TornPokerTables {
    pokertables: {
        [id: string]: {
            name: string;
            big_blind: number;
            small_blind: number;
            speed: number;
            current_players: number;
            maximum_players: number;
        };
    };
}

export interface TornProperties {
    properties: {
        [id: string]: {
            name: string;
            cost: number | "";
            happy: number;
            upkeep: number;
            upgrades_available: Array<string>;
            staff_available: Array<string>;
        };
    };
}

export interface TornRackets {
    rackets: {
        [territory: string]: {
            name: string;
            level: 1 | 2 | 3 | 4 | 5;
            reward: string;
            created: number;
            changed: number;
            faction: number;
        };
    };
}

export interface TornRaids {
    raids: {
        [id: string]: {
            assaulting_faction: number;
            defending_faction: number;
            assaulting_score: number;
            defending_score: number;
            started: number;
        };
    };
}

export interface TornRankedWarReport {
    rankedwarreport: {
        factions: {
            [faction: string]: {
                name: string;
                score: number;
                rewards: {
                    respect: number;
                    points: number;
                    items: {
                        [item: string]: {
                            name: string;
                            quantity: number;
                        };
                    };
                };
            };
        };
        members: {
            [user: string]: {
                name: string;
                faction_id: number;
                level: number;
                attacks: number;
                score: number;
            };
        };
        war: {
            start: number;
            end: number;
            winner: number;
            forfeit: NumberBoolean;
        };
    };
}

export interface TornRankedWars {
    rankedwars: {
        [id: string]: {
            factions: {
                [faction: string]: {
                    name: string;
                    score: number;
                    chain: number;
                };
            };
            war: {
                start: number;
                end: number;
                target: number;
                winner: number;
            };
        };
    };
}

export interface TornStats {
    stats: {
        timestamp: number;
        users_total: number;
        users_male: number;
        users_female: number;
        users_marriedcouples: number;
        users_daily: number;
        total_users_logins: number;
        total_users_playtime: string;
        job_army: number;
        job_grocer: number;
        job_medical: number;
        job_casino: number;
        job_education: number;
        job_law: number;
        job_company: number;
        job_none: number;
        crimes: number;
        jailed: number;
        money_onhand: number;
        money_average: number;
        money_citybank: number;
        items: number;
        events: number;
        points_total: number;
        points_market: number;
        points_averagecost: number;
        points_bought: number;
        total_points_boughttotal: number;
        total_attacks_won: number;
        total_attacks_lost: number;
        total_attacks_stalemated: number;
        total_attacks_runaway: number;
        total_attacks_hits: number;
        total_attacks_misses: number;
        total_attacks_criticalhits: number;
        total_attacks_roundsfired: number;
        total_attacks_stealthed: number;
        total_attacks_moneymugged: number;
        total_attacks_respectgained: number;
        total_items_marketbought: number;
        total_items_bazaarbought: number;
        total_items_auctionswon: number;
        total_items_sent: number;
        total_trades: number;
        total_items_bazaarincome: number;
        total_items_cityfinds: number;
        total_items_dumpfinds: number;
        total_items_dumped: number;
        total_jail_jailed: number;
        total_jail_busted: number;
        total_jail_busts: number;
        total_jail_bailed: number;
        total_jail_bailcosts: number;
        total_hospital_trips: number;
        total_hospital_medicalitemsused: number;
        total_hospital_revived: number;
        total_mails_sent: number;
        total_mails_sent_friends: number;
        total_mails_sent_faction: number;
        total_mails_sent_company: number;
        total_mails_sent_spouse: number;
        total_classifiedads_placed: number;
        total_bounty_placed: number;
        total_bounty_rewards: number;
        total_travel_all: number;
        total_travel_argentina: number;
        total_travel_mexico: number;
        total_travel_dubai: number;
        total_travel_hawaii: number;
        total_travel_japan: number;
        total_travel_unitedkingdom: number;
        total_travel_southafrica: number;
        total_travel_switzerland: number;
        total_travel_china: number;
        total_travel_canada: number;
        total_travel_caymanislands: number;
        total_drugs_used: number;
        total_drugs_overdosed: number;
        total_drugs_cannabis: number;
        total_drugs_ecstacy: number;
        total_drugs_ketamine: number;
        total_drugs_lsd: number;
        total_drugs_opium: number;
        total_drugs_shrooms: number;
        total_drugs_speed: number;
        total_drugs_pcp: number;
        total_drugs_xanax: number;
        total_drugs_vicodin: number;
        total_merits_bought: number;
        total_refills_bought: number;
        total_company_trains: number;
        total_statenhancers_used: number;
    };
}

interface BaseStock {
    stock_id: number;
    name: string;
    acronym: string;
    current_price: number;
    market_cap: number;
    total_shares: number;
    investors: number;
    benefit: {
        type: "active" | "passive";
        frequency: 7 | 31;
        requirement: number;
        description: string;
    };
}

interface StockChange {
    change: number;
    change_percentage: number;
    start: number;
    end: number;
    high: number;
    low: number;
}

export interface TornStocks {
    stocks: {
        [id: string]:
            | BaseStock
            | (BaseStock & {
                  last_hour: StockChange;
                  last_day: StockChange;
                  last_week: StockChange;
                  last_month: StockChange;
                  last_year: StockChange;
                  all_time: StockChange;
                  history: Array<{
                      timestamp: number;
                      price: number;
                      change: number;
                  }>;
              });
    };
}

interface BaseTerritory {
    sector: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    size: 1 | 2 | 3 | 4 | 5;
    density: 1 | 2 | 3;
    slots: number;
    daily_respect: number;
    faction: number;
    coordinate_x: string | number;
    coordinate_y: string | number;
}

export interface TornTerritory {
    territory: {
        [territory: string]:
            | BaseTerritory
            | (BaseTerritory & {
                  neighbors: {
                      [id: string]: string;
                  };
              });
    };
}

export interface TornTerritoryWars {
    territorywars: {
        [territory: string]: {
            assaulting_faction: number;
            defending_faction: number;
            started: number;
            ends: number;
        };
    };
}
