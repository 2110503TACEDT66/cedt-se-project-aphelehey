import React from "react";
import ReservationMenu from "@/components/ReservaionMenu";
import styles from './reservations.module.css'

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.sectionlayout}>
            <ReservationMenu />
            {children}
        </div>
    );
}