import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
const AddModal = ({ handleModal, handleAdd }) => {
  const inputEl = useRef(null);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      console.log('Submitted');
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <Modal show onHide={() => handleModal('')}>
      <Modal.Header closeButton>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              ref={inputEl}
              onChange={formik.handleChange}
              data-testid="input-body"
              name="body"
              required
              value={formik.values.body} />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;