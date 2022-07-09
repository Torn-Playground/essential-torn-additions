export type UserSelection = "cooldowns" | "bars" | "travel" | "newevents" | "newmessages";

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
    energy: UserBar;
    nerve: UserBar;
    happy: UserBar;
    life: UserBar;
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
        destination: String;
        timestamp: number;
        departed: number;
        time_left: number;
    };
}
