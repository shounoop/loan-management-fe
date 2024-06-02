import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal, Row, Table, Tag, theme } from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from './../../utils/axios';
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleFilled,
	EyeOutlined,
} from '@ant-design/icons';
import DataTable from 'react-data-table-component';
import ProductForm from './form/ProductForm';

const Products = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { Content } = Layout;
	const { confirm } = Modal;

	const { http } = Axios();
	React.useEffect(() => {
		const timeout = setTimeout(() => {
			fetchItemList();
		});
		return () => clearTimeout(timeout);
	}, []);

	//Fetch List Data for datatable

	const [productList, setProductList] = useState([]);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');

	const fetchItemList = async () => {
		let isSubscribed = true;
		let formData = {
			action: 'profitLoss',
		};
		await http
			.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/list`)
			.then((res) => {
				if (isSubscribed) {
					console.log('profitLoss', res?.data);
					setProductList(res?.data);
					setData(res?.data);
				}
			})
			.catch((err) => {
				console.log('Server Error ~!');
			});

		return () => (isSubscribed = false);
	};

	const reFetchHandler = (isRender) => {
		if (isRender) fetchItemList();
	};

	const columns = [
		{
			name: <span className="fw-bold">SL</span>,
			selector: (row, index) => index + 1,
			width: '10%',
		},

		{
			name: 'Name',
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: 'Price',
			selector: (row) => row.price,
			sortable: true,
		},

		{
			name: 'Action',
			selector: (row) => actionButton(row),
			sortable: true,
		},
	];

	const showDeleteConfirm = async (id, name) => {
		confirm({
			title: `Are you sure to delete this Subject?`,
			icon: <ExclamationCircleFilled />,
			content: name,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			async onOk() {
				try {
					await http.delete(
						`${process.env.NEXT_PUBLIC_DOMAIN}/api/delete/${id}`
					);
					// After the delete request is successful, call fetchItemList
					fetchItemList();
				} catch (error) {
					// Handle error if the delete request fails
					console.error('Error deleting item:', error);
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const actionButton = (row) => {
		return (
			<>
				<Row
					justify="space-between"
					style={{ display: 'flex', alignItems: 'center' }}
				>
					{/* <a style={{ color: 'green' }}>
            <EyeOutlined style={{ fontSize: '22px' }} />
          </a> */}

					<a onClick={() => handleOpen(row)} className="text-primary">
						<EditOutlined style={{ fontSize: '22px' }} />
					</a>

					<a
						onClick={() => showDeleteConfirm(row.id, row.name)}
						className="text-danger"
					>
						<DeleteOutlined style={{ fontSize: '22px' }} />
					</a>
				</Row>
			</>
		);
	};

	useEffect(() => {
		let controller = new AbortController();
		const result = data?.filter((item) => {
			return item.name.toLowerCase().match(search.toLocaleLowerCase());
		});

		setProductList(result);
		return () => controller.abort();
	}, [search]);

	// product added

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const handleShow = () => {
		setIsModalOpen(true);
		setEditData(null);
	};

	//product update
	const handleOpen = (data) => {
		setEditData(data);
		setIsModalOpen(true);
	};

	return (
		<>
			<Content className="custom-content">
				<div className="responsive-fixed-container">
					<div style={{ padding: '15px', background: colorBgContainer }}>
						<div className="container-fluid">
							<div className="row">
								<div className="col-12">
									<div className=" ">
										<div className="d-flex border-bottom title-part-padding align-items-center">
											<div>
												<h4 className="card-title mb-0">All Products</h4>
											</div>
											<div className="ms-auto flex-shrink-0">
												<Button
													className="shadow rounded"
													type="primary"
													onClick={handleShow}
													block
													style={{ backgroundColor: '#007bff', color: '#fff' }}
												>
													<span>Add</span>
													<span className="button-icon-space ml-5">
														<FontAwesomeIcon icon={faPlusCircle} />
													</span>
												</Button>
											</div>
										</div>

										<ProductForm
											isModalOpen={isModalOpen}
											setIsModalOpen={setIsModalOpen}
											isParentRender={reFetchHandler}
											setEditData={editData}
										/>

										<Content>
											<DataTable
												columns={columns}
												data={productList}
												pagination
												highlightOnHover
												subHeader
												subHeaderComponent={
													<input
														type="text"
														placeholder="search by name"
														className="w-25 form-control"
														value={search}
														onChange={(e) => setSearch(e.target.value)}
													/>
												}
												striped
											/>
										</Content>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Content>
		</>
	);
};

export default Products;
