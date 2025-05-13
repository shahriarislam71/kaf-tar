import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
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

const ContactModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#040404');
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/home/contacts/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json() || {
          title: "Ready to Transform Your Facility Management?",
          subtitle: "Get in touch with our experts today for a customized solution",
          contactInfo: {
            phone: "+966 56 705 5580",
            email: "info@kaftaroperations.com",
            address: "9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia",
            workingHours: "Sun-Thu: 8AM - 5PM"
          },
          features: [
            "24/7 Support Coverage",
            "No Outsourcing Guarantee",
            "Proprietary IT Platforms",
            "Cost-Efficient High Quality"
          ],
          ctaButton: {
            text: "Request a Free Consultation",
            link: "/contact"
          },
          mapSrc: "",
          bgColor: "#ffffff",
          textColor: "#040404"
        };
        
        form.setFieldsValue(data);
        setBgColor(data.bgColor || '#ffffff');
        setTextColor(data.textColor || '#040404');
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
      
      const response = await fetch(`${apiUrl}/home/contacts/`, {
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
          <Card 
            title="Main Content" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.dark
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="title"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Title</span>}
                rules={[{ required: true, message: 'Please enter the title' }]}
              >
                <Input 
                  placeholder="Ready to Transform Your Facility Management?" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name="subtitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Subtitle</span>}
                rules={[{ required: true, message: 'Please enter the subtitle' }]}
              >
                <Input 
                  placeholder="Get in touch with our experts today for a customized solution" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Contact Information" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.dark
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name={['contactInfo', 'phone']}
                label={
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" />
                    <span className="font-semibold" style={{ color: COLORS.dark }}>Phone Number</span>
                  </div>
                }
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input 
                  placeholder="+966 56 705 5580" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name={['contactInfo', 'email']}
                label={
                  <div className="flex items-center">
                    <MailOutlined className="mr-2" />
                    <span className="font-semibold" style={{ color: COLORS.dark }}>Email Address</span>
                  </div>
                }
                rules={[{ 
                  required: true, 
                  message: 'Please enter email',
                  type: 'email',
                  message: 'Please enter a valid email'
                }]}
              >
                <Input 
                  placeholder="info@kaftaroperations.com" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name={['contactInfo', 'address']}
                label={
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mr-2" />
                    <span className="font-semibold" style={{ color: COLORS.dark }}>Address</span>
                  </div>
                }
                rules={[{ required: true, message: 'Please enter address' }]}
              >
                <Input 
                  placeholder="9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name={['contactInfo', 'workingHours']}
                label={
                  <div className="flex items-center">
                    <ClockCircleOutlined className="mr-2" />
                    <span className="font-semibold" style={{ color: COLORS.dark }}>Working Hours</span>
                  </div>
                }
                rules={[{ required: true, message: 'Please enter working hours' }]}
              >
                <Input 
                  placeholder="Sun-Thu: 8AM - 5PM" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Key Features" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.dark
            }}
          >
            <Form.List name="features">
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
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
                          placeholder="e.g., 24/7 Support Coverage" 
                          className="rounded-lg hover:border-green-500 focus:border-green-500"
                        />
                      </Form.Item>
                      <Button 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        className="flex items-center justify-center rounded-lg"
                        style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
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
          </Card>

          <Card 
            title="Call to Action" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.dark
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name={['ctaButton', 'text']}
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Button Text</span>}
                rules={[{ required: true, message: 'Please enter button text' }]}
              >
                <Input 
                  placeholder="Request a Free Consultation" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
              <Form.Item
                name={['ctaButton', 'link']}
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Button Link</span>}
                rules={[{ required: true, message: 'Please enter button link' }]}
              >
                <Input 
                  placeholder="/contact" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Design & Map" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: COLORS.dark
            }}
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

              <div className="md:col-span-2">
                <Form.Item
                  name="mapSrc"
                  label={<span className="font-semibold" style={{ color: COLORS.dark }}>Google Maps Embed URL</span>}
                >
                  <Input 
                    placeholder="https://www.google.com/maps/embed?pb=..." 
                    className="rounded-lg hover:border-green-500 focus:border-green-500"
                  />
                </Form.Item>
                {form.getFieldValue('mapSrc') && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={form.getFieldValue('mapSrc')}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Location Map"
                    />
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

export default ContactModal;