import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
import { Footer } from "../components/footer/Footer";
import { initialRows } from "./UI13AdminOrderList";
import styles from "./UI13AdminOrderList.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useLocalStorage } from "../hooks/useLocalStorage";

import clsx from "clsx";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
  randomPrice,
} from "@mui/x-data-grid-generator";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarQuickFilter sx={{ mx: 2 }} />
    </GridToolbarContainer>
  );
}

const UI13AdminOrderListineditable: FunctionComponent = () => {
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/orders", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows(data));
  }, []);
  console.log(JSON.stringify(rows));
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
    {
      field: "userName",
      type: "string",

      headerClassName: "super-app-theme--header",
      headerName: "Tên Khách Hàng",
      flex: 0.25,
      editable: false,
    },
    {
      field: "statusid",
      headerClassName: "super-app-theme--header",
      headerName: "Tình trạng",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Đã hủy", "Hoàn thành", "Đang xử lý"],
      editable: false,
      cellClassName: (params: GridCellParams<string>) =>
        clsx("super-app", {
          cancel: params.value == "Đã hủy",
          done: params.value == "Hoàn thành",
          processing: params.value == "Đang xử lý",
        }),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updateAt",
      headerClassName: "super-app-theme--header",
      headerName: "Giờ nhận đơn",
      type: "dateTime",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerClassName: "super-app-theme--header",
      headerName: "Đơn giá",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return "";
        }
        const valueFormatted = params.value.toLocaleString();
        return `${valueFormatted} đồng`;
      },
    },
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Mã đơn hàng",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <div className={styles.uI13AdminOrderList}>
      <div className={styles.tableSectionDiv}>
        <div className={styles.frameDiv}>
          <b className={styles.tableTitle}>DANH SÁCH ĐƠN HÀNG</b>
          <div className={styles.lineDiv} />
          <div className={styles.tableDiv}>
            <Box
              sx={{
                m: "2.5%",
                mx: "2.5%",
                height: "87%",
                width: "95%",
                "& .actions": {
                  color: "text.secondary",
                },
                "& .textPrimary": {
                  color: "text.primary",
                },
                "& .super-app-theme--header": {
                  backgroundColor: "rgba(255, 45, 47)",
                  color: "rgb(255,255,255)",
                },
                "& .super-app.done": {
                  backgroundColor: "#29C64C",
                  color: "#ffffff",
                  fontWeight: "600",
                },
                "& .super-app.cancel": {
                  backgroundColor: "#d47483",
                  color: "#ffffff",
                  fontWeight: "600",
                },
                "& .super-app.processing": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontWeight: "600",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                processRowUpdate={processRowUpdate}
                components={{
                  Toolbar: EditToolbar,
                }}
                componentsProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI13AdminOrderListineditable;
