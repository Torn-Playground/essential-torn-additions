import { useData } from "@common/react-utilities/useData";
import Dashboard from "./dashboard/Dashboard";
import PopupApi from "./popup-api/PopupApi";
import { apiBucket } from "@common/utilities/data/data";
import ReactLoading from "react-loading";
import PopupBox from "./popup-box/PopupBox";
import Message from "@common/components/message/Message";

export default function PopupApp() {
    const { data: apiData, loading, error } = useData(apiBucket, true);

    if (loading) {
        return <ReactLoading type="spin" color="#000" height={32} width={32} />;
    }

    if (error) {
        return (
            <PopupBox minWidth={320}>
                <Message text="Something went wrong when loading the popup, please try again or report this." type="error" />
            </PopupBox>
        );
    }

    if (!apiData?.apiKey) {
        return (
            <PopupBox minWidth={300}>
                <PopupApi />
            </PopupBox>
        );
    }

    return (
        <PopupBox minWidth={320}>
            <Dashboard />
        </PopupBox>
    );
}
