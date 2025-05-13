import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Upload, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { HexColorPicker } from 'react-colorful';
import Swal from 'sweetalert2';

const { TextArea } = Input;

// KAF TAR company colors
const COLORS = {
  primary: '#7bbf42', // Vibrant green
  secondary: '#f9b414', // Yellow
  dark: '#040404', // Dark text
  accent: '#70308c', // Purple
  light: '#ffffff', // White
};

const Contact2Modal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bgColor, setBgColor] = useState('#7bbf42');
  const [textColor, setTextColor] = useState('#ffffff');
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Social media platforms
  const socialMediaOptions = [
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'twitter', label: 'Twitter', icon: 'twitter' },
    { value: 'instagram', label: 'Instagram', icon: 'instagram' },
    { value: 'facebook', label: 'Facebook', icon: 'facebook' },
    { value: 'youtube', label: 'YouTube', icon: 'youtube' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/contact/contact2/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Sample data structure if API is not ready
        const data = await response.json() || {
          sectionTitle: "Connect With Us",
          sectionSubtitle: "We're always here to help with your facility management needs",
          contactPoints: [
            {
              type: "Phone",
              value: "+966 56 705 5580",
              icon: "phone",
              description: "Available 24/7 for emergency services"
            },
            {
              type: "Email",
              value: "info@kaftaroperations.com",
              icon: "email",
              description: "General inquiries and support"
            },
            {
              type: "Address",
              value: "9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia",
              icon: "location",
              description: "Our headquarters location"
            },
            {
              type: "Working Hours",
              value: "Sunday - Thursday: 8:00 AM - 5:00 PM",
              icon: "clock",
              description: "Standard business hours"
            }
          ],
          socialMedia: [
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/company/kaftar",
              icon: "linkedin"
            },
            {
              platform: "Twitter",
              url: "https://twitter.com/kaftar",
              icon: "twitter"
            },
            {
              platform: "Instagram",
              url: "https://instagram.com/kaftar",
              icon: "instagram"
            }
          ],
          bgColor: "#7bbf42",
          textColor: "#ffffff"
        };
        
        form.setFieldsValue(data);
        setBgColor(data.bgColor || '#7bbf42');
        setTextColor(data.textColor || '#ffffff');
      } catch (error) {
        message.error('Failed to load contact data');
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
      const updatedData = {
        ...values,
        bgColor,
        textColor
      };
      
      const response = await fetch(`${apiUrl}/contact/contact2/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contact Section Updated",
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

  const getIconComponent = (icon) => {
    switch(icon) {
      case 'phone': return <PhoneOutlined />;
      case 'email': return <MailOutlined />;
      case 'location': return <EnvironmentOutlined />;
      case 'clock': return <ClockCircleOutlined />;
      default: return null;
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <span className="text-2xl font-bold" style={{ color: COLORS.dark }}>
            Edit Contact Section
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
                  placeholder="Connect With Us" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name="sectionSubtitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Section Subtitle</span>}
                rules={[{ required: true, message: 'Please enter section subtitle' }]}
              >
                <Input 
                  placeholder="We're always here to help with your facility management needs" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          {/* Contact Points */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Contact Points</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="contactPoints">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium" style={{ color: COLORS.dark }}>
                          Contact Point {name + 1}
                        </h4>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: '#ff4d4f' }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-3">
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>Type</span>}
                            rules={[{ required: true, message: 'Please select type' }]}
                          >
                            <Select 
                              placeholder="Select type" 
                              className="w-full"
                            >
                              <Select.Option value="Phone">Phone</Select.Option>
                              <Select.Option value="Email">Email</Select.Option>
                              <Select.Option value="Address">Address</Select.Option>
                              <Select.Option value="Working Hours">Working Hours</Select.Option>
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="md:col-span-3">
                          <Form.Item
                            {...restField}
                            name={[name, 'icon']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                            rules={[{ required: true, message: 'Please select icon' }]}
                          >
                            <Select 
                              placeholder="Select icon" 
                              className="w-full"
                            >
                              <Select.Option value="phone">Phone</Select.Option>
                              <Select.Option value="email">Email</Select.Option>
                              <Select.Option value="location">Location</Select.Option>
                              <Select.Option value="clock">Clock</Select.Option>
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="md:col-span-6 space-y-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>Value</span>}
                            rules={[{ required: true, message: 'Please enter value' }]}
                          >
                            <Input 
                              placeholder="+966 56 705 5580" 
                              className="rounded-lg hover:border-green-500 focus:border-green-500"
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>Description</span>}
                            rules={[{ required: true, message: 'Please enter description' }]}
                          >
                            <Input 
                              placeholder="Available 24/7 for emergency services" 
                              className="rounded-lg hover:border-green-500 focus:border-green-500"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => add({
                      type: 'Phone',
                      icon: 'phone',
                      value: '',
                      description: ''
                    })}
                    icon={<PlusOutlined />}
                    block
                    className="mt-2 rounded-lg h-10"
                    style={{ 
                      borderColor: COLORS.accent,
                      color: COLORS.accent,
                      backgroundColor: `${COLORS.accent}10` // 10% opacity
                    }}
                  >
                    Add Contact Point
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>

          {/* Social Media */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Social Media Links</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="socialMedia">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium" style={{ color: COLORS.dark }}>
                          Social Media {name + 1}
                        </h4>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: '#ff4d4f' }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'platform']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>Platform</span>}
                            rules={[{ required: true, message: 'Please select platform' }]}
                          >
                            <Select 
                              placeholder="Select platform" 
                              className="w-full"
                            >
                              {socialMediaOptions.map(platform => (
                                <Select.Option key={platform.value} value={platform.value}>
                                  {platform.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="md:col-span-8">
                          <Form.Item
                            {...restField}
                            name={[name, 'url']}
                            label={<span className="font-medium" style={{ color: COLORS.dark }}>URL</span>}
                            rules={[
                              { required: true, message: 'Please enter URL' },
                              { type: 'url', message: 'Please enter a valid URL' }
                            ]}
                          >
                            <Input 
                              placeholder="https://linkedin.com/company/kaftar" 
                              className="rounded-lg hover:border-green-500 focus:border-green-500"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => add({
                      platform: 'linkedin',
                      url: ''
                    })}
                    icon={<PlusOutlined />}
                    block
                    className="mt-2 rounded-lg h-10"
                    style={{ 
                      borderColor: COLORS.secondary,
                      color: COLORS.secondary,
                      backgroundColor: `${COLORS.secondary}10` // 10% opacity
                    }}
                  >
                    Add Social Media Link
                  </Button>
                </div>
              )}
            </Form.List>
          </Card>

          {/* Design Settings */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Design Settings</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Background Color</h4>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-green-500 transition-all"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                  />
                  <Input 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="rounded-lg hover:border-green-500 focus:border-green-500"
                  />
                </div>
                {showBgColorPicker && (
                  <div className="mt-3 p-3 bg-white rounded-lg shadow-md border border-gray-200">
                    <HexColorPicker color={bgColor} onChange={setBgColor} />
                    <Button 
                      onClick={() => setShowBgColorPicker(false)}
                      className="mt-2 w-full rounded-lg"
                      style={{ 
                        backgroundColor: COLORS.primary, 
                        color: COLORS.light,
                        borderColor: COLORS.primary
                      }}
                    >
                      Done
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-3" style={{ color: COLORS.dark }}>Text Color</h4>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-green-500 transition-all"
                    style={{ backgroundColor: textColor }}
                    onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                  />
                  <Input 
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="rounded-lg hover:border-green-500 focus:border-green-500"
                  />
                </div>
                {showTextColorPicker && (
                  <div className="mt-3 p-3 bg-white rounded-lg shadow-md border border-gray-200">
                    <HexColorPicker color={textColor} onChange={setTextColor} />
                    <Button 
                      onClick={() => setShowTextColorPicker(false)}
                      className="mt-2 w-full rounded-lg"
                      style={{ 
                        backgroundColor: COLORS.primary, 
                        color: COLORS.light,
                        borderColor: COLORS.primary
                      }}
                    >
                      Done
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Contact2Modal;