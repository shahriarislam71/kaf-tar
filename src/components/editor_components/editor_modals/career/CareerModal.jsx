import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Card, Divider, Space, Spin, Tag, Upload, Collapse, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
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

const CareerModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activePanels, setActivePanels] = useState([]);
  const [benefitPanels, setBenefitPanels] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Icons for benefits
  const benefitIcons = [
    { value: 'salary', label: 'Salary', emoji: '💰' },
    { value: 'training', label: 'Training', emoji: '🎓' },
    { value: 'growth', label: 'Growth', emoji: '📈' },
    { value: 'balance', label: 'Balance', emoji: '⚖️' },
    { value: 'health', label: 'Health', emoji: '🏥' },
    { value: 'team', label: 'Team', emoji: '👥' },
  ];

  // Job types and departments
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const departments = ['Operations', 'Technical Services', 'Human Resources', 'Finance', 'Administration', 'Sales'];

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/career/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        // Sample data structure if API is not ready
        const data = await response.json() || {
          sectionTitle: "Join Our Team",
          sectionSubtitle: "Build your career with KAF TAR",
          intro: "We're looking for passionate professionals to join our growing team. At KAF TAR, we value innovation, teamwork, and continuous learning.",
          benefits: [
            {
              title: "Competitive Salaries",
              icon: "salary",
              description: "Industry-leading compensation packages"
            },
            {
              title: "Training Programs",
              icon: "training",
              description: "Continuous professional development"
            },
            {
              title: "Career Growth",
              icon: "growth",
              description: "Clear paths for advancement"
            },
            {
              title: "Work-Life Balance",
              icon: "balance",
              description: "Flexible working arrangements"
            }
          ],
          openPositions: [
            {
              id: 1,
              title: "Facility Manager",
              location: "Riyadh",
              type: "Full-time",
              department: "Operations",
              description: "Lead facility management teams and ensure service excellence."
            },
            {
              id: 2,
              title: "HVAC Technician",
              location: "Jeddah",
              type: "Full-time",
              department: "Technical Services",
              description: "Install and maintain HVAC systems across client facilities."
            },
            {
              id: 3,
              title: "HR Specialist",
              location: "Riyadh",
              type: "Full-time",
              department: "Human Resources",
              description: "Manage recruitment and employee relations."
            }
          ],
          culture: "At KAF TAR, we foster a collaborative environment where every team member's contribution is valued. We're committed to diversity, inclusion, and employee well-being."
        };
        
        form.setFieldsValue(data);
        // Expand all benefit panels by default
        setBenefitPanels(data.benefits?.map((_, index) => index.toString()) || []);
      } catch (error) {
        message.error('Failed to load career data');
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
      
      const response = await fetch(`${apiUrl}/career/`, {
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
        title: "Career Section Updated",
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
            Edit Careers Section
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
          {/* Section Header */}
          <Card 
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <div className="space-y-4">
              <Form.Item
                name="sectionTitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Section Title</span>}
                rules={[{ required: true, message: 'Please enter section title' }]}
              >
                <Input 
                  placeholder="Join Our Team" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name="sectionSubtitle"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Section Subtitle</span>}
                rules={[{ required: true, message: 'Please enter section subtitle' }]}
              >
                <Input 
                  placeholder="Build your career with KAF TAR" 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>

              <Form.Item
                name="intro"
                label={<span className="font-semibold" style={{ color: COLORS.dark }}>Introduction</span>}
                rules={[{ required: true, message: 'Please enter introduction text' }]}
              >
                <TextArea 
                  rows={3} 
                  placeholder="We're looking for passionate professionals to join our growing team..." 
                  className="rounded-lg hover:border-green-500 focus:border-green-500"
                />
              </Form.Item>
            </div>
          </Card>

          {/* Company Culture */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Company Culture</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.Item
              name="culture"
              rules={[{ required: true, message: 'Please enter company culture description' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="At KAF TAR, we foster a collaborative environment..." 
                className="rounded-lg hover:border-green-500 focus:border-green-500"
              />
            </Form.Item>
          </Card>

          {/* Employee Benefits */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Employee Benefits</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="benefits">
              {(fields, { add, remove }) => (
                <Collapse 
                  activeKey={benefitPanels}
                  onChange={setBenefitPanels}
                  bordered={false}
                  className="bg-white"
                >
                  {fields.map(({ key, name, ...restField }) => {
                    const benefitIcon = form.getFieldValue(['benefits', name, 'icon']);
                    const iconData = benefitIcons.find(icon => icon.value === benefitIcon) || benefitIcons[0];
                    
                    return (
                      <Panel 
                        header={
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{iconData.emoji}</span>
                            <span className="font-medium">
                              {form.getFieldValue(['benefits', name, 'title']) || `Benefit ${name + 1}`}
                            </span>
                          </div>
                        }
                        key={name.toString()}
                        extra={
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(name);
                            }}
                            style={{ color: '#ff4d4f' }}
                          />
                        }
                        className="mb-3 border border-gray-200 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3">
                            <Form.Item
                              {...restField}
                              name={[name, 'icon']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Icon</span>}
                              rules={[{ required: true, message: 'Please select an icon' }]}
                            >
                              <Select 
                                placeholder="Select icon" 
                                className="w-full"
                              >
                                {benefitIcons.map(icon => (
                                  <Select.Option key={icon.value} value={icon.value}>
                                    <div className="flex items-center">
                                      <span className="text-xl mr-2">{icon.emoji}</span>
                                      <span>{icon.label}</span>
                                    </div>
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="md:col-span-9 space-y-4">
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Title</span>}
                              rules={[{ required: true, message: 'Please enter title' }]}
                            >
                              <Input 
                                placeholder="Competitive Salaries" 
                                className="rounded-lg hover:border-green-500 focus:border-green-500"
                              />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label={<span className="font-medium" style={{ color: COLORS.dark }}>Description</span>}
                              rules={[{ required: true, message: 'Please enter description' }]}
                            >
                              <TextArea 
                                rows={2} 
                                placeholder="Industry-leading compensation packages" 
                                className="rounded-lg hover:border-green-500 focus:border-green-500"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              )}
            </Form.List>

            <Button
              type="dashed"
              onClick={() => {
                const newIndex = form.getFieldValue('benefits')?.length || 0;
                form.setFieldsValue({
                  benefits: [
                    ...(form.getFieldValue('benefits') || []),
                    {
                      title: `New Benefit ${newIndex + 1}`,
                      description: '',
                      icon: 'salary'
                    }
                  ]
                });
                setBenefitPanels([...benefitPanels, newIndex.toString()]);
              }}
              icon={<PlusOutlined />}
              block
              className="mt-4 rounded-lg h-10"
              style={{ 
                borderColor: COLORS.accent,
                color: COLORS.accent,
                backgroundColor: `${COLORS.accent}10` // 10% opacity
              }}
            >
              Add Employee Benefit
            </Button>
          </Card>

          {/* Open Positions */}
          <Card 
            title={<span className="font-semibold" style={{ color: COLORS.dark }}>Open Positions</span>}
            bordered={false} 
            className="rounded-xl shadow-sm border-0 bg-gradient-to-r from-[#f9f9f9] to-white"
          >
            <Form.List name="openPositions">
              {(fields, { add, remove }) => (
                <Collapse 
                  activeKey={activePanels}
                  onChange={setActivePanels}
                  bordered={false}
                  className="bg-white"
                >
                  {fields.map(({ key, name, ...restField }) => (
                    <Panel 
                      header={
                        <span className="font-medium">
                          {form.getFieldValue(['openPositions', name, 'title']) || `Position ${name + 1}`}
                        </span>
                      }
                      key={name.toString()}
                      extra={
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(name);
                          }}
                          style={{ color: '#ff4d4f' }}
                        />
                      }
                      className="mb-3 border border-gray-200 rounded-lg"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label={<span className="font-medium" style={{ color: COLORS.dark }}>Job Title</span>}
                          rules={[{ required: true, message: 'Please enter job title' }]}
                        >
                          <Input 
                            placeholder="Facility Manager" 
                            className="rounded-lg hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'location']}
                          label={<span className="font-medium" style={{ color: COLORS.dark }}>Location</span>}
                          rules={[{ required: true, message: 'Please enter location' }]}
                        >
                          <Input 
                            placeholder="Riyadh" 
                            className="rounded-lg hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          label={<span className="font-medium" style={{ color: COLORS.dark }}>Job Type</span>}
                          rules={[{ required: true, message: 'Please select job type' }]}
                        >
                          <Select 
                            placeholder="Select job type" 
                            className="w-full rounded-lg"
                          >
                            {jobTypes.map(type => (
                              <Select.Option key={type} value={type}>
                                {type}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'department']}
                          label={<span className="font-medium" style={{ color: COLORS.dark }}>Department</span>}
                          rules={[{ required: true, message: 'Please select department' }]}
                        >
                          <Select 
                            placeholder="Select department" 
                            className="w-full rounded-lg"
                          >
                            {departments.map(dept => (
                              <Select.Option key={dept} value={dept}>
                                {dept}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label={<span className="font-medium" style={{ color: COLORS.dark }}>Job Description</span>}
                          rules={[{ required: true, message: 'Please enter job description' }]}
                          className="md:col-span-2"
                        >
                          <TextArea 
                            rows={3} 
                            placeholder="Lead facility management teams and ensure service excellence." 
                            className="rounded-lg hover:border-green-500 focus:border-green-500"
                          />
                        </Form.Item>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              )}
            </Form.List>

            <Button
              type="dashed"
              onClick={() => {
                const newIndex = form.getFieldValue('openPositions')?.length || 0;
                form.setFieldsValue({
                  openPositions: [
                    ...(form.getFieldValue('openPositions') || []),
                    {
                      title: `New Position ${newIndex + 1}`,
                      location: '',
                      type: 'Full-time',
                      department: 'Operations',
                      description: ''
                    }
                  ]
                });
                setActivePanels([...activePanels, newIndex.toString()]);
              }}
              icon={<PlusOutlined />}
              block
              className="mt-4 rounded-lg h-10"
              style={{ 
                borderColor: COLORS.primary,
                color: COLORS.primary,
                backgroundColor: `${COLORS.primary}10` // 10% opacity
              }}
            >
              Add Open Position
            </Button>
          </Card>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CareerModal;