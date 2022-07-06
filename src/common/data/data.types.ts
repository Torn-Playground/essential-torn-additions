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
    energy: {
        current: number;
        maximum: number;
        ticktime: EpochTimeStamp;
        fulltime: EpochTimeStamp | undefined;
    };
    nerve: {
        current: number;
        maximum: number;
        ticktime: EpochTimeStamp;
        fulltime: EpochTimeStamp | undefined;
    };
    lastUpdate: EpochTimeStamp;
}
