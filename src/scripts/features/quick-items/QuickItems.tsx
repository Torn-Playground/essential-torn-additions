import { useEffect } from "react";
import ThemedContainer from "@common/components/themed-container/ThemedContainer";

export default function QuickItems() {
    useEffect(() => {
        console.log("DKK on mount");
    }, []);

    return (
        <ThemedContainer>
            <div
                style={{
                    height: "50px",
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <span>WIP</span>
            </div>
        </ThemedContainer>
    );
}
