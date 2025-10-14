import React from 'react'
import { t } from "i18n";
import Link from 'next/link';

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='h-15 px-20 flex w-full items-center justify-between z-50'>
            <Link href="" className='text-primary text-3xl font-semibold font-serif'>{t("app.title")}</Link>
            <Link href="" className='text-foreground hover:text-primary text-xl font-serif'>{t("nav.login")}</Link>
        </div>
    )
}
