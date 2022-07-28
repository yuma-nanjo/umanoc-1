import Head from "next/head"
import { GridApp } from "../components/Grid/GridApp"

export default function Blog() {
  return (
    <div>
      <Head>
        <title>Blog | umanoc</title>
      </Head>
      <GridApp />
    </div>
  )
}