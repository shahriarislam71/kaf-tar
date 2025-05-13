import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, message, Upload, Spin, Card, Select } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

const HeroModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({ value: '', label: '', icon: '' });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [gradient, setGradient] = useState({
    from: '#040404',
    via: '#7bbf42',
    to: '#70308c'
  });
  const [accentColor, setAccentColor] = useState('#f9b414');
  const [imageUrl, setImageUrl] = useState('');

  const iconOptions = [
    'building',
    'heart',
    'shield',
    'certificate',
    'users',
    'clock',
    'award',
    'check-circle',
    'star',
    'thumbs-up'
  ];

  useEffect(() => {
    if (isOpen) {
      fetchHeroData();
    }
  }, [isOpen]);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/hero/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch hero data');
      }

      const data = await response.json();
      
      form.setFieldsValue({
        title: data.title || "Kaf Tar - Premier Facility Management",
        subtitle: data.subtitle || "Delivering exceptional operation & maintenance services across Saudi Arabia",
        highlightText: data.highlightText || "CERTIFIED PROFESSIONALS | 24/7 SUPPORT | QUALITY GUARANTEED",
        ctaButtonText: data.ctaButton?.text || "Request Free Consultation",
        ctaButtonLink: data.ctaButton?.link || "/contact"
      });

      if (data.gradient) {
        setGradient({
          from: data.gradient.from || '#040404',
          via: data.gradient.via || '#7bbf42',
          to: data.gradient.to || '#70308c'
        });
      }

      if (data.accentColor) {
        setAccentColor(data.accentColor || '#f9b414');
      }

      setStats(data.stats || [
        { value: '500+', label: 'Facilities Managed', icon: 'building' },
        { value: '99%', label: 'Client Satisfaction', icon: 'heart' },
        { value: '24/7', label: 'Emergency Response', icon: 'shield' },
        { value: 'ISO', label: 'Certified Quality', icon: 'certificate' }
      ]);

      setImageUrl(data.backgroundImage || '');
    } catch (error) {
      console.error('Error fetching hero data:', error);
      message.error('Failed to load hero section data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', 'hero_images');

    try {
      setImageLoading(true);
      
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/images/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const newImageUrl = `${data.image}`;
      
      form.setFieldsValue({ backgroundImage: newImageUrl });
      setImageUrl(newImageUrl);
      return newImageUrl;
    } catch (error) {
      console.error('Upload error:', error);
      message.error('Image upload failed');
      return null;
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    form.setFieldsValue({ backgroundImage: '' });
    setImageUrl('');
  };

  const uploadProps = {
    name: 'image',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        onSuccess(imageUrl, file);
      } else {
        onError(new Error('Upload failed'));
      }
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return isImage && isLt5M;
    },
  };

  const handleAddStat = () => {
    if (newStat.value.trim() && newStat.label.trim()) {
      setStats([...stats, { ...newStat }]);
      setNewStat({ value: '', label: '', icon: '' });
    }
  };

  const handleRemoveStat = (indexToRemove) => {
    setStats(stats.filter((_, index) => index !== indexToRemove));
  };

  const handleStatChange = (field, value, index) => {
    const updatedStats = [...stats];
    updatedStats[index][field] = value;
    setStats(updatedStats);
  };

  const handleGradientChange = (color, position) => {
    setGradient({
      ...gradient,
      [position]: color.hex
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        title: values.title,
        subtitle: values.subtitle,
        highlightText: values.highlightText,
        ctaButton: {
          text: values.ctaButtonText,
          link: values.ctaButtonLink
        },
        backgroundImage: imageUrl,
        stats: stats,
        gradient: gradient,
        accentColor: accentColor
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/home/hero/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save hero data');
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Hero Section Updated Successfully",
        showConfirmButton: false,
        timer: 3000
      });
      onClose();
    } catch (error) {
      console.error('Error saving hero data:', error);
      message.error('Failed to update hero section');
    }
  };

  return (
    <Modal
      title={<span className="text-2xl font-bold text-[#040404]">Edit Hero Section</span>}
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button 
          key="back" 
          onClick={onClose} 
          className="px-6 h-10 rounded-lg border-gray-300 hover:bg-gray-100 text-[#040404]"
        >
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={loading}
          style={{ 
            backgroundColor: accentColor, 
            borderColor: accentColor,
            color: '#040404'
          }}
          className="px-6 h-10 rounded-lg hover:opacity-90 font-medium"
        >
          Save Changes
        </Button>,
      ]}
      width={900}
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
              color: '#040404'
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="title"
                label={<span className="font-medium text-[#040404]">Main Title</span>}
                rules={[{ required: true, message: 'Please enter the main title' }]}
              >
                <Input 
                  size="large" 
                  placeholder="e.g., Kaf Tar - Premier Facility Management" 
                  className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                />
              </Form.Item>

              <Form.Item
                name="subtitle"
                label={<span className="font-medium text-[#040404]">Subtitle</span>}
                rules={[{ required: true, message: 'Please enter the subtitle' }]}
              >
                <Input 
                  size="large" 
                  placeholder="e.g., Delivering exceptional operation & maintenance services" 
                  className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                />
              </Form.Item>

              <Form.Item
                name="highlightText"
                label={<span className="font-medium text-[#040404]">Highlight Text</span>}
                rules={[{ required: true, message: 'Please enter highlight text' }]}
              >
                <Input 
                  size="large" 
                  placeholder="e.g., CERTIFIED PROFESSIONALS | 24/7 SUPPORT | QUALITY GUARANTEED" 
                  className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                />
              </Form.Item>
            </div>
          </Card>

          <Card 
            title="Call to Action" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: '#040404'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="ctaButtonText"
                label={<span className="font-medium text-[#040404]">Button Text</span>}
                rules={[{ required: true, message: 'Please enter button text' }]}
              >
                <Input 
                  placeholder="e.g., Request Free Consultation" 
                  className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]" 
                />
              </Form.Item>
              <Form.Item
                name="ctaButtonLink"
                label={<span className="font-medium text-[#040404]">Button Link</span>}
                rules={[{ required: true, message: 'Please enter button link' }]}
              >
                <Input 
                  placeholder="e.g., /contact" 
                  className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]" 
                />
              </Form.Item>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-[#040404] mb-2">Accent Color</h4>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-[#f9b414] transition-all"
                  style={{ backgroundColor: accentColor }}
                  onClick={() => setColorPickerVisible('accent')}
                />
                {colorPickerVisible === 'accent' && (
                  <div className="absolute z-10">
                    <div className="p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                      <SketchPicker 
                        color={accentColor} 
                        onChangeComplete={(color) => setAccentColor(color.hex)} 
                      />
                      <Button 
                        size="small" 
                        onClick={() => setColorPickerVisible(false)}
                        className="mt-2 w-full rounded-lg"
                        style={{ backgroundColor: accentColor, color: '#040404', borderColor: accentColor }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
                <span className="text-sm text-gray-600">Used for buttons and highlights</span>
              </div>
            </div>
          </Card>

          <Card 
            title="Background & Gradient" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: '#040404'
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <Form.Item
                name="backgroundImage"
                label={<span className="font-medium text-[#040404]">Background Image</span>}
                rules={[{ required: true, message: 'Please upload background image' }]}
              >
                <div className="flex flex-col gap-4">
                  <Upload {...uploadProps}>
                    <Button 
                      icon={<UploadOutlined />} 
                      loading={imageLoading}
                      className="h-10 rounded-lg"
                      style={{ 
                        backgroundColor: '#7bbf42', 
                        color: 'white', 
                        borderColor: '#7bbf42' 
                      }}
                    >
                      Upload Background Image
                    </Button>
                  </Upload>
                  {imageUrl && (
                    <div className="relative group">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </Form.Item>

              <div>
                <h4 className="font-medium text-[#040404] mb-4">Overlay Gradient</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-[#7bbf42] transition-all"
                        style={{ backgroundColor: gradient.from }}
                        onClick={() => setColorPickerVisible('from')}
                      />
                      {colorPickerVisible === 'from' && (
                        <div className="absolute z-10">
                          <div className="p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                            <SketchPicker 
                              color={gradient.from} 
                              onChangeComplete={(color) => handleGradientChange(color, 'from')} 
                            />
                            <Button 
                              size="small" 
                              onClick={() => setColorPickerVisible(false)}
                              className="mt-2 w-full rounded-lg"
                              style={{ backgroundColor: accentColor, color: '#040404', borderColor: accentColor }}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      )}
                      <Input 
                        value={gradient.from} 
                        onChange={(e) => setGradient({...gradient, from: e.target.value})}
                        className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Via</label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-[#7bbf42] transition-all"
                        style={{ backgroundColor: gradient.via }}
                        onClick={() => setColorPickerVisible('via')}
                      />
                      {colorPickerVisible === 'via' && (
                        <div className="absolute z-10">
                          <div className="p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                            <SketchPicker 
                              color={gradient.via} 
                              onChangeComplete={(color) => handleGradientChange(color, 'via')} 
                            />
                            <Button 
                              size="small" 
                              onClick={() => setColorPickerVisible(false)}
                              className="mt-2 w-full rounded-lg"
                              style={{ backgroundColor: accentColor, color: '#040404', borderColor: accentColor }}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      )}
                      <Input 
                        value={gradient.via} 
                        onChange={(e) => setGradient({...gradient, via: e.target.value})}
                        className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-[#7bbf42] transition-all"
                        style={{ backgroundColor: gradient.to }}
                        onClick={() => setColorPickerVisible('to')}
                      />
                      {colorPickerVisible === 'to' && (
                        <div className="absolute z-10">
                          <div className="p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                            <SketchPicker 
                              color={gradient.to} 
                              onChangeComplete={(color) => handleGradientChange(color, 'to')} 
                            />
                            <Button 
                              size="small" 
                              onClick={() => setColorPickerVisible(false)}
                              className="mt-2 w-full rounded-lg"
                              style={{ backgroundColor: accentColor, color: '#040404', borderColor: accentColor }}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      )}
                      <Input 
                        value={gradient.to} 
                        onChange={(e) => setGradient({...gradient, to: e.target.value})}
                        className="rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg" style={{
                  background: `linear-gradient(to right, ${gradient.from}, ${gradient.via}, ${gradient.to})`,
                  height: '80px'
                }}>
                  <p className="text-white text-center font-medium">Gradient Preview</p>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            title="Key Statistics" 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
            headStyle={{ 
              borderBottom: '1px solid #e8e8e8',
              fontSize: '18px',
              fontWeight: '600',
              color: '#040404'
            }}
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                Showcase your company's achievements with impactful statistics
              </p>
              
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <Input
                      value={stat.value}
                      onChange={(e) => handleStatChange('value', e.target.value, index)}
                      placeholder="Value (e.g., 500+)"
                      className="flex-1 rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => handleStatChange('label', e.target.value, index)}
                      placeholder="Label (e.g., Facilities Managed)"
                      className="flex-1 rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                    />
                    <Select
                      value={stat.icon}
                      onChange={(value) => handleStatChange('icon', value, index)}
                      placeholder="Select icon"
                      className="w-32 rounded-lg"
                    >
                      {iconOptions.map(icon => (
                        <Option key={icon} value={icon}>
                          <div className="flex items-center">
                            <span className="mr-2">{icon}</span>
                          </div>
                        </Option>
                      ))}
                    </Select>
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveStat(index)}
                      className="flex items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#ff4d4f', color: 'white', borderColor: '#ff4d4f' }}
                    />
                  </div>
                ))}
                
                <div className="flex gap-3 items-center bg-gray-100 p-3 rounded-lg">
                  <Input
                    value={newStat.value}
                    onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                    placeholder="Value (e.g., 500+)"
                    className="flex-1 rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                  />
                  <Input
                    value={newStat.label}
                    onChange={(e) => setNewStat({...newStat, label: e.target.value})}
                    placeholder="Label (e.g., Facilities Managed)"
                    className="flex-1 rounded-lg hover:border-[#7bbf42] focus:border-[#7bbf42]"
                  />
                  <Select
                    value={newStat.icon}
                    onChange={(value) => setNewStat({...newStat, icon: value})}
                    placeholder="Select icon"
                    className="w-32 rounded-lg"
                  >
                    {iconOptions.map(icon => (
                      <Option key={icon} value={icon}>
                        <div className="flex items-center">
                          <span className="mr-2">{icon}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddStat}
                    className="flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: '#7bbf42', color: 'white', borderColor: '#7bbf42' }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default HeroModal;