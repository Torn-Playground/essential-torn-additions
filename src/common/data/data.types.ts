export interface ETASettings {
    notifications:
        | {
              types:
                  | {
                        drugCooldown: boolean | undefined;
                        boosterCooldown: boolean | undefined;
                    }
                  | undefined;
          }
        | undefined;
}

export interface ETAApiData {
    apiKey: string | undefined;
}

// Userdata
export interface ETAUserdata {
    cooldowns: {
        drug: EpochTimeStamp | undefined;
        booster: EpochTimeStamp | undefined;
        medical: EpochTimeStamp | undefined;
    };
    energy: BarData;
    nerve: BarData;
    happy: BarData;
    life: BarData;
    lastUpdate: EpochTimeStamp;
    travel: {
        destination: string;
        timestamp: EpochTimeStamp;
        departed: EpochTimeStamp;
        timeLeft: number | undefined;
    };
    newEvents: Array<{ event: string }>;
    newMessages: Array<{ title: string }>;
    status: {
        description: string;
        state: string;
        color: string;
        until: EpochTimeStamp | undefined;
    };
    chain: {
        current: number;
        maximum: number;
        timeout: EpochTimeStamp | undefined;
        cooldown: number;
    };
    moneyOnHand: number;
}

export interface BarData {
    current: number;
    maximum: number;
    ticktime: EpochTimeStamp;
    fulltime: EpochTimeStamp | undefined;
    interval: number;
    increment: number;
}
