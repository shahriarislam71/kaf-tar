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
  Zap,
  Package,
  Trash2,
  CloudRain,
  Sun,
  Droplets,
  Leaf,
  Car
} from 'lucide-react';
import Swal from 'sweetalert2';

const { TextArea } = Input;

// KAF TAR color scheme
const COLORS = {
  primary: '#7bbf42',       // KAF TAR green
  secondary: '#f9b414',     // KAF TAR yellow
  tertiary: '#040404',      // KAF TAR black
  purple: '#70308c',        // KAF TAR purple
  white: '#ffffff',
  border: '#e5e7eb',        // Light gray border
};

const iconComponents = {
  'energy': Zap,
  'materials': Package,
  'waste': Trash2,
  'pollution': CloudRain,
  'default': Leaf
};

const iconOptions = [
  { value: 'energy', label: 'Energy', icon: Zap },
  { value: 'materials', label: 'Materials', icon: Package },
  { value: 'waste', label: 'Waste', icon: Trash2 },
  { value: 'pollution', label: 'Pollution', icon: CloudRain },
];

const SustainabilityModal = ({ isOpen, onClose }) => {
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
          sectionTitle: "Our Sustainability Commitment",
          sectionSubtitle: "Building a greener future through responsible operations",
          intro: "KAF TAR is committed to continual improvement in sustainability and reducing environmental impact across all our activities, products, and services. These objectives are consistently communicated throughout our organization.",
          pillars: [
            {
              title: "Energy Efficiency",
              description: "Reducing consumption through efficient systems and renewable technologies",
              icon: "energy",
              stats: "35% reduction target by 2025"
            },
            {
              title: "Material Stewardship",
              description: "Sustainable selection, reuse, and recycling of materials",
              icon: "materials",
              stats: "75% waste diversion rate"
            }
          ],
          initiatives: [
            "Solar panel installations at facilities",
            "Water recycling systems implementation"
          ]
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/sustainability/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load sustainability data");
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
      const response = await fetch(`${apiUrl}/sustainability/`, {
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
        title: "Sustainability Content Updated Successfully",
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

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span 
            className="font-bold text-xl" 
            style={{ color: COLORS.primary }}
          >
            Edit Sustainability Section
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
                placeholder="Our Sustainability Commitment"
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
                placeholder="Building a greener future through responsible operations"
                className="h-12 text-lg"
                style={{ borderColor: COLORS.border }}
              />
            </Form.Item>

            <Form.Item
              name="intro"
              label={
                <span 
                  className="font-semibold text-lg"
                  style={{ color: COLORS.tertiary }}
                >
                  Introduction Text
                </span>
              }
              rules={[{ required: true, message: "Please enter intro text" }]}
            >
              <TextArea
                rows={4}
                placeholder="KAF TAR is committed to continual improvement in sustainability..."
                style={{ borderColor: COLORS.border }}
              />
            </Form.Item>
          </div>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Sustainability Pillars
          </Divider>

          <Form.List name="pillars">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-3">
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>
                              Pillar Title
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please enter title" },
                          ]}
                        >
                          <Input
                            placeholder="Energy Efficiency"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </div>

                      <div className="md:col-span-2">
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

                      <div className="md:col-span-4">
                        <Form.Item
                          {...restField}
                          name={[name, "description"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>
                              Description
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please enter description" },
                          ]}
                        >
                          <Input
                            placeholder="Reducing consumption through efficient systems..."
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </div>

                      <div className="md:col-span-3">
                        <Form.Item
                          {...restField}
                          name={[name, "stats"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>
                              Statistics
                            </span>
                          }
                        >
                          <Input
                            placeholder="35% reduction target by 2025"
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
                  onClick={() => add({ 
                    title: "", 
                    icon: "", 
                    description: "", 
                    stats: "" 
                  })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Sustainability Pillar
                </Button>
              </div>
            )}
          </Form.List>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Sustainability Initiatives
          </Divider>

          <Form.List name="initiatives">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="flex-grow mb-0"
                      rules={[
                        { required: true, message: "Please enter initiative" },
                      ]}
                    >
                      <Input
                        placeholder="Solar panel installations at facilities"
                        style={{ borderColor: COLORS.border }}
                      />
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                      style={{ color: COLORS.purple }}
                      className="hover:bg-purple-50"
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add("")}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Initiative
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default SustainabilityModal;