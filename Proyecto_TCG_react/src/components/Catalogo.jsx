import {Row,Col,Alert} from 'react-bootstrap'



function Catalogo({productos,onAgregarCarrito}){

    if(productos.length===0){
        return <Alert variant='warning'>No Hay productos para mostrar</Alert>
    }

    return(
        <Row xs={1} sm={2} lg={3} xl={4} className='g-4'>
            {
                productos.map((p)=> (
                        <Col key={p.id}>
                            <TarjetaProducto producto={p}
                             onAgregarCarrito={onAgregarCarrito}/>
                        </Col>
                    )
                )
            }

        </Row>
    )

}

export default Catalogo