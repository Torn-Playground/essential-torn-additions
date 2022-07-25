import { ReactNode } from "react";
import { ContainerTheme, useContainerTheme } from "@common/components/themed-container/useContainerTheme";
import HidableElement from "@common/components/hidable-element/HidableElement";
import * as styles from "./ThemedContainer.module.scss";
import * as themes from "./Themes.module.scss";
import classNames from "classnames";
import { IoCaretDownOutline, IoCaretForwardOutline } from "react-icons/io5";

interface ThemedContainerProps {
    children: ReactNode;
    name: string;
    bodyClass?: string;
    allowDragging?: boolean;
    onDrop?: () => void;
    collapsed: boolean;
    onCollapsedUpdate: (collapsed: boolean) => void;
}

export default function ThemedContainer(props: ThemedContainerProps) {
    const { theme } = useContainerTheme();

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
            <section
                className={classNames([styles.containerHeader, { [styles.collapsed]: props.collapsed }])}
                onClick={() => props.onCollapsedUpdate(!props.collapsed)}
            >
                <div className={styles.title}>{props.name}</div>
                <div>
                    <div className={styles.collapseIcon}>{props.collapsed ? <IoCaretForwardOutline size={16} /> : <IoCaretDownOutline size={16} />}</div>
                </div>
            </section>
            <HidableElement hidden={props.collapsed}>
                <section
                    className={classNames(styles.containerBody, `props.bodyClass ${props.bodyClass}`)}
                    onDragOver={props.allowDragging ? (event) => event.preventDefault() : undefined}
                    onDrop={
                        props.allowDragging
                            ? (event) => {
                                  props.onDrop?.();

                                  event.preventDefault();
                                  event.dataTransfer.clearData();
                              }
                            : undefined
                    }
                >
                    {props.children}
                </section>
            </HidableElement>
        </div>
    );
}
