export type UserSelection = "cooldowns" | "bars" | "travel" | "newevents" | "newmessages" | "profile";

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
    chain: {
        current: number;
        maximum: number;
        timeout: number;
        cooldown: number;
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
        timestamp: number;
        departed: number;
        time_left: number;
    };
}

export interface UserNewEvents {
    events: {
        [id: string]: UserNewEvent;
    };
}

export interface UserNewEvent {
    timestamp: number;
    event: string;
    seen: 0 | 1;
}

export interface UserNewMessages {
    messages: {
        [id: string]: UserNewMessage;
    };
}

export interface UserNewMessage {
    timestamp: number;
    ID: number;
    name: string;
    type: string;
    title: string;
    seen: 0 | 1;
    read: 0 | 1;
}

export interface UserProfile {
    status: {
        description: string;
        state: string;
        color: string;
        until: number;
    };
}
