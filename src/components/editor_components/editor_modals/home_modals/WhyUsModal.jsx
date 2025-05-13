// import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Divider,
  Spin,
  Table,
  Select,
  Card,
  Row,
  Col,
  Tag,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Building,
  ShieldCheck,
  Clock,
  Cpu,
  DollarSign,
  Award,
  Leaf,
  HardHat,
  Construction,
  Home,
  Wrench,
} from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const { TextArea } = Input;

// Color constants
const colors = {
  primary: "#7bbf42",
  secondary: "#f9b414",
  tertiary: "#040404",
  purple: "#70308c",
  white: "#ffffff",
};

const iconComponents = {
  "in-house": Building,
  support: Clock,
  tech: Cpu,
  cost: DollarSign,
  certified: Award,
  eco: Leaf,
  construction: Construction,
  hardhat: HardHat,
  home: Home,
  tool: Wrench, // Changed from Tool to Wrench
  default: ShieldCheck,
};

const iconOptions = [
  { value: "in-house", label: "In-House", icon: Building },
  { value: "support", label: "Support", icon: Clock },
  { value: "tech", label: "Technology", icon: Cpu },
  { value: "cost", label: "Cost", icon: DollarSign },
  { value: "certified", label: "Certified", icon: Award },
  { value: "eco", label: "Eco-Friendly", icon: Leaf },
  { value: "construction", label: "Construction", icon: Construction },
  { value: "hardhat", label: "Hardhat", icon: HardHat },
  { value: "home", label: "Home", icon: Home },
  { value: "tool", label: "Tool", icon: Wrench }, // Changed from Tool to Wrench
];

// Demo JSON data
const demoData = {
  sectionTitle: "Why Choose KAF TAR",
  sectionSubtitle: "Discover what sets us apart in construction management",
  features: [
    {
      title: "In-House Teams",
      description:
        "Full control with our in-house teams ensuring quality and accountability",
      icon: "in-house",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock service with rapid response times",
      icon: "support",
    },
    {
      title: "Advanced Technology",
      description:
        "Proprietary IT platforms for real-time monitoring and management",
      icon: "tech",
    },
    {
      title: "Cost Efficiency",
      description:
        "Premium services at competitive prices without quality compromise",
      icon: "cost",
    },
  ],
};

const WhyUsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        setInitialData(demoData);
        form.setFieldsValue({
          heading: demoData.sectionTitle,
          subtitle: demoData.sectionSubtitle,
          items: demoData.features,
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/home/why-us/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setInitialData(data);
        form.setFieldsValue({
          heading: data.sectionTitle,
          subtitle: data.sectionSubtitle,
          items: data.features,
        });
      } catch (error) {
        message.error("Failed to load why-us data");
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

      const payload = {
        sectionTitle: values.heading,
        sectionSubtitle: values.subtitle,
        features: values.items,
      };

      console.log("Payload to save:", payload); // For demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/home/why-us/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to save");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Why Us Content Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
        background: colors.white,
        iconColor: colors.primary,
      });
      onClose();
    } catch (error) {
      message.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const renderPreview = () => {
    const values = form.getFieldsValue();
    return (
      <div className="bg-white p-6 rounded-lg">
        <div className="text-center mb-8">
          <Tag
            color={colors.primary}
            className="text-white text-sm font-semibold px-3 py-1 mb-3"
          >
            OUR ADVANTAGES
          </Tag>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: colors.tertiary }}
          >
            {values.heading || "Why Choose KAF TAR"}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: colors.purple }}
          >
            {values.subtitle ||
              "Discover what sets us apart in construction management"}
          </p>
        </div>

        <Row gutter={[24, 24]} className="mt-4">
          {values.items?.map((item, index) => {
            const IconComponent = iconComponents[item.icon] || iconComponents.default;
            return (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  className="h-full border-0 shadow-sm hover:shadow-md transition-all"
                  bodyStyle={{ padding: "24px" }}
                >
                  <div className="flex flex-col items-start h-full">
                    <div
                      className="p-3 rounded-lg mb-4"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: colors.tertiary }}
                    >
                      {item.title || "Feature Title"}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {item.description || "Feature description goes here"}
                    </p>
                    <div
                      className="mt-4 text-sm font-medium"
                      style={{ color: colors.secondary }}
                    >
                      Learn more →
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-xl"
            style={{ color: colors.primary }}
          >
            Edit Why Choose Us Section
          </span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button
          key="preview"
          onClick={togglePreview}
          style={{
            borderColor: colors.secondary,
            color: colors.secondary,
          }}
          className="hover:bg-white hover:opacity-80"
        >
          {previewMode ? "Back to Edit" : "Preview"}
        </Button>,
        <Button
          key="cancel"
          onClick={onClose}
          disabled={saving}
          style={{
            borderColor: colors.tertiary,
            color: colors.tertiary,
          }}
          className="hover:bg-white"
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          loading={saving}
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
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
        {previewMode ? (
          renderPreview()
        ) : (
          <Form form={form} layout="vertical">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <Form.Item
                name="heading"
                label={
                  <span
                    className="font-semibold"
                    style={{ color: colors.tertiary }}
                  >
                    Main Heading
                  </span>
                }
                rules={[{ required: true, message: "Please enter a heading" }]}
              >
                <Input
                  placeholder="Why Choose KAF TAR"
                  style={{
                    height: "48px",
                    fontSize: "16px",
                    borderColor: "#d9d9d9",
                  }}
                  className="hover:border-purple-500 focus:border-purple-500"
                />
              </Form.Item>

              <Form.Item
                name="subtitle"
                label={
                  <span
                    className="font-semibold"
                    style={{ color: colors.tertiary }}
                  >
                    Subheading
                  </span>
                }
                rules={[{ required: true, message: "Please enter a subtitle" }]}
              >
                <TextArea
                  rows={3}
                  placeholder="Discover what sets us apart in construction management"
                  style={{ borderColor: "#d9d9d9" }}
                  className="hover:border-purple-500 focus:border-purple-500"
                />
              </Form.Item>
            </div>

            <Divider
              orientation="left"
              className="font-semibold"
              style={{ color: colors.primary }}
            >
              Features
            </Divider>

            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  <Table
                    dataSource={fields}
                    pagination={false}
                    rowKey="name"
                    columns={[
                      {
                        title: (
                          <span style={{ color: colors.primary }}>Icon</span>
                        ),
                        dataIndex: "icon",
                        width: 180,
                        render: (_, { name, ...restField }) => (
                          <Form.Item
                            {...restField}
                            name={[name, "icon"]}
                            rules={[
                              { required: true, message: "Please select icon" },
                            ]}
                            className="mb-0"
                          >
                            <Select
                              placeholder="Select icon"
                              style={{ borderColor: "#d9d9d9" }}
                              className="hover:border-purple-500 w-full"
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
                                        style={{ color: colors.primary }}
                                      />
                                      <span>{option.label}</span>
                                    </div>
                                  }
                                >
                                  <div className="flex items-center gap-2">
                                    <option.icon
                                      className="w-4 h-4"
                                      style={{ color: colors.primary }}
                                    />
                                    <span className="text-gray-700">
                                      {option.label}
                                    </span>
                                  </div>
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ),
                      },
                      {
                        title: (
                          <span style={{ color: colors.primary }}>Title</span>
                        ),
                        dataIndex: "title",
                        render: (_, { name, ...restField }) => (
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            rules={[
                              { required: true, message: "Please enter title" },
                            ]}
                            className="mb-0"
                          >
                            <Input
                              placeholder="In-House Teams"
                              style={{ borderColor: "#d9d9d9" }}
                              className="hover:border-purple-500 focus:border-purple-500"
                            />
                          </Form.Item>
                        ),
                      },
                      {
                        title: (
                          <span style={{ color: colors.primary }}>
                            Description
                          </span>
                        ),
                        dataIndex: "description",
                        render: (_, { name, ...restField }) => (
                          <Form.Item
                            {...restField}
                            name={[name, "description"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter description",
                              },
                            ]}
                            className="mb-0"
                          >
                            <Input.TextArea
                              rows={2}
                              placeholder="Full control with our in-house teams..."
                              style={{ borderColor: "#d9d9d9" }}
                              className="hover:border-purple-500 focus:border-purple-500"
                            />
                          </Form.Item>
                        ),
                      },
                      {
                        title: "Action",
                        dataIndex: "action",
                        width: 80,
                        render: (_, { name }) => (
                          <Button
                            type="text"
                            danger
                            icon={
                              <DeleteOutlined
                                style={{ color: colors.purple }}
                              />
                            }
                            onClick={() => remove(name)}
                            style={{ backgroundColor: "transparent" }}
                            className="hover:bg-gray-50"
                          />
                        ),
                      },
                    ]}
                    className="border rounded-lg"
                    style={{ borderColor: "#f0f0f0" }}
                  />
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        icon: "in-house",
                        title: "",
                        description: "",
                      })
                    }
                    icon={
                      <PlusOutlined style={{ color: colors.primary }} />
                    }
                    block
                    style={{
                      height: "40px",
                      borderColor: colors.primary,
                      color: colors.primary,
                      marginTop: "16px",
                    }}
                    className="hover:bg-white hover:opacity-80"
                  >
                    Add Feature
                  </Button>
                </>
              )}
            </Form.List>
          </Form>
        )}
      </Spin>
    </Modal>
  );
};

export default WhyUsModal;