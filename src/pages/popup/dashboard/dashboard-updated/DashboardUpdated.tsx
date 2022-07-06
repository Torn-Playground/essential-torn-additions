interface DashboardUpdatedProps {
    value: EpochTimeStamp;
}

export default function DashboardUpdated(props: DashboardUpdatedProps) {
    return <p>{props.value}</p>;
}
