import React from 'react'
import { Spinner } from 'react-bootstrap'

export function Loading() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status" />
      Loading...
    </div>
  )
}
