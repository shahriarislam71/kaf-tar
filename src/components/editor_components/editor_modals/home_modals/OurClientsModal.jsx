import React, { useState, useEffect } from "react";
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
  Image,
  Select,
  Card,
  Row,
  Col,
  Tag,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const { TextArea } = Input;

// Color constants using KAF TAR brand colors
const COLORS = {
  primary: "#7bbf42",       // KAF TAR green
  secondary: "#f9b414",     // KAF TAR yellow
  tertiary: "#040404",      // KAF TAR black
  purple: "#70308c",        // KAF TAR purple
  white: "#ffffff",
  border: "#e5e7eb",        // Light gray border
  accent: "#e74c3c",        // For error/danger actions
};

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Government",
  "Retail",
  "Airports",
  "Manufacturing",
  "Warehouses",
  "Financial Institutions",
  "Construction",
  "Real Estate",
  "Hospitality",
  "Energy",
];

const OurClientsModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        form.setFieldsValue({
          title: "Trusted By Industry Leaders",
          subtitle: "We proudly serve these market segments",
          logos: [
            {
              name: "Education",
              image: "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-ladders-education-day_23-2149241014.jpg",
              category: "Education",
            },
            {
              name: "Healthcare",
              image: "https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg",
              category: "Healthcare",
            },
            {
              name: "Government",
              image: "https://img.freepik.com/premium-photo/massachusetts-state-house-boston_155769-2110.jpg",
              category: "Government",
            },
          ],
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/home/client-logos/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load clients data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, form]);

  const handleImageUpload = async (file, index) => {
    setUploading(true);
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "clients");

    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const url = URL.createObjectURL(file);
      
      const logos = form.getFieldValue("logos") || [];
      logos[index] = { ...logos[index], image: url };
      form.setFieldsValue({ logos });

      return url;
      
      // Actual upload would look like this:
      // const response = await fetch(`${apiUrl}/images/`, {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!response.ok) throw new Error("Upload failed");
      // const { url } = await response.json();
      // return url;
    } catch (error) {
      message.error("Image upload failed");
      console.error(error);
      return null;
    } finally {
      setUploading(false);
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();

      // Simulate API save
      console.log("Saving data:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actual API call would look like this:
      const response = await fetch(`${apiUrl}/home/client-logos/`, {
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
        title: "Clients Section Updated Successfully",
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

  const uploadProps = (index) => ({
    name: "image",
    showUploadList: false,
    beforeUpload: (file) => {
      handleImageUpload(file, index);
      return false;
    },
    accept: "image/*",
  });

  const renderLogoPreview = (imageUrl) => {
    if (!imageUrl) return null;
    return (
      <div className="mt-2">
        <Image
          src={imageUrl}
          width={120}
          height={80}
          className="object-cover rounded-md border"
          alt="Logo preview"
          style={{ borderColor: COLORS.border }}
        />
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-xl"
            style={{ color: COLORS.primary }}
          >
            Edit Our Clients Section
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
          disabled={uploading}
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
              name="title"
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
                placeholder="Trusted By Industry Leaders"
                className="h-12 text-lg"
                style={{ borderColor: COLORS.border }}
              />
            </Form.Item>

            <Form.Item
              name="subtitle"
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
                placeholder="We proudly serve these market segments"
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
            Client Logos & Categories
          </Divider>

          <Form.List name="logos">
            {(fields, { add, remove }) => (
              <div className="space-y-6">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>
                            Client Name
                          </span>
                        }
                        rules={[
                          { required: true, message: "Please enter client name" },
                        ]}
                      >
                        <Input
                          placeholder="Client Name"
                          style={{ borderColor: COLORS.border }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "category"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>
                            Industry Category
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please select category",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select category"
                          style={{ borderColor: COLORS.border }}
                          options={CATEGORIES.map(cat => ({
                            value: cat,
                            label: cat,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "image"]}
                        label={
                          <span style={{ color: COLORS.tertiary }}>
                            Logo/Image
                          </span>
                        }
                        rules={[
                          { required: true, message: "Please upload an image" },
                        ]}
                      >
                        <div>
                          <Space.Compact className="w-full">
                            <Input
                              placeholder="Image URL"
                              style={{ borderColor: COLORS.border }}
                            />
                            <Upload {...uploadProps(index)}>
                              <Button
                                icon={<UploadOutlined />}
                                loading={uploading && uploadingIndex === index}
                                style={{
                                  backgroundColor: COLORS.secondary,
                                  borderColor: COLORS.secondary,
                                  color: COLORS.tertiary,
                                }}
                                className="hover:opacity-90"
                              >
                                Upload
                              </Button>
                            </Upload>
                          </Space.Compact>
                          {renderLogoPreview(
                            form.getFieldValue(["logos", index, "image"])
                          )}
                        </div>
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
                  onClick={() => add({ name: "", category: "", image: "" })}
                  icon={<PlusOutlined />}
                  block
                  disabled={uploading}
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add New Client
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Spin>
    </Modal>
  );
};

export default OurClientsModal;