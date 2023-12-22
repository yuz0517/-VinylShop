import React from 'react'

export default function AddressItem(props) {
  return (
    <div>
        <div>{props.address_name}</div>
        <div>{props.recipient}</div>
    </div>
  )
}
