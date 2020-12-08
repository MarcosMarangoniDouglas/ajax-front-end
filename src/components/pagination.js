import React, { useState, useEffect } from 'react';
import { Pagination as BootstrapPagination, Row, Col, Form } from 'react-bootstrap';

function Pagination(props) {
    const [ size, setSize ] = useState(10);
    const [ page, setPage ] = useState(0);
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
      setTotal(props.total);
    }, [props.total]);

    const changePage = (e) => {
      const newPage = parseInt(e.target.dataset.page);
      if(newPage !== 'undefined') {
        setPage(newPage);
        props.onClick(newPage, size);
      }
    }

    const calculatePages = () => {
      const numberOfPages = Math.ceil(total / size);
      const items = [];
      for (let i = 0; i < numberOfPages; i++) {
        items.push(
          <BootstrapPagination.Item key={i} data-page={i} active={i === page} onClick={changePage}>
            {i+1}
          </BootstrapPagination.Item>,
        );
      }
      return items;
    }

    const onChangeSize = (e) => {
      const newSize = parseInt(e.target.value);
      let tmpPage = page;
      if(newSize * page > total) {
        let tmpTotal = tmpPage * newSize;
        while(tmpTotal > total) {
          tmpPage--;
          tmpTotal = tmpPage * newSize;
        }
        setPage(tmpPage);
      }
      setSize(newSize);
      props.onClick(tmpPage, newSize);
    }

    const paginationDetails = () => {
      const start = page * size;
      let end = start + size;
      if(end > total) end = total;
      return `Showing ${start} to ${end} of ${total} items`;
    }

    return(
      <Row style={{ margin: '0 auto' }}>
        <Col>
          <BootstrapPagination>{calculatePages()}</BootstrapPagination>
        </Col>
        <Col>
          <Form.Control as="select" custom onChange={onChangeSize}>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </Form.Control>
        </Col>
        <Col>
          <h6>{paginationDetails()}</h6>
        </Col>
      </Row>
    );
}

export default Pagination;