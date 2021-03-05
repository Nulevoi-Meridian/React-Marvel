import React, { useContext, useEffect, useState } from 'react';
import './MainProductSection.css';
import { Link } from 'react-router-dom';
import { productsContext } from '../../contexts/ProductsContext';
import { shoppingCartContext } from '../../contexts/ShoppingCartContext';
import ProductPagination from './Pagination/Pagination';
import { API_PRODUCTS } from '../../helpers/constants';
import { useAuth } from '../../contexts/AuthContext';

//Импорт material ui
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import CompairePopOver from '../ComparePopOver/ComparePopOver';
import { headerContext } from '../../contexts/HeaderContext';

const MainProductSection = () => {
    const { products,
        getProductData,
        count,
        deleteProduct,
        openEditFormModal,
        getEditId,
        getCompare,
        getProductForFavorites,
        getRecentlyViewed
    } = useContext(productsContext);
    const { getProductForCart } = useContext(shoppingCartContext);
    const { openSignInFormModal } = useContext(headerContext);
    const { currentUser } = useAuth();

    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [filterType, setFilterType] = useState("");

    const getFilterType = (event) => {
        setFilterType(event.target.value);
    };

    const onPaginationChange = (e, value) => {
        setPage(value)
    }
    useEffect(() => {
        if (filterType) {
            getProductData(`${API_PRODUCTS}?q=${searchValue}&_limit=6&_page=${page}&type=${filterType}`);
        } else {
            getProductData(`${API_PRODUCTS}?q=${searchValue}&_limit=6&_page=${page}`);
        }
    }, [page, searchValue, filterType]);

    //Material ui выпадающий список
    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
                marginBottom: '15px',
            },
        },
        input: {
            width: '70px',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: 'grey',
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);

    return (
        <section className="item-section">
            <div className="container">
                <div className="item__search">
                    <input
                        value={searchValue}
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchValue(e.target.value)
                        }}
                        type="text"
                        className="search__input"
                        placeholder="Search Characters"
                    />
                </div>
                <div className="item-filter">
                    <FormControl>
                        <InputLabel id="demo-customized-select-label">{filterType}</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={filterType}
                            onChange={getFilterType}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Heroes">Heroes</MenuItem>
                            <MenuItem value="Villains">Villains</MenuItem>
                        </Select>
                        <div className="item-filter__title">Choose Type</div>
                    </FormControl>
                </div>
                <CompairePopOver />
                <div className="item-section__inner">
                    {products.map(item => (
                        <div key={item.id} className="item-section__list-item">
                            <div className="logo-title">MARVEL</div>
                            <div className="list-item__img">
                                <img src={item.image} width="100%" alt="Coming Soon" />
                            </div>
                            <div className="list-item__description">
                                <div className="description__title">
                                    <span>{item.title}</span>
                                </div>
                                <div className="description__main">
                                    <span>{item.description}</span>
                                </div>
                                <div className="list-item__link">
                                    <Link to={`details/${item.id}`}
                                    onClick={() => getRecentlyViewed(item)}
                                    >Learn more</Link>
                                    <span onClick={() => getCompare(item)}
                                    >Compare</span>
                                </div>
                            </div>
                            <div className="list-item__actions">
                                <div className="list-item__price">
                                    <span>{item.price} $</span>
                                </div>
                                <div className="list-item__add-to">
                                    <div className="add-to__cart"
                                        onClick={() => {
                                            currentUser.user !== null ?
                                            getProductForCart(item.id)
                                            : openSignInFormModal()}}
                                    >
                                        <span>Add to Cart</span>
                                    </div>
                                    
                                    <div className="add-to__favorite">
                                        <span onClick={() => getProductForFavorites(item)}>Add to Favorites</span>
                                    </div>
                                    {currentUser?.email === 'admin@gmail.com' ?
                                        <div className="admin-btn">
                                            <div className="edit-btn">
                                                <span onClick={
                                                    () => {
                                                        openEditFormModal()
                                                        getEditId(item.id)
                                                    }
                                                }>Edit</span>
                                                <img src="./img/icon/favorite-item.svg" alt="" />
                                            </div>
                                            <div className="delete-btn">
                                                <span onClick={
                                                    () => { deleteProduct(item.id) }
                                                }>Delete</span>
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ProductPagination count={Math.ceil(count / 6)} page={page} onChange={onPaginationChange} />
        </section>
    );
};

export default MainProductSection;

