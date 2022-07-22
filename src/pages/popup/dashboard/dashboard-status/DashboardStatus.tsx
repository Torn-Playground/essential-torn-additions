import { ETAUserdata } from "@common/utilities/data/data.types";
import DashboardStatusCountry from "@pages/popup/dashboard/dashboard-status/dashboard-status-country/DashboardStatusCountry";
import DashboardStatusState from "@pages/popup/dashboard/dashboard-status/dashboard-status-state/DashboardStatusState";
import { useCountdownTimer } from "@common/react-utilities/timers/useCountdownTimer";

interface DashboardStatusProps {
    data: ETAUserdata;
}

export default function DashboardStatus(props: DashboardStatusProps) {
    const { expired: travelExpired } = useCountdownTimer(props.data.travel.timestamp);
    const { timer: statusTimer, expired: statusExpired } = useCountdownTimer(props.data.status.until, true, true);

    if (!travelExpired) {
        return (
            <div>
                <DashboardStatusCountry destination={`Travelling to ${props.data.travel.destination}`} />
            </div>
        );
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
            <div>
                <DashboardStatusCountry destination={props.data.travel.destination} />
                <DashboardStatusState state={`${statusText} for ${statusTimer}`} color={statusColor} />
            </div>
        );
    } else {
        return (
            <div>
                <DashboardStatusCountry destination={props.data.travel.destination} />
                <DashboardStatusState state={props.data.status.state} color={props.data.status.color} />
            </div>
        );
    }
}
