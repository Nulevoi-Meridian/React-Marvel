import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/ProductsContext';
import './ModalForEdit.css';

const ModalForEdit = () => {

    const { editProduct, editedProductData } = useContext(productsContext);
    const [editedProduct, setEditedProduct] = useState(editProduct);

    useEffect(() => {
        setEditedProduct(editProduct);
    }, [editProduct])

    const getInpValue = (e) => {
        const newValue = {
            ...editedProduct,
            [e.target.name]: e.target.value
        }
        setEditedProduct(newValue);
    }

    return (
        <div className="edit-modal">
            <div className="edit-product">
                <div className="edit-product__title">
                    <span>Редактирование товара</span>
                    <div className="edit-product__item">
                        <span>Редактировать заголовок</span>
                        <input type="text" className="edit-title"
                            value={editedProduct?.title || ''}
                            name="title"
                            onChange={getInpValue}
                        />
                        <span>Редактировать краткое описание</span>
                        <textarea type="text" className="edit-description"
                            value={editedProduct?.description || ''}
                            name="description"
                            onChange={getInpValue}
                        />
                        <span>Редактировать цену</span>
                        <input type="text" className="edit-price"
                            value={editedProduct?.price || ''}
                            name="price"
                            onChange={getInpValue}
                        />
                        <span>Изменить изображение</span>
                        <input type="text" className="edit-img"
                            value={editedProduct?.image || ''}
                            name="image"
                            onChange={getInpValue}
                        />
                        <div className="edit-product__item-details">
                            <span>Изменить изображение 1 в details</span>
                            <input type="text"
                                value={editedProduct?.imageDetail1 || ''}
                                name="imageDetail1"
                                onChange={getInpValue}
                            />
                            <span>Изменить изображение 2 в details</span>
                            <input type="text" className="img-detail"
                                value={editedProduct?.imageDetail2 || ''}
                                name="imageDetail2"
                                onChange={getInpValue}
                            />
                            <span>Характеристики</span>
                            <div className="detail-description__power">
                            <span>Изменить Strenght</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.strenght || ''}
                                    name="strenght"
                                    onChange={getInpValue}
                                />
                                <span>Изменить Speed</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.speed || ''}
                                    name="speed"
                                    onChange={getInpValue}
                                />
                                <span>Изменить Fighting Skills</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.fighting || ''}
                                    name="fighting"
                                    onChange={getInpValue}
                                />
                                <span>Изменить Intelligence</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.intelligence || ''}
                                    name="intelligence"
                                    onChange={getInpValue}
                                />
                                <span>Изменить Energy</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.energy || ''}
                                    name="energy"
                                    onChange={getInpValue}
                                />
                                <span>Изменить Durability</span>
                                <input type="text" className="power-detail"
                                    value={editedProduct?.durability || ''}
                                    name="durability"
                                    onChange={getInpValue}
                                />
                            </div>
                        </div>
                        <span>Изменить класс и подкласс</span>
                        <select className="edit-character-class" name="type"
                            value={editedProduct?.type || ''}
                            onChange={getInpValue}
                        >
                            <option>---</option>
                            <option value="Heroes">Heroes</option>
                            <option value="Villains">Villains</option>
                        </select>
                        <select className="edit-item-type" name="team"
                            value={editedProduct?.team || ''}
                            onChange={getInpValue}
                        >
                            <option>---</option>
                            <option value="Avengers">Avengers</option>
                            <option value="Guardians">Guardians</option>
                            <option value="X-Men">X-Men</option>
                        </select>
                        <span>новинка?</span>
                        <select className="edit-new-item"
                            name="latest"
                            value={editedProduct?.latest || ''}
                            onChange={getInpValue}
                        >
                            <option>---</option>
                            <option value="">Нет</option>
                            <option value="yes">Да</option>
                        </select>
                        <span>Изменить изображение для новинок</span>
                        <input type="text" className="edit-img-latest"
                            value={editedProduct?.imageLatest || ''}
                            name="imageLatest"
                            onChange={getInpValue}
                        />
                        <div className="edit-product__btn"
                            onClick={() => { editedProductData(editedProduct) }}
                        >Сохранить изменения
                            </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ModalForEdit;