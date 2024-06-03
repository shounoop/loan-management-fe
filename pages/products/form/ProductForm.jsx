import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import useAxios from '../../../utils/axios';

const { Option } = Select;

const ProductForm = (props) => {
	const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;

	const { http } = useAxios();

	console.log('setEditData', setEditData);

	const [form] = Form.useForm();

	const layout = {
		labelCol: { span: 6 },
		wrapperCol: {
			span: 16,
		},
	};
	const tailLayout = {
		wrapperCol: {
			offset: 6,
			span: 16,
		},
	};

	if (setEditData == null) {
		form.resetFields();
	} else {
		form.setFieldsValue({
			name: setEditData.name,
			price: setEditData.price,
			description: setEditData.description,
		});
	}

	const onFinish = async (values) => {
		// setLoading(true);

		if (setEditData?.id) {
			http.put(`/api/update-product/${setEditData?.id}`, values);
			isParentRender(true);
			setIsModalOpen(false);
		} else {
			http.post(`/api/addProduct`, values);
			isParentRender(true);
			setIsModalOpen(false);
		}
	};
	return (
		<Modal
			title={setEditData != null ? 'Update Product' : 'Add Product'}
			style={{ top: 20 }}
			centered
			open={isModalOpen}
			footer={null}
			onOk={() => setIsModalOpen(false)}
			onCancel={() => setIsModalOpen(false)}
		>
			<Form
				className="mt-3"
				{...layout}
				{...setEditData}
				form={form}
				name="control-hooks"
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name="name"
					label="Product Name"
					rules={[
						{
							required: true,
							message: 'Product name is required',
						},
					]}
					hasFeedback
				>
					<Input className="input-box" />
				</Form.Item>

				<Form.Item
					name="price"
					label="Product Price"
					rules={[
						{
							required: true,
							message: 'Product price is required',
						},
					]}
					hasFeedback
				>
					<Input type="number" className="input-box" />
				</Form.Item>

				<Form.Item
					name="description"
					label="Product Description"
					rules={[
						{
							required: true,
							message: 'Product description is required',
						},
					]}
					hasFeedback
				>
					<Input.TextArea rows={4} className="input-box" />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button
						style={{ backgroundColor: '#007bff', color: '#fff' }}
						type="primary"
						htmlType="submit"

						// loading={loading}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ProductForm;
