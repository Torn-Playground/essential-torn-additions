// noinspection JSUnusedGlobalSymbols

import { NumberBoolean, TornAttack, TornGender, TornMinimalAttack, TornMinimalRevive, TornRevive } from "@common/api/general.types";

export type UserSelection =
    | "ammo"
    | "attacks"
    | "attacksfull"
    | "bars"
    | "basic"
    | "battlestats"
    | "bazaar"
    | "cooldowns"
    | "crimes"
    | "discord"
    | "display"
    | "education"
    | "events"
    | "gym"
    | "hof"
    | "honors"
    | "icons"
    | "inventory"
    | "jobpoints"
    | "log"
    | "medals"
    | "merits"
    | "messages"
    | "missions"
    | "money"
    | "networth"
    | "newevents"
    | "newmessages"
    | "notifications"
    | "perks"
    | "personalstats"
    | "profile"
    | "properties"
    | "receivedevents"
    | "refills"
    | "reports"
    | "revives"
    | "revivesfull"
    | "skills"
    | "stocks"
    | "travel"
    | "weaponexp"
    | "workstats";

export interface UserCooldowns {
    cooldowns: {
        /**
         * Seconds till the drug cooldown expires.
         */
        drug: number;
        /**
         * Seconds till the booster cooldown expires.
         */
        booster: number;
        /**
         * Seconds till the medical cooldown expires.
         */
        medical: number;
    };
}

export interface UserBars {
    awake: number;
    awakemax: number;
    crimes: number;
    statstamp: number;
    crimesmax: number;
    happymax: number;
    maxlife: number;
    donater: number;
    factionID: number;
    propertyID: number;
    userID: number;
    server_time: number;
    happy: UserBar;
    life: UserBar;
    energy: UserBar;
    nerve: UserBar;
    chain: {
        current: number;
        maximum: number;
        timeout: number;
        cooldown: number;
        modifier: number;
    };
}

export interface UserBar {
    current: number;
    maximum: number;
    increment: number;
    /**
     * Seconds till the next tick.
     */
    ticktime: number;
    /**
     * Seconds till the bar is completely full.
     */
    fulltime: number;
    /**
     * Seconds between tick times.
     */
    interval: number;
}

export interface UserTravel {
    travel: {
        destination: string;
        method: string;
        timestamp: number;
        departed: number;
        time_left: number;
    };
}

export type UserNewEvents = UserEvents & { player_id: number };

export interface UserEvents {
    events: {
        [id: string]: UserEvent;
    };
}

export interface UserEvent {
    timestamp: number;
    event: string;
    seen: NumberBoolean;
}

export type UserNewMessages = UserMessages & {
    player_id: number;
};

export interface UserMessages {
    messages: {
        [id: string]: UserMessage;
    };
}

export interface UserMessage {
    timestamp: number;
    ID: number;
    name: string;
    type: string;
    title: string;
    seen: NumberBoolean;
    read: NumberBoolean;
}

export type UserProfile = UserBasic & {
    level: number;
    gender: TornGender;
    player_id: number;
    name: string;
    rank: string;
    property: string;
    signup: string;
    awards: number;
    friends: number;
    enemies: number;
    forum_posts: number;
    karma: number;
    age: number;
    role: string;
    donator: NumberBoolean;
    property_id: number;
    revivable: NumberBoolean;
    life: UserBar;
    job?: {
        position: string;
        company_id: number;
        company_name: string;
        company_type: number;
    };
    faction?: {
        position: string;
        faction_id: number;
        days_in_faction: number;
        faction_name: string;
        faction_tag: string;
    };
    married?: {
        spouse_id: number;
        spouse_name: string;
        duration: number;
    };
    basicicons: {
        [id: string]: string;
    };
    states: {
        hospital_timestamp: number;
        jail_timestamp: number;
    };
    last_action: {
        status: string;
        timestamp: number;
        relative: string;
    };
    competition?: UserCompetitionMrMsTorn;
};

export interface UserCompetitionMrMsTorn {
    name: "Mr & Ms Torn";
    score: number;
    votes: number;
    image: string;
}

