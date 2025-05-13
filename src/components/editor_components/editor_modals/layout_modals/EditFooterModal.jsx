import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Divider,
  Spin,
  Upload,
  Select,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Home,
  Info,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import Swal from "sweetalert2";

const { TextArea } = Input;
const { Option } = Select;

// KAF TAR color scheme
const COLORS = {
  primary: "#7bbf42",       // KAF TAR green
  secondary: "#f9b414",     // KAF TAR yellow
  tertiary: "#040404",      // KAF TAR black
  purple: "#70308c",        // KAF TAR purple
  white: "#ffffff",
  border: "#e5e7eb",        // Light gray border
};

const socialIcons = {
  linkedin: <Linkedin className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
};

const serviceIcons = {
  manpower: <Users className="w-4 h-4" />,      // Changed from User to Users
  maintenance: <Wrench className="w-4 h-4" />,  // Changed from Tool to Wrench
  cleaning: <Wrench className="w-4 h-4" />,     // Changed from Tool to Wrench
  hvac: <Settings className="w-4 h-4" />,
};

const FooterModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        // Simulate API call with demo data
        await new Promise((resolve) => setTimeout(resolve, 800));
        form.setFieldsValue({
          companyInfo: {
            name: "Kaf Tar for Operation and Maintenance",
            arabicName: "شركة كامتار للتشغيل والصيانة",
            address: "9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia",
            phone: "+966 56 705 5580",
            email: "info@kaftaroperations.com",
            website: "www.kaftaroperations.com"
          },
          quickLinks: [
            { title: "Home", url: "/" },
            { title: "About Us", url: "/about" },
            { title: "Services", url: "/services" },
            { title: "Projects", url: "/projects" },
            { title: "Contact", url: "/contact" }
          ],
          services: [
            { title: "Manpower Support", url: "/services/manpower" },
            { title: "Facility Maintenance", url: "/services/maintenance" },
            { title: "Cleaning Services", url: "/services/cleaning" },
            { title: "HVAC Systems", url: "/services/hvac" }
          ],
          socialMedia: [
            { platform: "LinkedIn", url: "#", icon: "linkedin" },
            { platform: "Twitter", url: "#", icon: "twitter" },
            { platform: "Instagram", url: "#", icon: "instagram" },
            { platform: "YouTube", url: "#", icon: "youtube" }
          ],
          copyright: "© 2023 KAF TAR. All rights reserved."
        });

        // Actual API call would look like this:
        const response = await fetch(`${apiUrl}/layout/footer/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        form.setFieldsValue(data);
      } catch (error) {
        message.error("Failed to load footer data");
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
      const response = await fetch(`${apiUrl}/layout/footer/`, {
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
        title: "Footer Content Updated Successfully",
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

  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "footer");

    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const url = URL.createObjectURL(file);
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
            Edit Footer Content
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
          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Company Information
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["companyInfo", "name"]}
                label={
                  <span style={{ color: COLORS.tertiary }}>Company Name (English)</span>
                }
                rules={[{ required: true, message: "Please enter company name" }]}
              >
                <Input
                  placeholder="Kaf Tar for Operation and Maintenance"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["companyInfo", "arabicName"]}
                label={
                  <span style={{ color: COLORS.tertiary }}>Company Name (Arabic)</span>
                }
              >
                <Input
                  placeholder="شركة كامتار للتشغيل والصيانة"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={["companyInfo", "address"]}
            label={
              <span style={{ color: COLORS.tertiary }}>Address</span>
            }
          >
            <Input
              placeholder="9191 Al Olaya Dist. Riyadh 12611, Saudi Arabia"
              style={{ borderColor: COLORS.border }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["companyInfo", "phone"]}
                label={
                  <span style={{ color: COLORS.tertiary }}>Phone Number</span>
                }
              >
                <Input
                  placeholder="+966 56 705 5580"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["companyInfo", "email"]}
                label={
                  <span style={{ color: COLORS.tertiary }}>Email</span>
                }
                rules={[{ type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input
                  placeholder="info@kaftaroperations.com"
                  style={{ borderColor: COLORS.border }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={["companyInfo", "website"]}
            label={
              <span style={{ color: COLORS.tertiary }}>Website</span>
            }
          >
            <Input
              placeholder="www.kaftaroperations.com"
              style={{ borderColor: COLORS.border }}
            />
          </Form.Item>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Quick Links
          </Divider>

          <Form.List name="quickLinks">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>Link Text</span>
                          }
                          rules={[{ required: true, message: "Please enter link text" }]}
                        >
                          <Input
                            placeholder="About Us"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "url"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>URL</span>
                          }
                          rules={[{ required: true, message: "Please enter URL" }]}
                        >
                          <Input
                            placeholder="/about"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2} className="flex items-end">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: COLORS.purple }}
                          className="hover:bg-purple-50"
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ title: "", url: "" })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Quick Link
                </Button>
              </div>
            )}
          </Form.List>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Services Links
          </Divider>

          <Form.List name="services">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>Service Name</span>
                          }
                          rules={[{ required: true, message: "Please enter service name" }]}
                        >
                          <Input
                            placeholder="Facility Maintenance"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "url"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>URL</span>
                          }
                          rules={[{ required: true, message: "Please enter URL" }]}
                        >
                          <Input
                            placeholder="/services/maintenance"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2} className="flex items-end">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: COLORS.purple }}
                          className="hover:bg-purple-50"
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ title: "", url: "" })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Service Link
                </Button>
              </div>
            )}
          </Form.List>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Social Media
          </Divider>

          <Form.List name="socialMedia">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="border-0 shadow-sm"
                    bodyStyle={{ padding: "16px" }}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "platform"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>Platform</span>
                          }
                          rules={[{ required: true, message: "Please select platform" }]}
                        >
                          <Select
                            placeholder="Select platform"
                            style={{ borderColor: COLORS.border }}
                          >
                            <Option value="linkedin">LinkedIn</Option>
                            <Option value="twitter">Twitter</Option>
                            <Option value="instagram">Instagram</Option>
                            <Option value="youtube">YouTube</Option>
                            <Option value="facebook">Facebook</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "url"]}
                          label={
                            <span style={{ color: COLORS.tertiary }}>Profile URL</span>
                          }
                          rules={[{ required: true, message: "Please enter URL" }]}
                        >
                          <Input
                            placeholder="https://linkedin.com/company/kaftar"
                            style={{ borderColor: COLORS.border }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} className="flex items-end">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          style={{ color: COLORS.purple }}
                          className="hover:bg-purple-50"
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ platform: "", url: "" })}
                  icon={<PlusOutlined />}
                  block
                  style={{
                    borderColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                  className="hover:bg-green-50 h-10"
                >
                  Add Social Media
                </Button>
              </div>
            )}
          </Form.List>

          <Divider
            orientation="left"
            className="font-semibold text-lg"
            style={{ color: COLORS.primary, borderColor: COLORS.border }}
          >
            Copyright Text
          </Divider>

          <Form.Item
            name="copyright"
            rules={[{ required: true, message: "Please enter copyright text" }]}
          >
            <Input
              placeholder="© 2023 KAF TAR. All rights reserved."
              style={{ borderColor: COLORS.border }}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default FooterModal;