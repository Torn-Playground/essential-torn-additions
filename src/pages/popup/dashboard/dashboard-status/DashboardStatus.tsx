import { ETAUserdata } from "@common/data/data.types";
import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";
import DashboardStatusCountry from "@pages/popup/dashboard/dashboard-status/dashboard-status-country/DashboardStatusCountry";
import DashboardStatusState from "@pages/popup/dashboard/dashboard-status/dashboard-status-state/DashboardStatusState";

interface DashboardStatusProps {
    data: ETAUserdata;
}

export default function DashboardStatus(props: DashboardStatusProps) {
    const { expired: travelExpired } = useCountdownTimer(props.data.travel.timestamp);
    const { timer: statusTimer, expired: statusExpired } = useCountdownTimer(props.data.status.until, true, true);

    if (!travelExpired) {
        return <DashboardStatusCountry destination={`Travelling to ${props.data.travel.destination}`} />;
    } else if (!statusExpired) {
        let statusText: string, statusColor: string;
        switch (props.data.status.state.toLowerCase()) {
            case "hospital":
                statusText = "Hospitalized";
                statusColor = props.data.status.color;
                break;
            case "jail":
                statusText = "Jailed";
                statusColor = "orange";
                break;
            default:
                statusText = "unknown";
                statusColor = props.data.status.color;
                break;
        }

        return (
            <>
                <DashboardStatusCountry destination={props.data.travel.destination} />
                <DashboardStatusState state={`${statusText} for ${statusTimer}`} color={statusColor} />
            </>
        );
    } else {
        return (
            <>
                <DashboardStatusCountry destination={props.data.travel.destination} />
                <DashboardStatusState state={props.data.status.state} color={props.data.status.color} />
            </>
        );
    }
}
