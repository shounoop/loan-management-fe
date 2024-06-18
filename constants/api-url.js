const API_URL = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  USER: '/api/auth/users',
  USER_ACTIVITY: '/api/auth/user-activities',
  CUSTOMER: '/api/express/customers',
  LOAN_METHOD: '/api/express/loan-methods',
  LOAN_TYPE: '/api/express/loan-types',
  LOAN_PRODUCT: '/api/express/loan-products',
  LOAN_APPLICATION: '/api/express/loan-applications',
  DOCUMENT: '/api/express/documents',
  SEND_EMAIL: '/api/express/send-email',
  GENERATE_PDF: '/api/express/generate-pdf',
};

export const EXPRESS_API_URL = {
  CUSTOMER: '/api/customers',
  LOAN_APPLICATION: '/api/payments',
  LOAN_PRODUCT: '/api/loan-products'
}

export default API_URL;
