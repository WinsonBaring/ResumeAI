'use client'
import { revalidateButton } from '@/api/actions/revalidate'
import React from 'react'

export const ButtonTest = () => {
  return (
    <div>
        <button
        onClick={()=> revalidateButton()}
        >
            THIS IS thE BUTTON
        </button>
    </div>
  )
}

