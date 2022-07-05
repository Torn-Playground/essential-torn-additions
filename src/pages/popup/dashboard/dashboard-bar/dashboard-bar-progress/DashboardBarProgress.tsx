interface DashboardBarProgressProps {
    currentValue: number;
    maxValue: number;
}

export default function DashboardBarProgress(props: DashboardBarProgressProps) {
    const x = (props.currentValue / props.maxValue) * 100;

    // FIXME - implement
    // - make sure it doesn't overflow
    return (
        <div>
            <div style={{ width: `$%` }}>{x}%</div>
        </div>
    );
}
