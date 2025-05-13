import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Select, Divider, TimePicker, Spin, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

// KAF TAR Brand Colors
const COLORS = {
  primary: '#7bbf42',       // Vibrant green
  primaryDark: '#5a9e2d',   // Darker green
  secondary: '#f9b414',     // Yellow
  accent: '#70308c',        // Purple
  textDark: '#040404',      // Dark black
  textLight: '#ffffff',     // White
  backgroundLight: '#ffffff',
  border: '#e0e0e0',       // Light gray border
};

const Contact1Modal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Sample services for dropdown
  const serviceOptions = [
    'Facility Management',
    'Manpower Services',
    'Cleaning Services',
    'Technical Maintenance',
    'Logistics Support',
    'HVAC Maintenance',
    'Electrical Services',
    'Other'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/contact/contact1/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        // Set default values if API fails
        form.setFieldsValue({
          sectionTitle: "Get In Touch",
          sectionSubtitle: "We're ready to assist you with your facility management needs",
          contactInfo: {
            phone: "+966 56 705 5580",
            email: "info@kaftaroperations.com",
            address: "9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia"
          },
          formFields: [
            { name: "fullName", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email Address", type: "email", required: true },
            { name: "phone", label: "Phone Number", type: "tel" },
            { 
              name: "serviceInterest", 
              label: "Service Interest", 
              type: "select", 
              options: serviceOptions 
            },
            { name: "message", label: "Your Message", type: "textarea", required: true }
          ],
          workingHours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
          colors: {
            primary: COLORS.primary,
            secondary: COLORS.secondary,
            accent: COLORS.accent
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();

      const response = await fetch(`${apiUrl}/contact/contact1/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contact Section Updated",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
    } catch (error) {
      message.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={
        <span className="text-2xl font-bold" style={{ color: COLORS.primaryDark }}>
          Edit Contact Section
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      width={900}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          disabled={saving}
          className="h-10 px-6 rounded-lg"
          style={{ 
            borderColor: COLORS.primary,
            color: COLORS.primary
          }}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          loading={saving}
          className="h-10 px-6 rounded-lg font-medium"
          style={{
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primaryDark,
            color: COLORS.textLight
          }}
        >
          Save Changes
        </Button>,
      ]}
      destroyOnClose
      className="rounded-xl overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <div className="p-6">
            <Card 
              title="Header Content" 
              bordered={false}
              className="rounded-xl mb-6"
              headStyle={{ 
                background: `linear-gradient(90deg, ${COLORS.primary}20, ${COLORS.accent}20)`,
                borderBottom: `1px solid ${COLORS.border}`,
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.primaryDark
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Form.Item
                name="sectionTitle"
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Section Title</span>}
                rules={[{ required: true, message: 'Please enter the title' }]}
              >
                <Input
                  placeholder="Get In Touch"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>

              <Form.Item
                name="sectionSubtitle"
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Subtitle</span>}
                rules={[{ required: true, message: 'Please enter the subtitle' }]}
              >
                <Input
                  placeholder="We're ready to assist you..."
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Card>

            <Card 
              title="Contact Information" 
              bordered={false}
              className="rounded-xl mb-6"
              headStyle={{ 
                background: `linear-gradient(90deg, ${COLORS.primary}20, ${COLORS.accent}20)`,
                borderBottom: `1px solid ${COLORS.border}`,
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.primaryDark
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Form.Item
                name={['contactInfo', 'phone']}
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Phone Number</span>}
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input
                  placeholder="+966 56 705 5580"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>

              <Form.Item
                name={['contactInfo', 'email']}
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Email Address</span>}
                rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}
              >
                <Input
                  placeholder="info@kaftaroperations.com"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>

              <Form.Item
                name={['contactInfo', 'address']}
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Address</span>}
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <TextArea
                  rows={2}
                  placeholder="9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia"
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>

              <Form.Item
                name="workingHours"
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Working Hours</span>}
                rules={[{ required: true, message: 'Please enter working hours' }]}
              >
                <Input
                  placeholder="Sunday - Thursday: 8:00 AM - 5:00 PM"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Card>

            <Card 
              title="Contact Form Fields" 
              bordered={false}
              className="rounded-xl mb-6"
              headStyle={{ 
                background: `linear-gradient(90deg, ${COLORS.primary}20, ${COLORS.accent}20)`,
                borderBottom: `1px solid ${COLORS.border}`,
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.primaryDark
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Form.List name="formFields">
                {(fields, { add, remove }) => (
                  <div className="space-y-6">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        className="border rounded-xl p-4 hover:shadow-md transition-all"
                        style={{ 
                          borderColor: COLORS.border,
                          background: index % 2 === 0 ? '#f9f9f9' : 'white'
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium" style={{ color: COLORS.primary }}>Field {index + 1}</h4>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                            style={{ color: '#ff4d4f' }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Field Name</span>}
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Input
                              placeholder="e.g., fullName"
                              className="rounded-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'label']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Field Label</span>}
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Input
                              placeholder="e.g., Full Name"
                              className="rounded-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Field Type</span>}
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Select
                              placeholder="Select type"
                              className="rounded-lg"
                              style={{ width: '100%' }}
                            >
                              <Option value="text">Text</Option>
                              <Option value="email">Email</Option>
                              <Option value="tel">Phone</Option>
                              <Option value="select">Dropdown</Option>
                              <Option value="textarea">Text Area</Option>
                            </Select>
                          </Form.Item>
                        </div>

                        <Form.Item
                          {...restField}
                          name={[name, 'required']}
                          label={<span className="font-medium" style={{ color: COLORS.textDark }}>Required Field</span>}
                          valuePropName="checked"
                        >
                          <Select
                            placeholder="Is this field required?"
                            className="rounded-lg"
                            style={{ width: '100%' }}
                          >
                            <Option value={true}>Yes</Option>
                            <Option value={false}>No</Option>
                          </Select>
                        </Form.Item>

                        {/* Options for select fields */}
                        {form.getFieldValue(['formFields', index, 'type']) === 'select' && (
                          <Form.Item
                            {...restField}
                            name={[name, 'options']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Dropdown Options</span>}
                            rules={[{ required: true, message: 'Please add options' }]}
                          >
                            <Select
                              mode="tags"
                              placeholder="Add options"
                              className="rounded-lg"
                              style={{ width: '100%' }}
                              tokenSeparators={[',']}
                            >
                              {serviceOptions.map(option => (
                                <Option key={option} value={option}>{option}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add({
                        name: '',
                        label: '',
                        type: 'text',
                        required: false
                      })}
                      icon={<PlusOutlined />}
                      block
                      className="h-12 rounded-xl mt-4"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primaryDark,
                        fontWeight: '500'
                      }}
                    >
                      Add Form Field
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>

            <Card 
              title="Color Scheme" 
              bordered={false}
              className="rounded-xl"
              headStyle={{ 
                background: `linear-gradient(90deg, ${COLORS.primary}20, ${COLORS.accent}20)`,
                borderBottom: `1px solid ${COLORS.border}`,
                fontSize: '18px',
                fontWeight: '600',
                color: COLORS.primaryDark
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Form.Item name={['colors', 'primary']} label={<span className="font-medium" style={{ color: COLORS.textDark }}>Primary Color</span>}>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="color" 
                      className="w-16 h-10 cursor-pointer" 
                      style={{ borderRadius: '8px' }}
                    />
                    <span className="text-sm" style={{ color: COLORS.textDark }}>Buttons, Headings</span>
                  </div>
                </Form.Item>
                <Form.Item name={['colors', 'secondary']} label={<span className="font-medium" style={{ color: COLORS.textDark }}>Secondary Color</span>}>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="color" 
                      className="w-16 h-10 cursor-pointer" 
                      style={{ borderRadius: '8px' }}
                    />
                    <span className="text-sm" style={{ color: COLORS.textDark }}>Accents, Highlights</span>
                  </div>
                </Form.Item>
                <Form.Item name={['colors', 'accent']} label={<span className="font-medium" style={{ color: COLORS.textDark }}>Accent Color</span>}>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="color" 
                      className="w-16 h-10 cursor-pointer" 
                      style={{ borderRadius: '8px' }}
                    />
                    <span className="text-sm" style={{ color: COLORS.textDark }}>Special Elements</span>
                  </div>
                </Form.Item>
              </div>
            </Card>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Contact1Modal;