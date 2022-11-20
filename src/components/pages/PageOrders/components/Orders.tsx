import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  useDeleteOrder,
  useInvalidateOrders,
  useOrders,
} from '~/queries/orders';

export default function Orders() {
  const { data }: any = useOrders();
  console.log(data?.data);
  const invalidateOrders = useInvalidateOrders();
  const { mutate: deleteOrder } = useDeleteOrder();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell align="right">Items count</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.items?.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.address?.firstName} {order.delievery?.lastName}
              </TableCell>
              <TableCell align="right">{'0'}</TableCell>
              <TableCell align="right">{order.delievery?.address}</TableCell>
              <TableCell align="right">{order.status}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={order.id}
                >
                  Manage
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    deleteOrder(order.id, { onSuccess: invalidateOrders })
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
