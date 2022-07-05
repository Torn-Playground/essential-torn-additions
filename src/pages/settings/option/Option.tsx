import { ETASettings } from "@common/data/data.types";
import { ChangeEvent } from "react";
import { updateSettings } from "@common/data/data";
import { Paths } from "./option.types";

interface OptionProps {
    label: string;
    defaultValue: boolean;
    value: boolean | undefined;
    onUpdate: (newValue: boolean) => void;
    path: Paths<ETASettings>;
}

export default function Option(props: OptionProps) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        updateSettings(props.path, isChecked);
        props.onUpdate(isChecked);
    };

    return (
        <label>
            <input type="checkbox" checked={props.value} onChange={onChange} />
            {props.label}
        </label>
    );
}
