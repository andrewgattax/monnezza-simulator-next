import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function UnauthorizedPage() {
  redirect('/login')
}