export interface UserMoney {
    points: number;
    cayman_bank: number;
    vault_amount: number;
    company_funds: number;
    daily_networth: number;
    money_onhand: number;
    city_bank: {
        amount: number;
        /**
         * Seconds till the bank investment is over.
         */
        time_left: number;
    };
}

export interface UserAmmo {
    ammo: Array<{
        ammoID: number;
        typeID: number;
        size: string;
        type: string;
        quantity: number;
        equipped: NumberBoolean;
    }>;
}

export interface UserAttacks {
    attacks: {
        [id: string]: TornAttack;
    };
}

export interface UserAttacksFull {
    attacks: {
        [id: string]: TornMinimalAttack;
    };
}

export interface UserBasic {
    level: number;
    gender: TornGender;
    player_id: number;
    name: string;
    status: {
        description: string;
        details: string;
        state: string;
        color: string;
        until: number;
    };
}

export interface UserBattleStats {
    strength: number;
    speed: number;
    dexterity: number;
    defense: number;
    total: number;
    strength_modifier: number;
    defense_modifier: number;
    speed_modifier: number;
    dexterity_modifier: number;
    strength_info: Array<string>;
    defense_info: Array<string>;
    speed_info: Array<string>;
    dexterity_info: Array<string>;
}

interface TornBaseItem {
    ID: number;
    UID?: number;
    name: string;
    type: string;
    market_price: number;
    quantity: number;
}

export interface UserBazaar {
    bazaar: Array<TornBaseItem & { price: number }>;
}

export interface UserDisplay {
    display: Array<TornBaseItem & { circulation: number }>;
}

export interface UserInventory {
    inventory: Array<TornBaseItem & { equipped: number }>;
}

export interface UserCrimes {
    criminalrecord: {
        selling_illegal_products: number;
        theft: number;
        auto_theft: number;
        drug_deals: number;
        computer_crimes: number;
        murder: number;
        fraud_crimes: number;
        other: number;
        total: number;
    };
}

export interface UserDiscord {
    discord: {
        userID: number;
        discordID: string;
    };
}

export interface UserEducation {
    education_current: number;
    education_timeleft: number;
    education_completed: Array<Number>;
}

export interface UserGym {
    active_gym: number;
}

interface UserHallOfFameCategory {
    value: number;
    rank: number;
}

export interface UserHallOfFame {
    halloffame: {
        attacks: UserHallOfFameCategory;
        battlestats: UserHallOfFameCategory;
        busts: UserHallOfFameCategory;
        defends: UserHallOfFameCategory;
        networth: UserHallOfFameCategory;
        offences: UserHallOfFameCategory;
        revives: UserHallOfFameCategory;
        traveled: UserHallOfFameCategory;
        workstats: UserHallOfFameCategory;
        level: UserHallOfFameCategory;
        rank: UserHallOfFameCategory;
        respect: UserHallOfFameCategory;
    };
}

export interface UserHonors {
    honors_awarded: Array<number>;
    honors_time: Array<number>;
}

export interface UserIcons {
    icons: {
        [id: string]: string;
    };
}

export interface UserJobPoints {
    jobpoints: {
        jobs: {
            [job: string]: number;
        };
        companies: {
            [id: string]: {
                name: string;
                jobpoints: number;
            };
        };
    };
}

export interface UserLog {
    log: {
        [log: string]: {
            log: number;
            title: string;
            timestamp: number;
            category: string;
            data: {
                [key: string]: any;
            };
            params: {
                [key: string]: any;
            };
        };
    };
}

export interface UserMedals {
    medals_awarded: Array<number>;
    medals_time: Array<number>;
}

export interface UserMerits {
    merits: {
        "Nerve Bar": number;
        "Critical Hit Rate": number;
        "Life Points": number;
        "Crime Experience": number;
        "Education Length": number;
        Awareness: number;
        "Bank Interest": number;
        "Masterful Looting": number;
        Stealth: number;
        Hospitalizing: number;
        "Addiction Mitigation": number;
        "Employee Effectiveness": number;
        Brawn: number;
        Protection: number;
        Sharpness: number;
        Evasion: number;
        "Heavy Artillery Mastery": number;
        "Machine Gun Mastery": number;
        "Rifle Mastery": number;
        "SMG Mastery": number;
        "Shotgun Mastery": number;
        "Pistol Mastery": number;
        "Club Mastery": number;
        "Piercing Mastery": number;
        "Slashing Mastery": number;
        "Mechanical Mastery": number;
        "Temporary Mastery": number;
    };
}

