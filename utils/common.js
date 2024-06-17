const getLoanApplicationStatusColor = (value) => {
  switch (value) {
    case 1:
      return 'orange';
    case 2:
      return 'magenta';
    case 3:
      return 'gold';
    case 4:
      return 'lime';
    case 5:
      return 'cyan';
    case 6:
      return 'blue';
    default:
      return 'orange';
  }
};

const getLoanApplicationStatusText = (value) => {
  switch (value) {
    case 1:
      return 'Đang chờ xử lý';
    case 2:
      return 'Đã phê duyệt';
    case 3:
      return 'Đã giải ngân';
    case 4:
      return 'Đã thanh toán xong';
    case 5:
      return 'Trễ hạn';
    case 6:
      return 'Đã bị hủy';
    default:
      return 'Đang chờ xử lý';
  }
};

const getRepaymentScheduleText = (value) => {
  switch (value) {
    case 1:
      return 'Tháng';
    case 2:
      return 'Quý';
    case 3:
      return 'Năm';
    default:
      return 'Tháng';
  }
};

const checkIsSuperAdmin = () => {
  const localUser =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = localUser ? JSON.parse(localUser) : null;

  return user && user?.roles?.includes('SUPER_ADMIN');
};

export {
  getLoanApplicationStatusColor,
  getLoanApplicationStatusText,
  getRepaymentScheduleText,
  checkIsSuperAdmin,
};
