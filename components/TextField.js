/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { Form } from "rsuite";

const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control
        name={name}
        accepter={accepter}
        errorMessage={error}
        {...rest}
      />
    </Form.Group>
  );
});
export { TextField };
