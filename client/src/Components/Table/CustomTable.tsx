import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from "@mui/material";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "../../firebase";
import { FormTemplate } from "../Form/CustomForm";

interface Row extends Record<string, any> {
  id: number;
}

interface CustomTableProps {
  patientData: Row[];
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export const CustomTable: React.FC<CustomTableProps> = (props: CustomTableProps) => {

  const { patientData } = props;
  const [keys, setKeys] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableData = [...patientData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [patientData, sortConfig]);

  const requestSort = (key: string) => {
    const direction = 
      sortConfig && sortConfig.key === key && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "forms"), (snapshot) => {
      const newData: FormTemplate[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as FormTemplate));
      const keys = [...newData[0].fields.map(field => field.name), 'id'];
      setKeys(keys);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (patientData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {['ID', ...keys].map((key, index) => (
              <TableCell key={index}>
                <TableSortLabel
                  active={sortConfig ? sortConfig.key === key : false}
                  direction={sortConfig ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort(key)}
                >
                  {key}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              {keys.map((key, index) => (
                <TableCell key={index}>{row[key] || ''}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
