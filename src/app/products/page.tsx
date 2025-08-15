"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Table, Button, Modal, Form, Input, InputNumber, Space, message } from "antd";
import type { ProductType, ProductListParamsType } from "../types/product";
import { Typography } from "antd";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";

function ProductsPage() {
    const { user, getToken, logout } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pagination, setPagination] = useState<ProductListParamsType>({
        page: 1,
        limit: 10,
        offset: 0,
        search: "",
    });
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"create" | "edit">("create");
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<ProductType | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        const delayDebounce = setTimeout(() => {
            fetchProducts(pagination.page, pagination.limit, searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [user, pagination.page, pagination.limit, searchTerm]);

    // fetch products
    const fetchProducts = async (page = 1, limit = 10, search = "") => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await axios.get("/api/products", {
                headers: { Authorization: token },
                params: { page, limit, search },
            });
            console.log("API Response:", res.data);

            setProducts(res.data.data);
            setPagination((prev) => ({
                ...prev,
                page: res.data.pagination.page,
                limit: res.data.pagination.limit,
                offset: (res.data.pagination.page - 1) * res.data.pagination.limit,
                search: res.data.pagination.search || "",
            }));
            setTotalItems(res.data.pagination.total);
        } catch {
            message.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // create product
    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            const token = await getToken();
            await axios.post("/api/product", values, {
                headers: { Authorization: token },
            });
            message.success("Product created successfully");
            setModalOpen(false);
            form.resetFields();
            fetchProducts(pagination.page, pagination.limit, pagination.search);
        } catch {
            message.error("Failed to create product");
        }
    };

    // edit product
    const handleEdit = async () => {
        try {
            const values = await form.validateFields();
            const token = await getToken();
            await axios.put(
                "/api/product",
                { ...values, product_id: editingId },
                { headers: { Authorization: token } }
            );
            message.success("Product updated successfully");
            setModalOpen(false);
            form.resetFields();
            setEditingId(null);
            fetchProducts(pagination.page, pagination.limit, pagination.search);
        } catch {
            message.error("Failed to update product");
        }
    };

    // delete product
    const handleDelete = async (record: ProductType) => {
        try {
            const token = await getToken();

            await axios.delete(`/api/product?product_id=${record.product_id}`, {
                headers: { Authorization: token },
            });

            message.success("Product deleted successfully");
            fetchProducts(pagination.page, pagination.limit, pagination.search);
        } catch {
            message.error("Failed to delete product");
        }
    };

    // handle edit modal
    const openEditModal = (record: ProductType) => {
        setModalType("edit");
        setEditingId(record.product_id);
        form.setFieldsValue(record);
        setModalOpen(true);
    };

    // handle create modal
    const openCreateModal = () => {
        setModalType("create");
        form.resetFields();
        setEditingId(null);
        setModalOpen(true);
    };

    // handle table change
    const handleTableChange = (paginationInfo: any) => {
        setPagination((prev) => ({
            ...prev,
            page: paginationInfo.current,
            limit: paginationInfo.pageSize,
        }));
    };

    // handle logout
    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    // handle confirm delete
    const confirmDelete = async () => {
        if (recordToDelete) {
            await handleDelete(recordToDelete);
            setDeleteModalOpen(false);
            setRecordToDelete(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white px-6 py-5">
            <div className="flex items-center justify-between mb-6">
                <Typography.Title level={3} className="!mb-0">
                    List Products
                </Typography.Title>

                <Button
                    onClick={handleLogout}
                    danger
                    icon={<LogoutOutlined />}
                    className="pr-5 mr-20"
                >
                    Logout
                </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <Button type="primary" onClick={openCreateModal}>
                    Create Product
                </Button>
                <Input
                    placeholder="Search products..."
                    allowClear

                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPagination((prev) => ({ ...prev, page: 1 }));
                    }}
                    prefix={<SearchOutlined style={{ color: '#aaa' }} />}
                    className="w-72"
                />
            </div>
            <div className="flex-1 flex flex-col">
                <Table<ProductType>
                    dataSource={products}
                    rowKey="product_id"
                    columns={[
                        {
                            title: "No",
                            width: 70,
                            render: (_: any, __: any, index: number) =>
                                (pagination.page - 1) * pagination.limit + index + 1,
                        },
                        { title: "Title", dataIndex: "product_title" },
                        {
                            title: "Price",
                            dataIndex: "product_price",
                            render: (price: number) => {
                                return new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                }).format(price);
                            },
                        },
                        { title: "Category", dataIndex: "product_category" },
                        { title: "Description", dataIndex: "product_description" },
                        {
                            title: "Actions",
                            width: 240,
                            align: "center",

                            render: (_: any, record: any) => (
                                <Space>
                                    <Button type="primary" onClick={() => openEditModal(record)}>
                                        Edit
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            setRecordToDelete(record);
                                            setDeleteModalOpen(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    loading={loading}
                    pagination={{
                        current: pagination.page,
                        pageSize: pagination.limit,
                        total: totalItems,
                    }}
                    onChange={handleTableChange}
                    scroll={{
                        y: "calc(100vh - 250px)",
                    }}
                    className="flex-1"
                />
            </div>

            {/* modal create and edit*/}
            <Modal
                title={modalType === "create" ? "Create Product" : "Edit Product"}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onOk={modalType === "create" ? handleCreate : handleEdit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="product_title"
                        label="Title"
                        className="mb-4"
                        rules={[{ required: true, message: "Product title is required" }]}
                    >
                        <Input className="!rounded !h-10" />
                    </Form.Item>
                    <Form.Item
                        name="product_price"
                        label="Price"
                        className="mb-4"
                        rules={[
                            { required: true, message: "Price is required" },
                            { type: "number", min: 0, message: "Price must be a number and at least 0" },
                        ]}
                    >
                        <InputNumber className="!w-full !rounded !h-10" />
                    </Form.Item>
                    <Form.Item
                        name="product_description"
                        label="Description"
                        className="mb-4"
                    >
                        <Input.TextArea className="!rounded" rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="product_category"
                        label="Category"
                        className="mb-4"
                    >
                        <Input className="!rounded !h-10" />
                    </Form.Item>
                    <Form.Item
                        name="product_image"
                        label="Image URL"
                        className="mb-0"
                    >
                        <Input className="!rounded !h-10" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* modal konfirmasi delete */}
            <Modal
                title="Delete Product"
                open={deleteModalOpen}
                onOk={confirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
                okText="Yes"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
            >
                <p>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{recordToDelete?.product_title}</span>?
                </p>
            </Modal>
        </div>
    );
}

export default ProductsPage;