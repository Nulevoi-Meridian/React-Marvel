import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './Pagination.css';


const ProductPagination = ({onChange, page, count}) => {
    return (
            <Pagination 
            onChange={onChange}
            page={page}
            count={count} 
            style={{display: 'flex', justifyContent: 'center', marginBottom: '25px'}}
            variant="outlined" 
            color="secondary" />
    );
};
export default ProductPagination;
