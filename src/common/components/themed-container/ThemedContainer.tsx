import { ReactNode, useState } from "react";
import { ContainerTheme, useContainerTheme } from "@common/components/themed-container/useContainerTheme";
import HidableElement from "@common/components/hidable-element/HidableElement";
import * as styles from "./ThemedContainer.module.scss";
import * as themes from "./Themes.module.scss";
import classNames from "classnames";
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";

interface ThemedContainerProps {
    children: ReactNode;
    name: string;
}

export default function ThemedContainer(props: ThemedContainerProps) {
    const { theme } = useContainerTheme();

    const [collapsed, setCollapsed] = useState(false);

    const getThemeClass = () => {
        switch (theme) {
            case ContainerTheme.UNIQUE:
                return themes.theme_unique;
            case ContainerTheme.TORN:
                return themes.theme_torn;
            case ContainerTheme.DEFAULT:
            default:
                return themes.theme_default;
        }
    };

    return (
        <div className={classNames("eta-container", styles.container, getThemeClass())}>
            <section className={classNames([styles.containerHeader, { [styles.collapsed]: collapsed }])} onClick={() => setCollapsed((x) => !x)}>
                <div className={styles.title}>{props.name}</div>
                <div>
                    {/* FIXME - Implement options. */}
                    {/*<div className={styles.icons}>OPTIONS</div>*/}
                    <div className={styles.collapseIcon}>{collapsed ? <IoCaretForwardOutline size={16} /> : <IoCaretDownOutline size={16} />}</div>
                </div>
            </section>
            <HidableElement hidden={collapsed}>
                {/* FIXME - Implement body. */}
                <section className={styles.containerBody}>{props.children}</section>
            </HidableElement>
        </div>
    );
}
