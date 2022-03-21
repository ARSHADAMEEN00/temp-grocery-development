import React from 'react'
import { MetaTags } from 'react-meta-tags'
import { Card, Container } from 'reactstrap'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import StockreportTable from './DatatableTables'

function Stockreport() {

    return (
        <>
            <MetaTags>
                <title>Stock Reports | Indtech </title>
            </MetaTags>
            <div className="page-content">
                <Breadcrumbs title="Dashboard" breadcrumbItem="All Stock Rrport" />
                <Container fluid>
                    <div className="container-fluid">
                        <Card>
                            <StockreportTable />
                        </Card>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Stockreport