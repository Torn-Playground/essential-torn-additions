import { useEffect } from "react";
import ThemedContainer from "@common/components/themed-container/ThemedContainer";

export default function QuickItems() {
    useEffect(() => {
        console.log("DKK on mount");
    }, []);

    return (
        <ThemedContainer name="Quick Items">
            <span>WIP</span>
        </ThemedContainer>
    );
}
