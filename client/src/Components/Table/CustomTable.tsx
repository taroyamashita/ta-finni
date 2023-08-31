import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface Row extends Record<string, any> {
    id: number;
    name: string;
    age: number;
}

interface CustomTableProps {
    patientData: Row[];
}

export const CustomTable: React.FC<CustomTableProps> = (props: CustomTableProps) => {

    const { patientData } = props;
    
    return(
        <div style={{ padding: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
}