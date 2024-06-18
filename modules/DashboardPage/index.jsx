import styles from './Index.module.scss';
import { Card, Space } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { EXPRESS_API_URL } from '@/constants/api-url';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Customer of 2024',
    },
  },
};

const optionsPayment = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Loan Application of 2024',
    },
  },
}

const optionsLoanProduct = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Loan Product of 2024',
    },
  },
}

const data = {
  labels,
  datasets: [
    {
      label: 'Customer',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const loanApplicationData = {
  labels,
  datasets: [
    {
      label: 'Loan Application',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(66, 78, 245, 0.5)',
    }
  ],
};

const loanProductData = {
  labels,
  datasets: [
    {
      label: 'Loan Product',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(92, 177, 237, 0.5)',
    }
  ],
};

const BASE_URL = "http://localhost:3000"
const DashboardPage = () => {

  const [chartData, setChartData] = useState(data)
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalCustomerOfToday, setTotalCustomerOfToday] = useState(0);

  const [chartLoanApplicationData, setChartLoanApplicationData] = useState(loanApplicationData)
  const [totalLoanApplications, setTotalLoanApplications] = useState(0);
  const [totalLoanApplicationsOfToday, setTotalLoanApplicationsOfToday] = useState(0);

  const [chartLoanProductData, setChartLoanProductData] = useState(loanProductData)
  const [totalLoanProducts, setTotalLoanProducts] = useState(0);
  const [mostSoldLoanProduct, setMostSoldLoanProduct] = useState('');
  const [mostSoldLoanProductOfOneMonthInAYear, setMostSoldLoanProductOfOneMonthInAYear] = useState('')

  useEffect(() => {
    getTotalCustomer()
    getTotalCustomerInAYear()
    getTotalCustomerOfToday()
    getTotalLoanApplication()
    getTotalLoanApplicationInAYear()
    getTotalLoanApplicationOfToday()
    getTotalLoanProducts()
    getTotalLoanProductsInAYear()
    getMostSoldLoanProductInAYear()
    getMostSoldLoanProductOfOneMonthInAYear()
  }, [])

  const getTotalCustomer = async () => {
    try {
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.CUSTOMER}/total`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setTotalCustomers(response.metadata)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalCustomerInAYear = async () => {
    try {
      const year = (new Date()).getFullYear()
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.CUSTOMER}/total/year/${year}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data.metadata)
        .catch((err) => {
          console.log(err)
        })
      let dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      response.forEach((element) => {
        dataArr[element.month - 1] = element.total_customer
      })
      setChartData({
        labels,
        datasets: [
          {
            label: 'Customer',
            data: dataArr,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalCustomerOfToday = async () => {
    try {
      const today = new Date()
      const date = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const formatDate = `${year}-${month}-${date}`;
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.CUSTOMER}/total/${formatDate}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setTotalCustomerOfToday(response.metadata)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalLoanApplication = async () => {
    try {
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_APPLICATION}/total`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setTotalLoanApplications(response.metadata)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalLoanApplicationInAYear = async () => {
    try {
      const year = (new Date()).getFullYear()
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_APPLICATION}/total/year/${year}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data.metadata)
        .catch((err) => {
          console.log(err)
        })
      let dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      response.forEach((element) => {
        dataArr[element.month - 1] = element.total_payment_month
      })
      setChartLoanApplicationData({
        labels,
        datasets: [
          {
            label: 'Loan Application',
            data: dataArr,
            backgroundColor: 'rgba(66, 78, 245, 0.5)',
          }
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalLoanApplicationOfToday = async () => {
    try {
      const today = new Date()
      const date = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const formatDate = `${year}-${month}-${date}`;
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_APPLICATION}/total/${formatDate}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setTotalLoanApplicationsOfToday(response.metadata)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalLoanProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_PRODUCT}/total`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setTotalLoanProducts(response.metadata)
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalLoanProductsInAYear = async () => {
    try {
      const year = (new Date()).getFullYear()
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_PRODUCT}/total/year/${year}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data.metadata)
        .catch((err) => {
          console.log(err)
        })
      let dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      response.forEach((element) => {
        dataArr[element.month - 1] = element.total_loan_product
      })
      setChartLoanProductData({
        labels,
        datasets: [
          {
            label: 'Loan Product',
            data: dataArr,
            backgroundColor: 'rgba(92, 177, 237, 0.5)',
          }
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getMostSoldLoanProductInAYear = async () => {
    try {
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_PRODUCT}/most-sold/year/2024`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setMostSoldLoanProduct(response.metadata.loan_product_name)
    } catch (err) {
      console.log(err)
    }
  }

  const getMostSoldLoanProductOfOneMonthInAYear = async () => {
    try {
      const today = new Date()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const response = await fetch(`${BASE_URL}${EXPRESS_API_URL.LOAN_PRODUCT}/most-sold/year/${year}/month/${month}`, {
        credentials: 'include'
      }).then(data => data.json())
        .then(data => data)
        .catch((err) => {
          console.log(err)
        })
      setMostSoldLoanProductOfOneMonthInAYear(response.metadata.loan_product_name)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className={`${styles.heading_title}`}>
        Dashboard
      </div>
      <Space className={`${styles.wrapper}`} direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title={"Customer"} size="default">
          <div style={{ display: 'flex', gap: '2em', justifyContent: 'center', alignItems: 'center' }}>
            <div className={`${styles.chart_container}`}>
              <Bar options={options} data={chartData} />
            </div>
            <div className={`${styles.statistic_container}`}>
              <Card title="Total Customers" size="default">
                <div className={`${styles.total_text}`}>
                  {totalCustomers}
                </div>
              </Card>
              <Card title="Total New Customer Of Today" size="default">
                <div className={`${styles.total_text}`}>
                  {totalCustomerOfToday}
                </div>
              </Card>
            </div>
          </div>
        </Card>
        <Card title={"Loan Application"} size="default">
          <div style={{ display: 'flex', gap: '2em', justifyContent: 'center', alignItems: 'center' }}>
            <div className={`${styles.chart_container}`}>
              <Bar options={optionsPayment} data={chartLoanApplicationData} />
            </div>
            <div className={`${styles.statistic_container}`}>
              <Card title="Total Loan Application" size="default">
                <div className={`${styles.total_text}`}>
                  {totalLoanApplications}
                </div>
              </Card>
              <Card title="Total New Loan Application Of Today" size="default">
                <div className={`${styles.total_text}`}>
                  {totalLoanApplicationsOfToday}
                </div>
              </Card>
            </div>
          </div>
        </Card>
        <Card title={"Loan Product"} size="default">
          <div style={{ display: 'flex', gap: '2em', justifyContent: 'center', alignItems: 'center' }}>
            <div className={`${styles.chart_container}`}>
              <Bar options={optionsLoanProduct} data={chartLoanProductData} />
            </div>
            <div className={`${styles.statistic_container}`}>
              <Card title="Total Loan Products" size="default">
                <div className={`${styles.total_text}`}>
                  {totalLoanProducts}
                </div>
              </Card>
              <Card title="Most Sold Loan Product In 2024" size="default">
                <div className={`${styles.total_text}`}>
                  {mostSoldLoanProduct}
                </div>
              </Card>
              <Card title="Most Sold Loan Product In June Of 2024" size="default">
                <div className={`${styles.total_text}`}>
                  {mostSoldLoanProductOfOneMonthInAYear}
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default DashboardPage;
