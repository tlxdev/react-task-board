import { Badge, Button, Divider, Form, Input, Row, Select, Typography } from 'antd';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSettings, useTasks } from '../entities';

const { Title } = Typography;

const AVAILABLE_COLORS = ['red', 'green', 'orange', 'yellow', 'blue'];

const capitalizeFirstLetter = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ColumnEditor = () => {
  const { index } = useParams();
  const [settings] = useSettings();
  const navigate = useNavigate();

  const [storeData, { editColumn }] = useTasks();

  const columns = storeData?.columns;

  const column = columns?.[index];

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: column?.name,
      color: column?.color
    });
  }, []);

  const onSaveChanges = () => {
    const values = form.getFieldsValue();
    editColumn(index, values);
    navigate('/settings');
  };

  return (
    <div className={classNames('popover', { dark: settings.darkMode })}>
      <Row className="centered">
        <div className="task-form">
          <Form form={form} labelCol={{ span: 24 }}>
            <Title level={4}>Edit column #{Number(index) + 1}</Title>
            <Divider />

            <Form.Item name="name" label="Column name">
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item name="color" label="Color:">
              <Select style={{ width: 110 }}>
                {AVAILABLE_COLORS.map((color) => (
                  <Select.Option value={color}>
                    <Badge color={color} />
                    {capitalizeFirstLetter(color)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Row type="flex" justify="end">
              <Button type="primary" onClick={onSaveChanges}>
                Save
              </Button>
            </Row>
          </Form>
        </div>
      </Row>
    </div>
  );
};
