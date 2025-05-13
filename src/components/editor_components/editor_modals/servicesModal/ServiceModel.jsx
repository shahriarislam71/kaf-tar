import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Upload, Collapse, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Panel } = Collapse;
const { TextArea } = Input;

// KAF TAR company colors
const COLORS = {
  primary: '#7bbf42', // Vibrant green
  secondary: '#f9b414', // Yellow
  dark: '#040404', // Dark text
  accent: '#70308c', // Purple
  light: '#ffffff', // White
};

const ServiceModel = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activePanels, setActivePanels] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Icons for service phases
  const phaseIcons = [
    { value: 'consultation', label: 'Consultation', emoji: '💬' },
    { value: 'kickoff', label: 'Kickoff', emoji: '🚀' },
    { value: 'performance', label: 'Performance', emoji: '📊' },
    { value: 'support', label: 'Support', emoji: '🛟' },
    { value: 'planning', label: 'Planning', emoji: '📝' },
    { value: 'execution', label: 'Execution', emoji: '🏗️' },
    { value: 'monitoring', label: 'Monitoring', emoji: '👀' },
    { value: 'delivery', label: 'Delivery', emoji: '📦' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/service-model/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Sample data structure if API is not ready
        const data = await response.json() || {
          sectionTitle: "Our Service Model",
          sectionSubtitle: "A proven approach to facility management excellence",
          phases: [
            {
              title: "Client Consultation",
              description: "Open dialogue to understand your specific needs and requirements",
              icon: "consultation",
              features: ["Needs assessment", "Open-book costing", "Transparent pricing", "Customized solutions"]
            },
            {
              title: "Service Kickoff",
              description: "Dedicated project team assigned to your account",
              icon: "kickoff",
              features: ["Dedicated manager", "Site assessment", "SLA establishment", "Team onboarding"]
            },
            {
              title: "Performance Delivery",
              description: "Continuous monitoring and improvement of services",
              icon: "performance",
              features: ["Regular reporting", "Quality audits", "Budget tracking", "Process optimization"]
            },
            {
              title: "Cross-Team Support",
              description: "Full organizational backing for your facility needs",
              icon: "support",
              features: ["24/7 availability", "Regulatory compliance", "Multi-disciplinary teams", "Scalable resources"]
            }
          ],
          keyBenefits: [
            "Single point of accountability",
            "Cost-efficient solutions",
            "Nationwide coverage",
            "Proprietary technology"
          ]
        };
        
        form.setFieldsValue(data);
        // Expand all phase panels by default
        setActivePanels(data.phases?.map((_, index) => index.toString()) || []);
      } catch (error) {
        message.error('Failed to load service model data');
        console.error(error);
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
      
      const response = await fetch(`${apiUrl}/service-model/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Service Model Updated",
        showConfirmButton: false,
        timer: 2000,
        background: COLORS.light,
        color: COLORS.dark,
      });
      onClose();
    } catch (error) {
      message.error('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <span className="text-2xl font-bold" style={{ color: COLORS.dark }}>
            Edit Service Model
          </span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button 
          key="cancel" 
          onClick={onClose} 
          disabled={saving} 
          className="px-6 h-10 rounded-lg font-medium"
          style={{ 
            borderColor: COLORS.dark, 
            color: COLORS.dark,
            backgroundColor: COLORS.light
          }}
        >
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          loading={saving}
          style={{ 
            backgroundColor: COLORS.primary, 
            borderColor: COLORS.primary,
            color: COLORS.light
          }}
          className="px-6 h-10 rounded-lg font-medium hover:opacity-90"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>,
      ]}
      destroyOnClose
      className="rounded-xl overflow-hidden"
      bodyStyle={{ padding: '24px' }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" className="space-y-6">
          {/* Section Header */}
          <Card 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <div className="space-y-4">
              <Form.Item
                name="sectionTitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Section Title</span>}
                rules={[{ required: true, message: 'Please enter section title' }]}
              >
                <Input 
                  placeholder="Our Service Model" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name="sectionSubtitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Section Subtitle</span>}
                rules={[{ required: true, message: 'Please enter section subtitle' }]}
              >
                <Input 
                  placeholder="A proven approach to facility management excellence" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          {/* Service Phases */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Service Phases</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="phases">
              {(fields, { add, remove, move }) => (
                <Collapse 
                  activeKey={activePanels}
                  onChange={setActivePanels}
                  bordered={false}
                  className="bg-white"
                >
                  {fields.map(({ key, name, ...restField }) => {
                    const phaseIcon = form.getFieldValue(['phases', name, 'icon']);
                    const iconData = phaseIcons.find(icon => icon.value === phaseIcon) || phaseIcons[0];
                    
                    return (
                      <Panel 
                        header={
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{iconData.emoji}</span>
                            <span className="font-medium">
                              {form.getFieldValue(['phases', name, 'title']) || `Phase ${name + 1}`}
                            </span>
                          </div>
                        }
                        key={name.toString()}
                        extra={
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(name);
                            }}
                            style={{ color: '#ff4d4f' }}
                          />
                        }
                        className="mb-3 border border-gray-200 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3">
                            <Form.Item
                              {...restField}
                              name={[name, 'icon']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                              rules={[{ required: true, message: 'Please select an icon' }]}
                            >
                              <Select 
                                placeholder="Select icon" 
                                className="w-full"
                              >
                                {phaseIcons.map(icon => (
                                  <Select.Option key={icon.value} value={icon.value}>
                                    <div className="flex items-center">
                                      <span className="text-xl mr-2">{icon.emoji}</span>
                                      <span>{icon.label}</span>
                                    </div>
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="md:col-span-9 space-y-4">
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Title</span>}
                              rules={[{ required: true, message: 'Please enter title' }]}
                            >
                              <Input 
                                placeholder="Client Consultation" 
                                className="rounded-lg hover:border-green-500 focus:border-green-500"
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Description</span>}
                              rules={[{ required: true, message: 'Please enter description' }]}
                            >
                              <TextArea 
                                rows={3} 
                                placeholder="Open dialogue to understand your specific needs and requirements" 
                                className="rounded-lg hover:border-green-500 focus:border-green-500"
                              />
                            </Form.Item>

                            <Form.Item
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Features</span>}
                            >
                              <Form.List name={[name, 'features']}>
                                {(features, { add: addFeature, remove: removeFeature }) => (
                                  <div className="space-y-3">
                                    {features.map(({ key: featureKey, name: featureName, ...featureRestField }) => (
                                      <div key={featureKey} className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary }}>
                                          <span className="text-white text-xs">✓</span>
                                        </div>
                                        <Form.Item
                                          {...featureRestField}
                                          name={[featureName]}
                                          rules={[{ required: true, message: 'Please enter feature text' }]}
                                          className="flex-grow mb-0"
                                        >
                                          <Input 
                                            placeholder="Needs assessment" 
                                            className="rounded-lg hover:border-green-500 focus:border-green-500"
                                          />
                                        </Form.Item>
                                        <Button
                                          type="text"
                                          danger
                                          icon={<DeleteOutlined />}
                                          onClick={() => removeFeature(featureName)}
                                          className="rounded-lg"
                                        />
                                      </div>
                                    ))}
                                    <Button
                                      type="dashed"
                                      onClick={() => addFeature('')}
                                      icon={<PlusOutlined />}
                                      block
                                      className="rounded-lg h-10 mt-2"
                                      style={{ 
                                        borderColor: COLORS.secondary,
                                        color: COLORS.secondary,
                                        backgroundColor: `${COLORS.secondary}10` // 10% opacity
                                      }}
                                    >
                                      Add Feature
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </Form.Item>
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              )}
            </Form.List>

            <Button
              type="dashed"
              onClick={() => {
                const newIndex = form.getFieldValue('phases')?.length || 0;
                form.setFieldsValue({
                  phases: [
                    ...(form.getFieldValue('phases') || []),
                    {
                      title: `New Phase ${newIndex + 1}`,
                      description: '',
                      icon: 'consultation',
                      features: []
                    }
                  ]
                });
                setActivePanels([...activePanels, newIndex.toString()]);
              }}
              icon={<PlusOutlined />}
              block
              className="mt-4 rounded-lg h-10"
              style={{ 
                borderColor: COLORS.accent,
                color: COLORS.accent,
                backgroundColor: `${COLORS.accent}10` // 10% opacity
              }}
            >
              Add Service Phase
            </Button>
          </Card>

          {/* Key Benefits */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Key Benefits</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="keyBenefits">
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.secondary }}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <Form.Item
                        {...restField}
                        name={[name]}
                        rules={[{ required: true, message: 'Please enter benefit text' }]}
                        className="flex-grow mb-0"
                      >
                        <Input 
                          placeholder="Single point of accountability" 
                          className="rounded-lg hover:border-green-500 focus:border-green-500"
                        />
                      </Form.Item>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add('')}
                    icon={<PlusOutlined />}
                    block
                    className="rounded-lg h-10 mt-2"
                    style={{ 
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                      backgroundColor: `${COLORS.primary}10` // 10% opacity
                    }}
                  >
                    Add Key Benefit
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ServiceModel;