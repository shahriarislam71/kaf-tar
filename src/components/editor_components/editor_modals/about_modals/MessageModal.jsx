import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Upload, Card, Select, Space, Spin } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { HexColorPicker } from 'react-colorful';
import Swal from 'sweetalert2';

const { TextArea } = Input;

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

const MessageModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [colorPicker, setColorPicker] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Sample icons for core values
  const valueIcons = [
    { value: 'improvement', label: 'Continuous Improvement' },
    { value: 'quality', label: 'Quality Control' },
    { value: 'customer', label: 'Customer Focus' },
    { value: 'accountability', label: 'Accountability' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'safety', label: 'Safety' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/about/core-values/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set default values if API fails
        form.setFieldsValue({
          sectionTitle: "Our Quality Policy",
          sectionSubtitle: "Commitment to excellence in every service",
          policyStatement: "KAF TAR focuses on product quality for continuous improvement...",
          coreValues: [
            { title: "Continuous Improvement", description: "Regularly enhancing our processes", icon: "improvement" },
            { title: "Quality Control", description: "Rigorous monitoring at all stages", icon: "quality" }
          ],
          certifications: ["ISO 9001 Certified", "Saudi Aramco Approved"]
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
      
      const response = await fetch(`${apiUrl}/about/core-values/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Quality Policy Updated",
        showConfirmButton: false,
        timer: 3000,
      });
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (color, field) => {
    form.setFieldsValue({ [field]: color });
  };

  return (
    <Modal
      title={
        <span className="text-2xl font-bold" style={{ color: COLORS.primaryDark }}>
          Edit Quality Policy
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
              title="Section Header" 
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
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Title</span>}
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input
                  placeholder="Our Quality Policy"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>

              <Form.Item
                name="sectionSubtitle"
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Subtitle</span>}
              >
                <Input
                  placeholder="Commitment to excellence in every service"
                  className="rounded-lg h-12"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Card>

            <Card 
              title="Policy Statement" 
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
                name="policyStatement"
                rules={[{ required: true, message: 'Please enter the policy statement' }]}
              >
                <TextArea
                  rows={6}
                  placeholder="Enter the detailed quality policy statement..."
                  className="rounded-lg"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Card>

            <Card 
              title="Core Values" 
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
              <Form.List name="coreValues">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'title']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Title</span>}
                            rules={[{ required: true, message: 'Title is required' }]}
                          >
                            <Input
                              placeholder="Value title"
                              className="rounded-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'icon']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Icon</span>}
                          >
                            <Select
                              placeholder="Select icon"
                              className="rounded-lg"
                              style={{ width: '100%' }}
                            >
                              {valueIcons.map(icon => (
                                <Select.Option key={icon.value} value={icon.value}>
                                  {icon.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label={<span className="font-medium" style={{ color: COLORS.textDark }}>Description</span>}
                          rules={[{ required: true, message: 'Description is required' }]}
                        >
                          <Input
                            placeholder="Value description"
                            className="rounded-lg"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>

                        <div className="flex justify-end">
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                            style={{ color: '#ff4d4f' }}
                          >
                            Remove Value
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                      className="h-12 rounded-xl mt-4"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primaryDark,
                        fontWeight: '500'
                      }}
                    >
                      Add Core Value
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>

            <Card 
              title="Certifications" 
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
              <Form.List name="certifications">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div key={key} className="flex items-center gap-4">
                        <Form.Item
                          {...restField}
                          name={name}
                          className="flex-grow mb-0"
                          rules={[{ required: true, message: 'Certification is required' }]}
                        >
                          <Input
                            placeholder="Certification (e.g., ISO 9001 Certified)"
                            className="rounded-lg"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: '#ff4d4f' }}
                        />
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                      className="h-12 rounded-xl mt-4"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primaryDark,
                        fontWeight: '500'
                      }}
                    >
                      Add Certification
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default MessageModal;