export interface UserMissions {
    missions: {
        Duke: Array<{
            title: string;
            status: string; // Could be its own type if really needed.
        }>;
    };
}

export interface UserNetworth {
    networth: {
        pending: number;
        wallet: number;
        bank: number;
        points: number;
        cayman: number;
        vault: number;
        piggybank: number;
        items: number;
        displaycase: number;
        bazaar: number;
        itemmarket: number;
        properties: number;
        stockmarket: number;
        auctionhouse: number;
        company: number;
        bookie: number;
        enlistedcars: number;
        loan: number;
        unpaidfees: number;
        total: number;
        parsetime: number;
    };
}

export interface UserNotifications {
    notifications: {
        messages: number;
        events: number;
        awards: number;
        competition: number;
    };
}

export interface UserPerks {
    faction_perks: Array<string>;
    job_perks: Array<string>;
    property_perks: Array<string>;
    education_perks: Array<string>;
    enhancer_perks: Array<string>;
    book_perks: Array<string>;
    stock_perks: Array<string>;
    merit_perks: Array<string>;
}

export interface UserPersonalStats {
    personalstats: {
        bazaarcustomers?: number;
        bazaarsales?: number;
        bazaarprofit?: number;
        useractivity: number;
        activestreak: number;
        bestactivestreak: number;
        itemsbought: number;
        pointsbought: number;
        itemsboughtabroad: number;
        moneyinvested?: number;
        investedprofit?: number;
        weaponsbought: number;
        trades?: number;
        itemssent: number;
        auctionswon: number;
        auctionsells: number;
        pointssold?: number;
        attackswon: number;
        attackslost: number;
        attacksdraw: number;
        bestkillstreak: number;
        killstreak?: number;
        moneymugged: number;
        attacksstealthed: number;
        attackhits: number;
        attackmisses: number;
        attackdamage: number;
        attackcriticalhits: number;
        respectforfaction: number;
        onehitkills: number;
        defendswon: number;
        defendslost: number;
        defendsstalemated: number;
        bestdamage: number;
        roundsfired: number;
        yourunaway: number;
        theyrunaway: number;
        highestbeaten: number;
        peoplebusted: number;
        failedbusts: number;
        peoplebought: number;
        peopleboughtspent: number;
        virusescoded: number;
        cityfinds: number;
        traveltimes: number;
        bountiesplaced: number;
        bountiesreceived: number;
        bountiescollected: number;
        totalbountyreward: number;
        revives: number;
        revivesreceived: number;
        medicalitemsused: number;
        statenhancersused: number;
        trainsreceived: number;
        totalbountyspent: number;
        drugsused: number;
        overdosed: number;
        meritsbought: number;
        personalsplaced: number;
        classifiedadsplaced: number;
        mailssent: number;
        friendmailssent: number;
        factionmailssent: number;
        companymailssent: number;
        spousemailssent: number;
        largestmug: number;
        cantaken: number;
        exttaken: number;
        kettaken: number;
        lsdtaken: number;
        opitaken: number;
        shrtaken: number;
        spetaken: number;
        pcptaken: number;
        xantaken: number;
        victaken: number;
        chahits: number;
        heahits: number;
        axehits: number;
        grehits: number;
        machits: number;
        pishits: number;
        rifhits: number;
        shohits: number;
        smghits: number;
        piehits: number;
        slahits: number;
        argtravel: number;
        mextravel: number;
        dubtravel: number;
        hawtravel: number;
        japtravel: number;
        lontravel: number;
        soutravel: number;
        switravel: number;
        chitravel: number;
        cantravel: number;
        dumpfinds: number;
        dumpsearches: number;
        itemsdumped: number;
        daysbeendonator: number;
        caytravel: number;
        jailed: number;
        hospital: number;
        attacksassisted: number;
        bloodwithdrawn: number;
        networth: number;
        missionscompleted: number;
        contractscompleted: number;
        dukecontractscompleted: number;
        missioncreditsearned: number;
        consumablesused: number;
        candyused: number;
        alcoholused: number;
        energydrinkused: number;
        nerverefills: number;
        unarmoredwon: number;
        h2hhits: number;
        organisedcrimes: number;
        territorytime: number;
        territoryjoins: number;
        stockpayouts?: number;
        stockprofits?: number;
        stocklosses?: number;
        stockfees?: number;
        stocknetprofits?: number;
        arrestsmade: number;
        tokenrefills: number;
        booksread: number;
        traveltime: number;
        boostersused: number;
        rehabs: number;
        rehabcost: number;
        awards: number;
        receivedbountyvalue: number;
        networthpending?: number;
        networthwallet?: number;
        networthbank?: number;
        networthpoints?: number;
        networthcayman?: number;
        networthvault?: number;
        networthpiggybank?: number;
        networthitems?: number;
        networthdisplaycase?: number;
        networthbazaar?: number;
        networthproperties?: number;
        networthstockmarket?: number;
        networthitemmarket?: number;
        networthauctionhouse?: number;
        networthcompany?: number;
        networthbookie?: number;
        networthenlistedcars: number;
        networthloan?: number;
        networthunpaidfees?: number;
        racingskill: number;
        raceswon: number;
        racesentered: number;
        racingpointsearned: number;
        specialammoused: number;
        cityitemsbought: number;
        hollowammoused: number;
        tracerammoused: number;
        piercingammoused: number;
        incendiaryammoused: number;
        attackswonabroad: number;
        defendslostabroad: number;
        rankedwarringwins: number;
        retals: number;
        elo: number;
        strength?: number;
        defense?: number;
        speed?: number;
        dexterity?: number;
        totalstats?: number;
        manuallabor?: number;
        intelligence?: number;
        endurance?: number;
        totalworkingstats?: number;
        jobpointsused: number;
        reviveskill: number;
        itemslooted: number;
        refills: number;
    };
}

