import React from 'react'
import { t } from "i18n";
import Link from 'next/link';

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className=''>
            {t("app.title")}

            <Link href="">{t("nav.login")}</Link>
        </div>
    )
}
