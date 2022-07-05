interface DashboardCooldownProps {
    name: string;
    cooldown: EpochTimeStamp | undefined;
}

export default function DashboardCooldown(props: DashboardCooldownProps) {
    // FIXME - implement (https://reactjs.org/docs/state-and-lifecycle.html)
    return (
        <div style={{ outline: "1px solid white" }}>
            <p>{props.name}</p>
            <p>{props.cooldown}</p>
        </div>
    );
}
