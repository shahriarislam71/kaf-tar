import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Upload, Collapse, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { HexColorPicker } from 'react-colorful';
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

const About2Modal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [activePanels, setActivePanels] = useState(['vision', 'mission', 'values']);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Emoji options for vision, mission, and values
  const emojiOptions = [
    '👁️', '🎯', '❤️', '💡', '🤝', '🏗️', '🔨', '⚡', '🚿', '🧱',
    '🏢', '🏠', '🌱', '✨', '🌟', '💎', '⚙️', '🛠️', '🔧', '📐'
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/about/about2`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Sample data structure if API is not ready
        const data = await response.json() || {
          vision: {
            title: "Our Vision",
            content: "At our company, we recognize the significance of smooth business operations for fostering growth. To empower businesses, we provide proficient support services that alleviate their time and resource constraints.",
            icon: "👁️"
          },
          mission: {
            title: "Our Mission",
            content: "We support businesses with a wide range of manpower ensuring efficient and timely assistance across diverse needs.",
            icon: "🎯"
          },
          values: [
            {
              title: "Client Focus",
              content: "Absolute dedication to client needs and satisfaction",
              icon: "❤️"
            },
            {
              title: "Innovation",
              content: "Continuous improvement through innovative solutions",
              icon: "💡"
            },
            {
              title: "Integrity",
              content: "Ethical business practices and transparency",
              icon: "🤝"
            }
          ]
        };
        
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Failed to load about data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', 'about');

      const response = await fetch(`${apiUrl}/upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      form.setFieldsValue({ imageUrl: data.image });
      message.success('Image uploaded successfully');
    } catch (error) {
      message.error('Image upload failed');
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      
      const response = await fetch(`${apiUrl}/about/about2/`, {
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
        title: "About Section Updated",
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
            Edit About Section
          </span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={900}
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
          <Collapse 
            activeKey={activePanels}
            onChange={setActivePanels}
            bordered={false}
            className="bg-white"
          >
            {/* Vision Section */}
            <Panel 
              header={
                <span className="font-semibold text-lg" style={{ color: COLORS.dark }}>
                  Vision
                </span>
              } 
              key="vision"
              className="mb-4"
              extra={
                <span className="text-xl">
                  {form.getFieldValue(['vision', 'icon']) || '👁️'}
                </span>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-2">
                  <Form.Item
                    name={['vision', 'icon']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                    rules={[{ required: true, message: 'Please select an icon' }]}
                  >
                    <Select 
                      placeholder="Select emoji" 
                      className="w-full"
                      dropdownClassName="emoji-dropdown"
                    >
                      {emojiOptions.map(emoji => (
                        <Select.Option key={emoji} value={emoji}>
                          <span className="text-xl">{emoji}</span>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="md:col-span-10 space-y-4">
                  <Form.Item
                    name={['vision', 'title']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Title</span>}
                    rules={[{ required: true, message: 'Please enter title' }]}
                  >
                    <Input 
                      placeholder="Our Vision" 
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </Form.Item>
                  <Form.Item
                    name={['vision', 'content']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Content</span>}
                    rules={[{ required: true, message: 'Please enter content' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="At our company, we recognize the significance..." 
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </Form.Item>
                </div>
              </div>
            </Panel>

            {/* Mission Section */}
            <Panel 
              header={
                <span className="font-semibold text-lg" style={{ color: COLORS.dark }}>
                  Mission
                </span>
              } 
              key="mission"
              className="mb-4"
              extra={
                <span className="text-xl">
                  {form.getFieldValue(['mission', 'icon']) || '🎯'}
                </span>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-2">
                  <Form.Item
                    name={['mission', 'icon']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                    rules={[{ required: true, message: 'Please select an icon' }]}
                  >
                    <Select 
                      placeholder="Select emoji" 
                      className="w-full"
                      dropdownClassName="emoji-dropdown"
                    >
                      {emojiOptions.map(emoji => (
                        <Select.Option key={emoji} value={emoji}>
                          <span className="text-xl">{emoji}</span>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="md:col-span-10 space-y-4">
                  <Form.Item
                    name={['mission', 'title']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Title</span>}
                    rules={[{ required: true, message: 'Please enter title' }]}
                  >
                    <Input 
                      placeholder="Our Mission" 
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </Form.Item>
                  <Form.Item
                    name={['mission', 'content']}
                    label={<span className="font-medium" style={{ color: COLORS.dark }}>Content</span>}
                    rules={[{ required: true, message: 'Please enter content' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="We support businesses with a wide range of manpower..." 
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </Form.Item>
                </div>
              </div>
            </Panel>

            {/* Values Section */}
            <Panel 
              header={
                <span className="font-semibold text-lg" style={{ color: COLORS.dark }}>
                  Core Values
                </span>
              } 
              key="values"
              className="mb-4"
            >
              <Form.List name="values">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium" style={{ color: COLORS.dark }}>
                            Value {name + 1}
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
                          <div className="md:col-span-2">
                            <Form.Item
                              {...restField}
                              name={[name, 'icon']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                              rules={[{ required: true, message: 'Please select an icon' }]}
                            >
                              <Select 
                                placeholder="Select emoji" 
                                className="w-full"
                                dropdownClassName="emoji-dropdown"
                              >
                                {emojiOptions.map(emoji => (
                                  <Select.Option key={emoji} value={emoji}>
                                    <span className="text-xl">{emoji}</span>
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="md:col-span-10 space-y-4">
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Title</span>}
                              rules={[{ required: true, message: 'Please enter title' }]}
                            >
                              <Input 
                                placeholder="Client Focus" 
                                className="rounded-lg hover:border-green-500 focus:border-green-500"
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'content']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Description</span>}
                              rules={[{ required: true, message: 'Please enter description' }]}
                            >
                              <TextArea 
                                rows={2} 
                                placeholder="Absolute dedication to client needs and satisfaction" 
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
                        icon: '❤️',
                        title: '',
                        content: ''
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
                      Add Core Value
                    </Button>
                  </div>
                )}
              </Form.List>
            </Panel>
          </Collapse>

          {/* Featured Image Section */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Featured Image</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.Item name="imageUrl">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleImageUpload}
                disabled={imageUploading}
                className="w-full"
              >
                {form.getFieldValue('imageUrl') ? (
                  <div className="relative w-full h-48">
                    <img 
                      src={form.getFieldValue('imageUrl')} 
                      alt="About section" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Button 
                        icon={<UploadOutlined />} 
                        type="text" 
                        className="text-white hover:text-white"
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4">
                    <UploadOutlined className="text-2xl mb-2" />
                    <p className="text-sm">Click to upload featured image</p>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default About2Modal;