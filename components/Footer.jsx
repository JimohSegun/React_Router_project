import React from "react"

export default function Footer() {
    const currentYear = new Date()
    const date = currentYear.getFullYear()
    return (
        <footer>&#169; {date} #VANLIFE</footer>
    )
}