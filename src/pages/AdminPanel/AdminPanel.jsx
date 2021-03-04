import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/ProductsContext';
import './AdminPanel.css';
import ModalForEdit from '../../components/ModalForEdit/ModalForEdit';
import MainProductSection from '../../components/MainProductSection/MainProductSection';
import { useAuth } from '../../contexts/AuthContext';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const AdminPanel = () => {
    const { setProductData,
        editModalFormStatus
    } = useContext(productsContext);

    const { currentUser } = useAuth();
    const [addProductActive, setAddProductActive] = useState(true);

    const [item, setItem] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        type: '',
        team: '',
        imageDetail1: '',
        imageDetail2: '',
        detailDescription: '',
        latest: '',
        imageLatest: '',
        strenght: '',
        speed: '',
        fighting: '',
        intelligence: '',
        energy: '',
        durability: ''
    });

    const getInpValue = (e) => {
        const newProduct = {
            ...item,
            [e.target.name]: e.target.value
        }
        setItem(newProduct);
    }

    function handleClick() {
        if (!item.title || !item.description 
            || !item.price || !item.image 
            || !item.imageDetail1 || !item.imageDetail1
            || !item.type || !item.team 
            || !item.latest || !item.imageLatest 
            || !item.strenght || !item.speed 
            || !item.fighting || !item.intelligence
            || !item.energy || !item.durability)
            return alert('Все поля обязательны')
        setProductData(item)
        setItem({
            title: '',
            description: '',
            price: '',
            image: '',
            type: '',
            team: '',
            imageDetail1: '',
            imageDetail2: '',
            detailDescription: '',
            latest: '',
            imageLatest: '',
            strenght: '',
            speed: '',
            fighting: '',
            intelligence: '',
            energy: '',
            durability: ''
        })
    }

    return (
        <>
            {currentUser?.email === 'admin@gmail.com' ?
                <div className="admin-section">
                    <div className="container">
                        <div className="add-product">
                            <div className="add-product__main-title">Добавление товара <ArrowDownwardIcon
                                className={addProductActive ? "add-product__icon" : "add-product__icon reverse"}
                                onClick={() => setAddProductActive(!addProductActive)}
                            /></div>
                            <div className="add-product__title">
                                <div
                                    className={addProductActive ? "add-product__item" : "add-product__item disable"}>
                                    <h5>Для главной страницы</h5>
                                    <input type="text" className="item-title"
                                        value={item.title}
                                        placeholder="Добавить заголовок"
                                        name="title"
                                        onChange={getInpValue}
                                    />
                                    <textarea type="text" className="item-description"
                                        placeholder="Добавить краткое описание"
                                        value={item.description}
                                        name="description"
                                        onChange={getInpValue}
                                    />
                                    <input type="text" className="item-price"
                                        value={item.price}
                                        placeholder="Добавить цену"
                                        name="price"
                                        onChange={getInpValue}
                                    />
                                    <input type="text" className="item-img"
                                        value={item.image}
                                        placeholder="Добавить изображение"
                                        name="image"
                                        onChange={getInpValue}
                                    />
                                    <div className="add-product__item-details">
                                        <p>Для деталей</p>
                                        <input type="text" className="img-detail"
                                            value={item.imageDetail1}
                                            placeholder="Изображение 1 для details"
                                            name="imageDetail1"
                                            onChange={getInpValue}
                                        />
                                        <input type="text" className="img-detail"
                                            value={item.imageDetail2}
                                            placeholder="Изображение 2 для details"
                                            name="imageDetail2"
                                            onChange={getInpValue}
                                        />
                                        <div className="detail-description__power">
                                            <input type="text" className="power-detail"
                                                value={item.strenght}
                                                placeholder="Указать Strenght"
                                                name="strenght"
                                                onChange={getInpValue}
                                            />
                                            <input type="text" className="power-detail"
                                                value={item.speed}
                                                placeholder="Указать Speed"
                                                name="speed"
                                                onChange={getInpValue}
                                            />
                                            <input type="text" className="power-detail"
                                                value={item.fighting}
                                                placeholder="Указать Fighting Skills"
                                                name="fighting"
                                                onChange={getInpValue}
                                            />
                                            <input type="text" className="power-detail"
                                                value={item.intelligence}
                                                placeholder="Указать Intelligence"
                                                name="intelligence"
                                                onChange={getInpValue}
                                            />
                                             <input type="text" className="power-detail"
                                                value={item.energy}
                                                placeholder="Указать Energy"
                                                name="energy"
                                                onChange={getInpValue}
                                            />
                                             <input type="text" className="power-detail"
                                                value={item.durability}
                                                placeholder="Указать Durability"
                                                name="durability"
                                                onChange={getInpValue}
                                            />
                                        </div>
                                    </div>
                                    <div className="select-inputs">
                                        <select className="character-class"
                                            name="type"
                                            value={item.type}
                                            onChange={getInpValue}
                                        >
                                            <option>---</option>
                                            <option value="Heroes">Heroes</option>
                                            <option value="Villains">Villains</option>
                                        </select>
                                        <select className="item-type"
                                            name="team"
                                            onChange={getInpValue}
                                            value={item.team}
                                        >
                                            <option>---</option>
                                            <option value="Avengers">Avengers</option>
                                            <option value="Guardians">Guardians</option>
                                            <option value="X-Men">X-Men</option>
                                        </select>
                                        <span>новинка?</span>
                                        <select className="new-item"
                                            name="latest"
                                            value={item.latest}
                                            onChange={getInpValue}
                                        >
                                            <option>---</option>
                                            <option value="yes">Да</option>
                                            <option value="">Нет</option>
                                        </select>
                                        <input type="text" className="img-latest"
                                            value={item.imageLatest}
                                            placeholder="Изображение для новинок"
                                            name="imageLatest"
                                            onChange={getInpValue}
                                        />
                                    </div>
                                    <div className="add-product__btn"
                                        onClick={handleClick}
                                    >Добавить
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {editModalFormStatus ? <ModalForEdit /> : null}
                    <MainProductSection />
                </div>
                : <div className="access-denied" />}
        </>
    );

};

export default AdminPanel;
