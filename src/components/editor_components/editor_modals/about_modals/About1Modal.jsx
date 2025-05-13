import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { 
  Home, 
  FileText, 
  Award, 
  Map, 
  Cpu,
  CheckCircle,
  Clock,
  Smile
} from "lucide-react";
import Swal from "sweetalert2";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Divider,
  Space,
  Spin,
  Upload,
  Select,
  Card,
  Row,
  Col,
  Tag,
} from "antd";

const { TextArea } = Input;

// KAF TAR color scheme
const COLORS = {
  primary: "#7bbf42",       // KAF TAR green
  secondary: "#f9b414",     // KAF TAR yellow
  tertiary: "#040404",      // KAF TAR black
  purple: "#70308c",        // KAF TAR purple
  white: "#ffffff",
  border: "#e5e7eb",        // Light gray border
};

const iconComponents = {
  foundation: Home,
  contract: FileText,
  certification: Award,
  expansion: Map,
  technology: Cpu,
  default: CheckCircle,
};

const iconOptions = [
  { value: "foundation", label: "Foundation", icon: Home },
  { value: "contract", label: "Contract", icon: FileText },
  { value: "certification", label: "Certification", icon: Award },
  { value: "expansion", label: "Expansion", icon: Map },
  { value: "technology", label: "Technology", icon: Cpu },
];

const About1Modal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState({
    bgColor: false,
    textColor: false,
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAboutData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        form.setFieldsValue({
          sectionTitle: "Our Journey",
          sectionSubtitle: "From humble beginnings to industry leadership",
          timeline: [
            {
              year: "2010",
              title: "Foundation",
              description: "KAF TAR was established in Riyadh with a small team focused on facility maintenance services.",
              icon: "foundation",
            },
            {
              year: "2013",
              title: "First Major Contract",
              description: "Secured our first government contract, expanding our service portfolio to include hard services.",
              icon: "contract",
            },
            {
              year: "2016",
              title: "ISO Certification",
              description: "Achieved ISO 9001 certification, marking our commitment to quality management systems.",
              icon: "certification",
            },
          ],
          achievements: [
            { value: "500+", label: "Facilities Managed" },
            { value: "24/7", label: "Support Coverage" },
            { value: "99%", label: "Client Satisfaction" },
          ],
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/about/about1`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load about data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [isOpen, apiUrl, form]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();

      // Simulate API save
      console.log("Saving data:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/about/about1/`, {
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
        title: "About Us Content Updated Successfully",
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

  const toggleColorPicker = (field) => {
    setShowColorPicker((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-xl"
            style={{ color: COLORS.primary }}
          >
            Edit About Us Section
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
                placeholder="Our Journey"
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
                placeholder="From humble beginnings to industry leadership"
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
            Company Timeline
          </Divider>

          <Form.List name="timeline">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "year"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>Year</span>
                        }
                        rules={[
                          { required: true, message: "Please enter year" },
                        ]}
                      >
                        <Input
                          placeholder="2010"
                          style={{ borderColor: COLORS.border }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>Title</span>
                        }
                        rules={[
                          { required: true, message: "Please enter title" },
                        ]}
                      >
                        <Input
                          placeholder="Foundation"
                          style={{ borderColor: COLORS.border }}
                        />
                      </Form.Item>

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

                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>
                            Description
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please enter description",
                          },
                        ]}
                      >
                        <TextArea
                          rows={2}
                          placeholder="Company milestone description..."
                          style={{ borderColor: COLORS.border }}
                        />
                      </Form.Item>
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
                  onClick={() =>
                    add({
                      year: "",
                      title: "",
                      icon: "",
                      description: "",
                    })
                  }
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Timeline Event
                </Button>
              </div>
            )}
          </Form.List>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Key Achievements
          </Divider>

          <Form.List name="achievements">
            {(fields, { add, remove }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      label={
                        <span style={{ color: COLORS.tertiary }}>Value</span>
                      }
                      rules={[
                        { required: true, message: "Please enter value" },
                      ]}
                    >
                      <Input
                        placeholder="500+"
                        style={{ borderColor: COLORS.border }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "label"]}
                      label={
                        <span style={{ color: COLORS.tertiary }}>Label</span>
                      }
                      rules={[
                        { required: true, message: "Please enter label" },
                      ]}
                    >
                      <Input
                        placeholder="Facilities Managed"
                        style={{ borderColor: COLORS.border }}
                      />
                    </Form.Item>

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
                  onClick={() => add({ value: "", label: "" })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-full"
                >
                  Add Achievement
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default About1Modal;