import React, { useEffect, useRef, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import * as yup from 'yup';
import AppContext from '../app-context';

// BEGIN (write your solution here)
const AddModal = ({ handleModal, type, values = {} }) => {
  // console.log(type);

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

  const { dbService } = useContext(AppContext);
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
    validationSchema: gameSchema,
    onSubmit: (values) => {
      console.log('Submitted');
      setValidation(false);

      try {
        dbService.addGame(values);
      } catch (err) { 
        console.log('Got an error');
        console.log(err.message);
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const saveBtnValue= type === 'add' ? 'Добавить игру' : 'Сохранить';

  return (
    <Modal show onHide={() => handleModal('')}>
      <Modal.Header closeButton>
        <Modal.Title>{saveBtnValue}</Modal.Title>
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
              required
              value={formik.values.name}
              isValid={isValid} 
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
              isValid={isValid} 
            />
            <label htmlFor="input-jpname">Название на японском</label>
          </div>
          <div className="input-group mb-3">
            <input
              className="form-control"
              onChange={formik.handleChange}
              id="input-image"
              name="image"
              required
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
              required
              value={formik.values.platform}
              isValid={isValid} 
            />
            <label htmlFor="input-platform">Платформа</label>
          </div>
          <select className="form-select mb-3" aria-label="Other">
            <option selected>Регион</option>
            <option value="Japan">Япония</option>
            <option value="USE">США</option>
            <option value="Europe">Европа</option>
            <option value="Other">Другой регион</option>
          </select>
          <select className="form-select mb-3" >
            <option>Состояние</option>
            <option value="Mint">Отличное</option>
            <option value="Good">Хорошее</option>
            <option value="Bad">Ужасное</option>
          </select>
          <select className="form-select mb-3">
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
              isValid={isValid} 
            />
            <label htmlFor="input-note">Дополнительно</label>
          </div>
          <input className="btn btn-primary" type="submit" value={saveBtnValue} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;