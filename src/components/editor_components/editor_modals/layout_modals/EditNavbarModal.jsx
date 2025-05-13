import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message, Upload, Spin, Card, Select } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;

// KAF TAR Brand Colors
const COLORS = {
  primary: '#7bbf42',       // Vibrant green
  primaryDark: '#5a9e2d',   // Darker green
  secondary: '#f9b414',     // Yellow
  accent: '#70308c',        // Purple
  textDark: '#040404',      // Dark black
  textLight: '#ffffff',     // White
  border: '#e0e0e0',       // Light gray border
  cardBg: '#f8faf8'        // Very light green
};

const EditNavbarModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/layout/navbar/`);
        if (!response.ok) throw new Error("Failed to fetch navbar data");
        const data = await response.json();
        
        form.setFieldsValue({
          logo: data.logo,
          links: data.links || [
            { name: "Home", href: "/home" },
            { name: "About", href: "/about" },
            { name: "Services", href: "/services" }
          ],
          ctaButton: data.ctaButton || {
            text: "Get a Quote",
            href: "/contact"
          }
        });
      } catch (error) {
        console.error('Error fetching navbar data:', error);
        message.error('Failed to load navbar data');
        // Set default values if API fails
        form.setFieldsValue({
          logo: "",
          links: [
            { name: "Home", href: "/home" },
            { name: "About", href: "/about" },
            { name: "Services", href: "/services" }
          ],
          ctaButton: {
            text: "Get a Quote",
            href: "/contact"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", "navbar_logo");

      const response = await fetch(`${apiUrl}/images/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      form.setFieldsValue({ logo: data.url });
      message.success("Logo uploaded successfully");
    } catch (error) {
      message.error("Logo upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    form.setFieldsValue({ logo: '' });
  };

  const uploadProps = {
    name: 'logo',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }
      handleUpload(file);
      return false;
    },
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      
      const response = await fetch(`${apiUrl}/layout/navbar/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save navbar");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Navbar Updated Successfully",
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
          Edit Navigation Bar
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      width={800}
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
            {/* Logo Upload Section */}
            <Card 
              title="Company Logo" 
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
                name="logo"
                label={<span className="font-medium" style={{ color: COLORS.textDark }}>Logo Image</span>}
                rules={[{ required: true, message: 'Please upload a logo' }]}
              >
                <div className="flex flex-col gap-4">
                  <Upload {...uploadProps}>
                    <Button 
                      icon={<UploadOutlined />} 
                      loading={uploading}
                      className="h-10 rounded-lg"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        color: COLORS.textLight,
                        borderColor: COLORS.primary
                      }}
                    >
                      {form.getFieldValue('logo') ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                  </Upload>
                  {form.getFieldValue('logo') && (
                    <div className="relative group">
                      <img 
                        src={form.getFieldValue('logo')} 
                        alt="Logo preview" 
                        className="w-full h-32 object-contain border rounded-lg p-2"
                        style={{ borderColor: COLORS.border }}
                      />
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={handleRemoveLogo}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="text-sm" style={{ color: COLORS.primary }}>
                    <p>Recommended size: 200px × 60px</p>
                    <p>Formats: PNG, JPG, SVG (max 2MB)</p>
                  </div>
                </div>
              </Form.Item>
            </Card>

            {/* Navigation Links Section */}
            <Card 
              title="Navigation Links" 
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
              <Form.List name="links">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={key}
                        className="border rounded-lg p-4 hover:shadow-md transition-all"
                        style={{ 
                          borderColor: COLORS.border,
                          background: index % 2 === 0 ? COLORS.cardBg : 'white'
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium" style={{ color: COLORS.primary }}>
                            Link {index + 1}
                          </h4>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                            style={{ color: '#ff4d4f' }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Link Text</span>}
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Input
                              placeholder="e.g., Home"
                              className="rounded-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'href']}
                            label={<span className="font-medium" style={{ color: COLORS.textDark }}>Link URL</span>}
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Input
                              placeholder="e.g., /home"
                              className="rounded-lg"
                              style={{ borderColor: COLORS.border }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add({ name: '', href: '' })}
                      icon={<PlusOutlined />}
                      block
                      className="h-12 rounded-xl mt-4"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primaryDark,
                        fontWeight: '500'
                      }}
                    >
                      Add Navigation Link
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>

            {/* CTA Button Section */}
            <Card 
              title="Call-to-Action Button" 
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name={['ctaButton', 'text']}
                  label={<span className="font-medium" style={{ color: COLORS.textDark }}>Button Text</span>}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input
                    placeholder="e.g., Get a Quote"
                    className="rounded-lg h-10"
                    style={{ borderColor: COLORS.border }}
                  />
                </Form.Item>

                <Form.Item
                  name={['ctaButton', 'href']}
                  label={<span className="font-medium" style={{ color: COLORS.textDark }}>Button Link</span>}
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input
                    placeholder="e.g., /contact"
                    className="rounded-lg h-10"
                    style={{ borderColor: COLORS.border }}
                  />
                </Form.Item>
              </div>
            </Card>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditNavbarModal;