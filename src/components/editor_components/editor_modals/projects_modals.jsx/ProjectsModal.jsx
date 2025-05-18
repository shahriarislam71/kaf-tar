import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Select, Divider, Spin, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
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

const ProjectsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Sample industries for dropdown
  const industries = [
    'Healthcare',
    'Education',
    'Logistics',
    'Commercial',
    'Government',
    'Retail',
    'Hospitality',
    'Manufacturing'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/projects/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue({ projects: data });
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Set default values if API fails
        form.setFieldsValue({
          projects: [
            {
              id: 1,
              title: "Riyadh Hospital FM",
              industry: "Healthcare",
              scope: [
                "24/7 facility maintenance",
                "HVAC system optimization",
                "Professional cleaning services"
              ],
              outcomes: [
                "30% operational cost reduction",
                "Zero critical system downtime"
              ]
            }
          ]
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

      const response = await fetch(`${apiUrl}/projects/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.projects),
      });

      if (!response.ok) throw new Error("Failed to save");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Projects Updated Successfully",
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
          Manage Projects
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
          {saving ? "Saving..." : "Save Changes"}
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
              title="Featured Projects" 
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
              <Form.List name="projects">
                {(fields, { add, remove }) => (
                  <div className="space-y-6">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        className="border rounded-xl p-6 hover:shadow-md transition-all"
                        style={{ 
                          borderColor: COLORS.border,
                          background: index % 2 === 0 ? '#f9f9f9' : 'white'
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg" style={{ color: COLORS.primary }}>
                            Project {index + 1}
                          </h4>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                            style={{ color: '#ff4d4f' }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label={<span className="font-medium" style={{ color: COLORS.textDark }}>Project Title</span>}
                              rules={[{ required: true, message: 'Please enter project title' }]}
                            >
                              <Input
                                placeholder="Riyadh Hospital FM"
                                className="rounded-lg h-10"
                                style={{ borderColor: COLORS.border }}
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'industry']}
                              label={<span className="font-medium" style={{ color: COLORS.textDark }}>Industry</span>}
                              rules={[{ required: true, message: 'Please select industry' }]}
                            >
                              <Select
                                placeholder="Select industry"
                                className="rounded-lg h-10"
                                style={{ width: '100%' }}
                              >
                                {industries.map(ind => (
                                  <Select.Option key={ind} value={ind}>
                                    {ind}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <div>
                            <Form.Item
                              {...restField}
                              name={[name, 'scope']}
                              label={<span className="font-medium" style={{ color: COLORS.textDark }}>Scope of Work</span>}
                              rules={[{ required: true, message: 'Please add at least one scope item' }]}
                            >
                              <Select
                                mode="tags"
                                placeholder="Add scope items"
                                className="rounded-lg"
                                style={{ width: '100%' }}
                                tokenSeparators={[',']}
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'outcomes']}
                              label={<span className="font-medium" style={{ color: COLORS.textDark }}>Key Outcomes</span>}
                              rules={[{ required: true, message: 'Please add at least one outcome' }]}
                            >
                              <Select
                                mode="tags"
                                placeholder="Add outcome items"
                                className="rounded-lg"
                                style={{ width: '100%' }}
                                tokenSeparators={[',']}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add({
                        title: '',
                        industry: '',
                        scope: [],
                        outcomes: []
                      })}
                      icon={<PlusOutlined />}
                      block
                      className="h-12 rounded-xl mt-4 flex items-center justify-center"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primaryDark,
                        fontWeight: '500',
                        fontSize: '16px'
                      }}
                    >
                      Add New Project
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

export default ProjectsModal;