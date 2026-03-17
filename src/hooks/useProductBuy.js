"use client"

import { useEffect, useState } from "react"

export const useProductBuy = (product) => {
     const [available, setAvailable] = useState(false)
     useEffect(() => {
          const getAvailability = () => {
               const name = JSON.parse(localStorage.getItem("user"))
               const userId = name.profilePayload.userId
               const check = product.viewedBy.find((id) => id === userId)
               setAvailable(check)
          }
          getAvailability()
     }, [])
     return available
}