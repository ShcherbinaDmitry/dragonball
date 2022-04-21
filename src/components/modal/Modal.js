import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import * as yup from 'yup';
import cn from 'classnames';

import { addGame, removeGame, updateGame, uploadImage } from '../../slices/gamesSlice';

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

const kitValues = [
  { name: 'Картридж', value: 'Cartridge'},
  { name: 'Диск', value: 'Disk'},
  { name: 'Коробка', value: 'Box'},
  { name: 'Бонусный комплект', value: 'Bonus'},
  { name: 'Руководство', value: 'Manual'},
  { name: 'Лимитированное издание', value: 'Limited'},
  
];

const ModalComponent = ({ handleModal, type, values = {} }) => {
  const imageFormats = ["image/png", "image/svg", "image/jpeg"];
  const dispatch = useDispatch();
  const { header, handler, infoRequired, isRemovable } = getModalInfo[type];
  const inputEl = useRef(null);
  const [isInvalid, setValidation] = useState(false);
  const [file, setFileData] = useState(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleRemove = () => {
    dispatch(removeGame(values._id));
    handleModal(false);
  };

  const handleMultiselect = (selected) => {
    const stringValues = selected.map((kit) => kit.value);
    
    formik.setFieldValue('kit', stringValues);
  };

  const handleImageChange = (e) => {
    setFileData(e.target.files[0]);
    formik.setFieldValue('image', e.target.files[0].name);
  }

  const gameSchema = yup.object().shape({
    name: yup.string().min(6).required('Required'),
    jpname: yup.string(),
    image: yup.string().required('Required'),
    platform: yup.string().required('Required'),
    region: yup.string().required('Required'),
    condition: yup.string(),
    kit: yup.array(),
    note: yup.string(),
  });

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
      // formik.validateForm();


      const data = new FormData();
      data.append('image', file);
      setValidation(false);

      try {
        dispatch(handler(values));
        dispatch(uploadImage(data))
        handleModal(false);
      } catch (err) { 
        setValidation(true);
      }
    },
  });

  const deleteButton = isRemovable && <button onClick={handleRemove} className="btn btn-outline-danger m-3">Удалить игру</button>

  return (
    <Modal show onHide={() => handleModal('')}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
          
          <div className="form-floating mb-3">
            <input
              className={cn('form-control', {'is-invalid': isInvalid })}
              ref={inputEl}
              onChange={formik.handleChange}
              id="name"
              name="name"
              required
              value={formik.values.name}

            />
            <label htmlFor="name">Название игры</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-jpname"
              name="jpname"
              value={formik.values.jpname}
            />
            <label htmlFor="jpname">Название на японском</label>
          </div>

          <div className="input-group mb-3">
            <input
              
              className="form-control"
              
              onChange={handleImageChange}
              id="image"
              name="image"
              required={infoRequired}
              type="file"
            />
            <label className="input-group-text" htmlFor="image">Загрузить</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="platform"
              name="platform"
              required={infoRequired}
              value={formik.values.platform}
            />
            <label htmlFor="input-platform">Платформа</label>
          </div>

          <label htmlFor="region" className="form-label select-label">Регион</label>
          <select
            value={formik.values.region}
            name="region"
            id="region"
            required={infoRequired}
            onChange={formik.handleChange}
            className="form-select mb-3"
            >
            <option value="">Выберите регион</option>
            <option value="Europe">Европа</option>
            <option value="Japan">Япония</option>
            <option value="USA">США</option>
            <option value="Other">Другой регион</option>
          </select >

          <label htmlFor="condition" className="form-label select-label">Состояние</label>
          <select value={formik.values.condition} name="condition" id="condition" onChange={formik.handleChange} className="form-select mb-3" >
            <option value="">Состояние</option>
            <option value="Mint">Отличное</option>
            <option value="Good">Хорошее</option>
            <option value="Bad">Ужасное</option>
          </select>
          
          <label htmlFor="kit" className="form-label select-label">Комплектация</label>
          <Multiselect
            className="mb-3"
            options={kitValues}
            onSelect={handleMultiselect}
            onRemove={handleMultiselect}
            placeholder="Комплектация"
            selectedValues={kitValues.filter((kit) => formik.initialValues.kit.includes(kit.value))}
            displayValue="name"
            name="kit"
            id="kit"
            value={formik.values.kit}
          />
          
          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="note"
              name="note"

              value={formik.values.note}
            />
            <label htmlFor="input-note">Дополнительно</label>
          </div>
          
          <input className="btn btn-outline-primary m-3 col-4" type="submit" value='Сохранить' />
          {deleteButton}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;