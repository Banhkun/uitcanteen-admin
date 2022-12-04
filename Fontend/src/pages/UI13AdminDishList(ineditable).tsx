import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { Footer } from "../components/footer/Footer";
import { DishinitialRows } from "./UI13AdminDishList";
import { useLocalStorage } from "../hooks/useLocalStorage";

import styles from "./UI13AdminOrderList.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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
} from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
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

const UI13AdminDishListineditable: FunctionComponent = () => {
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/menu", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows(data));
  }, []);
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
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Mã món ăn",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Tên món ăn",
      flex: 0.25,
      editable: false,
    },
    {
      field: "dishType",
      headerClassName: "super-app-theme--header",
      headerName: "Loại món ăn",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Món chính", "Món phụ"],
      editable: false,
      cellClassName: (params: GridCellParams<string>) =>
        clsx("super-app", {
          main: params.value == "Món chính",
          side: params.value == "Món phụ",
        }),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerClassName: "super-app-theme--header",
      headerName: "Link hình ảnh",
      type: "string",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerClassName: "super-app-theme--header",
      headerName: "Số lượng",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "spare",
      headerClassName: "super-app-theme--header",
      headerName: "Suất còn lại",
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
          <b className={styles.tableTitle}>DANH SÁCH MÓN ĂN</b>
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
                "& .super-app.main": {
                  backgroundColor: "#29C64C",
                  color: "#ffffff",
                  fontWeight: "600",
                },
                "& .super-app.side": {
                  backgroundColor: "#d47483",
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

export default UI13AdminDishListineditable;
