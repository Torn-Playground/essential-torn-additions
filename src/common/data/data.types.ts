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
        destination: String;
        timestamp: EpochTimeStamp;
        departed: EpochTimeStamp;
        timeLeft: number | undefined;
    };
    newEvents: Array<{ event: string }>;
    newMessages: Array<{ title: string }>;
}

export interface BarData {
    current: number;
    maximum: number;
    ticktime: EpochTimeStamp;
    fulltime: EpochTimeStamp | undefined;
    interval: number;
    increment: number;
}
