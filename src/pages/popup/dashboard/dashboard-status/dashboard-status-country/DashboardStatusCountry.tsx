interface DashboardStatusCountryProps {
    destination: string;
}

export default function DashboardStatusCountry(props: DashboardStatusCountryProps) {
    return <h1>{props.destination}</h1>;
}
