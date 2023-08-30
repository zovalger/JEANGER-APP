import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const moduleOptionsList = [
	{
		name: "Home",
		icon: HomeIcon,
		link: "/dashboard",
	},
	{
		name: "Factura",
		icon: ShoppingCartIcon,
		link: "/dashboard/bill",
	},
	{
		name: "Cronometros",
		icon: AccessAlarmIcon,
		link: "/dashboard/stopwatch",
	},
	{
		name: "Productos",
		icon: Inventory2Icon,
		link: "/dashboard/products",
	},
];

export default moduleOptionsList;
