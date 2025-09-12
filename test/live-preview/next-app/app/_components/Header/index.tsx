{
  /* eslint-disable @next/next/no-img-element */
}

import Link from 'next/link'

import { Gutter } from '../Gutter'
import { HeaderNav } from './Nav'

import { fetchHeader } from '@/app/_api/fetchHeader'
import classes from './index.module.scss'

export async function Header() {
  const header = await fetchHeader()

  return (
    <header className={classes.header}>
      <Gutter className={classes.wrap}>
        <Link href="/">
          <img
            className={classes.logo}
            alt="Payload Logo"
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/mzinga/src/admin/assets/images/payload-logo-dark.svg"
          />
        </Link>
        <HeaderNav header={header} />
      </Gutter>
    </header>
  )
}