export interface UserProperties {
    properties: {
        [id: string]: {
            owner_id: number;
            property_type: number;
            property: string;
            status: string;
            happy: number;
            upkeep: number;
            staff_cost: number;
            cost: number;
            marketprice: number;
            modifications: {
                interior: number;
                hot_tub: number;
                sauna: number;
                pool: number;
                open_bar: number;
                shooting_range: number;
                vault: number;
                medical_facility: number;
                airstrip: number;
                yacht: number;
            };
            staff: {
                maid: number;
                guard: number;
                pilot: number;
                butler: number;
                doctor: number;
            };
        };
    };
}

export interface UserReceivedEvents {
    receivedevents: {
        [id: number]: {
            owner: number;
            timestamp: number;
            event: string;
        };
    };
}

export interface UserRefills {
    refills: {
        energy_refill_used: boolean;
        nerve_refill_used: boolean;
        token_refill_used: boolean;
        special_refills_available: number;
    };
}

export interface UserReports {
    reports: Array<{
        id: string;
        user_id: number;
        target: number;
        type: string; // Could be its own type if really needed.
        report: any;
        timestamp: number;
    }>;
}

export interface UserRevives {
    revives: {
        [id: string]: TornRevive;
    };
}

export interface UserRevivesFull {
    revives: {
        [id: string]: TornMinimalRevive;
    };
}

export interface UserSkills {
    reviving: string;
    hunting: string;
    racing: string;
    player_id: number;
}

export interface UserStocks {
    stocks: {
        [id: string]: {
            stock_id: number;
            total_shares: number;
            dividend: {
                ready: NumberBoolean;
                increment: number;
                progress: number;
                frequency: number;
            };
            transactions: {
                [id: string]: {
                    shares: number;
                    bought_price: number;
                    time_bought: number;
                };
            };
        };
    };
}

export interface UserWeaponExperience {
    weaponexp: Array<{
        itemID: number;
        name: string;
        exp: number;
    }>;
}

export interface UserWorkStats {
    manual_labor: number;
    intelligence: number;
    endurance: number;
}
