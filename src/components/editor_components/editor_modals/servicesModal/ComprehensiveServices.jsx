import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  message, 
  Divider, 
  Spin, 
  Card, 
  Row, 
  Col,
  Select,
  Space,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined,
  CheckOutlined 
} from '@ant-design/icons';
import { 
  HardHat,
  Sparkles,
  FireExtinguisher,
  Headset,
  Bolt,
  Settings,
  Wrench,
  Leaf
} from 'lucide-react';
import Swal from 'sweetalert2';

const { TextArea } = Input;

// KAF TAR color scheme
const COLORS = {
  primary: '#7bbf42',
  secondary: '#f9b414',
  tertiary: '#040404',
  purple: '#70308c',
  white: '#ffffff',
  border: '#e5e7eb',
};

const iconComponents = {
  'hard-services': HardHat,
  'soft-services': Sparkles, // Changed from Broom to Sparkles
  'specialized': FireExtinguisher,
  'support': Headset,
  'default': Settings
};

const iconOptions = [
  { value: 'hard-services', label: 'Hard Services', icon: HardHat },
  { value: 'soft-services', label: 'Soft Services', icon: Sparkles }, // Changed from Broom to Sparkles
  { value: 'specialized', label: 'Specialized', icon: FireExtinguisher },
  { value: 'support', label: 'Support', icon: Headset },
];

const ComprehensiveServicesModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        form.setFieldsValue({
          sectionTitle: "Our Comprehensive Services",
          sectionSubtitle: "End-to-end facility management solutions",
          services: [
            {
              category: "Hard Services",
              icon: "hard-services",
              items: ["Electrical Systems", "Air-conditioning & HVAC"]
            },
            {
              category: "Soft Services",
              icon: "soft-services",
              items: ["Cleaning Services", "Facade Cleaning"]
            }
          ]
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/service/service-list/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load services data");
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

      // Simulate API save
      console.log("Saving data:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/service/service-list/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to save");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Services Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
        background: COLORS.white,
        iconColor: COLORS.primary,
      });
      onClose();
    } catch (error) {
      message.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span 
            className="font-bold text-xl" 
            style={{ color: COLORS.primary }}
          >
            Edit Comprehensive Services
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
          style={{
            borderColor: COLORS.tertiary,
            color: COLORS.tertiary,
          }}
          className="hover:bg-gray-50"
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
          }}
          className="hover:opacity-90"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>,
      ]}
      destroyOnClose
      className="rounded-lg overflow-hidden"
      bodyStyle={{ padding: "24px" }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <Form.Item
              name="sectionTitle"
              label={
                <span 
                  className="font-semibold text-lg"
                  style={{ color: COLORS.tertiary }}
                >
                  Section Title
                </span>
              }
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input
                placeholder="Our Comprehensive Services"
                className="h-12 text-lg"
                style={{ borderColor: COLORS.border }}
              />
            </Form.Item>

            <Form.Item
              name="sectionSubtitle"
              label={
                <span 
                  className="font-semibold text-lg"
                  style={{ color: COLORS.tertiary }}
                >
                  Section Subtitle
                </span>
              }
            >
              <Input
                placeholder="End-to-end facility management solutions"
                className="h-12 text-lg"
                style={{ borderColor: COLORS.border }}
              />
            </Form.Item>
          </div>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Service Categories
          </Divider>

          <Form.List name="services">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-4">
                        <Form.Item
                          {...restField}
                          name={[name, "category"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>
                              Category Name
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please enter category" },
                          ]}
                        >
                          <Input
                            placeholder="Hard Services"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </div>

                      <div className="md:col-span-3">
                        <Form.Item
                          {...restField}
                          name={[name, "icon"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>Icon</span>
                          }
                          rules={[
                            { required: true, message: "Please select icon" },
                          ]}
                        >
                          <Select
                            placeholder="Select icon"
                            style={{ borderColor: COLORS.border }}
                            optionLabelProp="label"
                          >
                            {iconOptions.map((option) => (
                              <Select.Option
                                key={option.value}
                                value={option.value}
                                label={
                                  <div className="flex items-center gap-2">
                                    <option.icon
                                      className="w-4 h-4"
                                      style={{ color: COLORS.primary }}
                                    />
                                    <span>{option.label}</span>
                                  </div>
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <option.icon
                                    className="w-4 h-4"
                                    style={{ color: COLORS.primary }}
                                  />
                                  <span className="text-gray-700">
                                    {option.label}
                                  </span>
                                </div>
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="md:col-span-5">
                        <Form.Item
                          {...restField}
                          name={[name, "items"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>
                              Services (comma separated)
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please enter services" },
                          ]}
                          getValueFromEvent={(e) => {
                            if (Array.isArray(e)) return e;
                            return e.target.value.split(',').map(item => item.trim());
                          }}
                          getValueProps={(value) => ({
                            value: Array.isArray(value) ? value.join(', ') : value,
                          })}
                        >
                          <Input
                            placeholder="Electrical Systems, Air-conditioning & HVAC"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        style={{ color: COLORS.purple }}
                        className="hover:bg-purple-50"
                      />
                    </div>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ category: "", icon: "", items: [] })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Service Category
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ComprehensiveServicesModal;