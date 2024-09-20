import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export function RedirectHome() {
  const history = useHistory()

  useEffect(() => {
    history.push('/')
  }, [history])

  return null
}