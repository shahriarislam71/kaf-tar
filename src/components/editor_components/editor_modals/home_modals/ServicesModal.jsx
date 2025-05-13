import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Select, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

// KAF TAR company colors
const COLORS = {
  primary: '#7bbf42', // Vibrant green
  secondary: '#f9b414', // Yellow
  dark: '#040404', // Dark text
  accent: '#70308c', // Purple
  light: '#ffffff', // White
  success: '#2ECC71',
  danger: '#E74C3C',
};

// Construction-themed emoji icons with KAF TAR color backgrounds
const emojiIcons = {
  '👷': { label: 'Construction', bg: '#f0f7e8' }, // Light green
  '🏗️': { label: 'Building', bg: '#fef5e7' }, // Light yellow
  '🔨': { label: 'Carpentry', bg: '#f5e8f7' }, // Light purple
  '⚡': { label: 'Electrical', bg: '#e8f5f7' }, // Light blue
  '🚿': { label: 'Plumbing', bg: '#e8f7ed' }, // Light mint
  '🧱': { label: 'Masonry', bg: '#f7e8e8' }, // Light red
  '🔧': { label: 'Maintenance', bg: '#e8e8f7' }, // Light indigo
  '🏠': { label: 'Residential', bg: '#f7f7e8' }, // Light beige
  '🏢': { label: 'Commercial', bg: '#e8f7f7' }, // Light cyan
};

const ServicesModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Sample categories data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Hard Services', slug: 'hard' },
    { id: 2, name: 'Soft Services', slug: 'soft' },
    { id: 3, name: 'Specialized', slug: 'specialized' },
    { id: 4, name: 'Support', slug: 'support' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/services/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Sample data structure if API is not ready
        const data = await response.json() || {
          services: [
            { id: 1, title: "Manpower Support", description: "Comprehensive workforce solutions tailored to your operational needs.", icon: "👷", category: "support" },
            { id: 2, title: "HVAC Systems", description: "Expert installation and maintenance of heating, ventilation, and air conditioning systems.", icon: "❄️", category: "hard" },
            { id: 3, title: "Professional Cleaning", description: "Specialized cleaning services for facilities of all sizes.", icon: "🧹", category: "soft" },
            { id: 4, title: "Fire Safety Systems", description: "Complete fire alarm and suppression system maintenance.", icon: "🔥", category: "specialized" },
          ]
        };
        
        form.setFieldsValue({ services: data.services || [] });
        if (data.services?.length > 0) {
          setActiveService(0);
        }
      } catch (error) {
        message.error('Failed to load services data');
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
      
      const response = await fetch(`${apiUrl}/home/services/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: values.services }),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Services Updated Successfully",
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

  const getCategoryName = (slug) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.name : 'Uncategorized';
  };

  const getCategoryColor = (slug) => {
    switch(slug) {
      case 'hard': return 'blue';
      case 'soft': return 'green';
      case 'specialized': return 'orange';
      case 'support': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <span className="text-2xl font-bold" style={{ color: COLORS.dark }}>
            KAF TAR Construction Services
          </span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={1100}
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
        <Form form={form} layout="vertical">
          <div className="flex gap-4 h-[600px] overflow-hidden">
            {/* Services List Sidebar */}
            <div className="w-1/4 border-r border-gray-200 pr-4 overflow-y-auto">
              <Form.List name="services">
                {(fields, { add, remove }) => (
                  <div className="space-y-3">
                    {fields.map(({ key, name, ...restField }) => {
                      const service = form.getFieldValue(['services', name]) || {};
                      const icon = service.icon || '🏗️';
                      const iconData = emojiIcons[icon] || { label: '', bg: COLORS.light };
                      
                      return (
                        <Card
                          key={key}
                          onClick={() => setActiveService(name)}
                          className={`cursor-pointer transition-all ${
                            activeService === name 
                              ? 'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white shadow-sm' 
                              : 'hover:bg-gray-50'
                          }`}
                          size="small"
                          bodyStyle={{ padding: '12px' }}
                          hoverable
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 truncate">
                              <span 
                                className="text-xl rounded-full w-10 h-10 flex items-center justify-center"
                                style={{ backgroundColor: iconData.bg }}
                              >
                                {icon}
                              </span>
                              <div>
                                <p className="font-semibold text-sm" style={{ color: COLORS.dark }}>
                                  {service.title || `Service ${name + 1}`}
                                </p>
                                <Tag 
                                  color={getCategoryColor(service.category)}
                                  className="text-xs mt-1"
                                >
                                  {getCategoryName(service.category)}
                                </Tag>
                              </div>
                            </div>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (activeService === name) {
                                  setActiveService(null);
                                }
                                remove(name);
                              }}
                            />
                          </div>
                        </Card>
                      );
                    })}
                    <Button
                      type="dashed"
                      onClick={() => {
                        const newIndex = form.getFieldValue('services')?.length || 0;
                        add({
                          title: `New Service ${newIndex + 1}`,
                          icon: '🏗️',
                          description: '',
                          category: 'hard',
                          features: []
                        });
                        setActiveService(newIndex);
                      }}
                      icon={<PlusOutlined />}
                      block
                      className="mt-2 rounded-lg h-10 font-medium"
                      style={{ 
                        borderColor: COLORS.secondary,
                        color: COLORS.secondary,
                        backgroundColor: `${COLORS.secondary}10` // 10% opacity
                      }}
                    >
                      Add Service
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            {/* Service Details */}
            <div className="flex-1 overflow-y-auto pl-2 pr-4">
              {activeService !== null ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <span 
                      className="text-4xl rounded-full w-16 h-16 flex items-center justify-center shadow-sm"
                      style={{ 
                        backgroundColor: emojiIcons[form.getFieldValue(['services', activeService, 'icon']) || '🏗️']?.bg || COLORS.light
                      }}
                    >
                      {form.getFieldValue(['services', activeService, 'icon']) || '🏗️'}
                    </span>
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-1"
                        style={{ color: COLORS.dark }}
                      >
                        {form.getFieldValue(['services', activeService, 'title']) || `Service ${activeService + 1}`}
                      </h3>
                      <Tag 
                        color={getCategoryColor(form.getFieldValue(['services', activeService, 'category']))}
                        className="text-sm"
                      >
                        {getCategoryName(form.getFieldValue(['services', activeService, 'category']))}
                      </Tag>
                    </div>
                  </div>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name={['services', activeService, 'title']}
                        label={<span className="font-semibold" style={{ color: COLORS.dark }}>Service Title</span>}
                        rules={[{ required: true, message: 'Please enter service title' }]}
                      >
                        <Input 
                          placeholder="e.g., Structural Engineering" 
                          className="rounded-lg h-11 hover:border-green-500 focus:border-green-500"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                      <Form.Item
                        name={['services', activeService, 'category']}
                        label={<span className="font-semibold" style={{ color: COLORS.dark }}>Category</span>}
                        rules={[{ required: true, message: 'Please select a category' }]}
                      >
                        <Select
                          className="rounded-lg h-11"
                          placeholder="Select category"
                        >
                          {categories.map(category => (
                            <Option key={category.slug} value={category.slug}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item
                        name={['services', activeService, 'icon']}
                        label={<span className="font-semibold" style={{ color: COLORS.dark }}>Icon (Emoji)</span>}
                        rules={[{ required: true, message: 'Please select an icon' }]}
                      >
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(emojiIcons).map(([emoji, { label, bg }]) => (
                            <button
                              key={emoji}
                              type="button"
                              className={`text-2xl p-2 rounded-lg transition-all ${
                                form.getFieldValue(['services', activeService, 'icon']) === emoji 
                                  ? 'ring-2 ring-green-500 scale-110' 
                                  : 'hover:ring-1 hover:ring-gray-300 hover:scale-105'
                              }`}
                              onClick={() => form.setFieldsValue({
                                services: form.getFieldValue('services').map((service, idx) => 
                                  idx === activeService ? {...service, icon: emoji} : service
                                )
                              })}
                              title={label}
                              style={{ backgroundColor: bg }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item
                        name={['services', activeService, 'description']}
                        label={<span className="font-semibold" style={{ color: COLORS.dark }}>Description</span>}
                        rules={[{ required: true, message: 'Please enter description' }]}
                      >
                        <TextArea 
                          rows={4} 
                          placeholder="Detailed description of the service including scope and benefits..." 
                          className="rounded-lg hover:border-green-500 focus:border-green-500"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item
                        label={<span className="font-semibold" style={{ color: COLORS.dark }}>Key Features</span>}
                      >
                        <Form.List name={['services', activeService, 'features']}>
                          {(fields, { add, remove }) => (
                            <div className="space-y-3">
                              {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.primary }}>
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                  <Form.Item
                                    {...restField}
                                    name={[name]}
                                    rules={[{ required: true, message: 'Please enter feature text' }]}
                                    className="flex-grow mb-0"
                                  >
                                    <Input 
                                      placeholder="e.g., 24/7 emergency support" 
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
                    </Col>
                  </Row>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center h-full rounded-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%)'
                  }}
                >
                  <div className="text-center p-6 max-w-md">
                    <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.dark }}>
                      Manage Construction Services
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Select a service from the sidebar or create a new one to get started. 
                      Add detailed descriptions, features, and categorize each service.
                    </p>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        const newIndex = form.getFieldValue('services')?.length || 0;
                        form.setFieldsValue({
                          services: [
                            ...(form.getFieldValue('services') || []),
                            {
                              title: `New Service ${newIndex + 1}`,
                              icon: '🏗️',
                              description: '',
                              category: 'hard',
                              features: []
                            }
                          ]
                        });
                        setActiveService(newIndex);
                      }}
                      style={{ 
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.primary
                      }}
                      className="rounded-lg h-10 px-6 font-medium"
                    >
                      Create New Service
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ServicesModal;