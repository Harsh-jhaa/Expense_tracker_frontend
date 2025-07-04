import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from 'react-icons/lu';

const SIDE_MENU_DATA = [
  {
    id: '01',
    icon: LuLayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: '02',
    icon: LuWalletMinimal,
    label: 'Income',
    path: '/income',
  },
  {
    id: '01',
    icon: LuHandCoins,
    label: 'Expense',
    path: '/expense',
  },
  {
    id: '06',
    icon: LuLogOut,
    label: 'Logout',
    path: '/logout',
  },
];

export default SIDE_MENU_DATA;
