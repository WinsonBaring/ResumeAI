import Link from 'next/link'
import React from 'react'

interface iSideBarOption {
    url: string
    icon: any
    title: string
    description: string
}
export const SideBarOption = (item: iSideBarOption) => {
    return (
        <Link href={item.url}
            prefetch={true}
            className='flex py-6'
        >
            <div
                className='flex justify-center items-center'
            >
                <item.icon />
            </div>
            <div
                className='flex flex-col'
            >

                <span>{item.title}</span>
                {(item.description) && (
                    <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                )}
            </div>
        </Link>
    )
}