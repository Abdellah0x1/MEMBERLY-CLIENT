import React from "react"
import { Outlet } from "react-router"

const CustomerLayout = (): React.JSX.Element => {
    return <div>
        <Outlet/>
    </div>
}

export default CustomerLayout