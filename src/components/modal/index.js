import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import * as yup from 'yup';

import { addGame, removeGame, updateGame } from '../../slices/gamesSlice';

// BEGIN (write your solution here)
const getModalInfo = {
  'add': {
    header: 'Добавить игру',
    handler: addGame,
    infoRequired: true,
    isRemovable: false,
  },
  'edit': {
    header: 'Редактировать игру',
    handler: updateGame,
    infoRequired: false,
    isRemovable: true,
  },
};


const AddModal = ({ handleModal, type, values = {} }) => {
  // console.log(type);
  const dispatch = useDispatch();
  const { header, handler, infoRequired, isRemovable } = getModalInfo[type];


  const gameSchema = yup.object().shape({
    name: yup.string().required('Required'),
    jpname: yup.string(),
    image: yup.string().required('Required'),
    platform: yup.string().required('Required'),
    region: yup.string().required('Required'),
    condition: yup.string(),
    kit: yup.string(),
    note: yup.string(),
  });

  const inputEl = useRef(null);
  const [isValid, setValidation] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      jpname: '',
      image: '',
      platform: '',
      region: '',
      condition: '',
      kit: [],
      note: '',
      ...values,
    },
    onSubmit: (values) => {
      console.log('Submitted');
      console.log(values);
      setValidation(false);

      try {
        dispatch(handler(values));
        handleModal(false);
      } catch (err) { 
        console.log('Got an error');
        console.log(err.message);
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleRemove = () => {
    dispatch(removeGame(values._id));
    handleModal(false);
  }

  const deleteButton = isRemovable && <button onClick={handleRemove} className="btn btn-outline-warning">Удалить игру</button>

  return (
    <Modal show onHide={() => handleModal('')}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              ref={inputEl}
              onChange={formik.handleChange}
              id="input-name"
              name="name"
              required={infoRequired}
              value={formik.values.name}
            />
            <label htmlFor="input-name">Название игры</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-jpname"
              name="jpname"
              value={formik.values.jpname}
            />
            <label htmlFor="input-jpname">Название на японском</label>
          </div>
          <div className="input-group mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-image"
              name="image"
              required={infoRequired}
              type="file"
              
            />
            <label className="input-group-text" htmlFor="input-image">Загрузить</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-platform"
              name="platform"
              required={infoRequired}
              value={formik.values.platform}
            />
            <label htmlFor="input-platform">Платформа</label>
          </div>
          <select name="region" required={infoRequired} onChange={formik.handleChange} className="form-select mb-3" aria-label="Other">
            <option>Регион</option>
            <option value="Japan">Япония</option>
            <option value="USA">США</option>
            <option value="Europe">Европа</option>
            <option value="Other">Другой регион</option>
          </select>
          <select name="condition" onChange={formik.handleChange} className="form-select mb-3" >
            <option>Состояние</option>
            <option value="Mint">Отличное</option>
            <option value="Good">Хорошее</option>
            <option value="Bad">Ужасное</option>
          </select>
          <select name="kit" onChange={formik.handleChange} className="form-select mb-3">
            <option value="Cartridge">Картридж</option>
            <option value="Disk">Диск</option>
            <option value="Box">Коробка</option>
            <option value="Manual">Руководство</option>
            <option value="Bonus">Бонусный комплект</option>
            <option value="Limited">Лимитированное издание</option>
          </select>
          <label className="form-label select-label">Комплектация</label>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-note"
              name="note"
              value={formik.values.note}
            />
            <label htmlFor="input-note">Дополнительно</label>
          </div>
          <input className="btn btn-primary" type="submit" value='Сохранить' />
          
        </form>
        {deleteButton}
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;