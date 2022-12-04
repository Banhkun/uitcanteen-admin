import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
import { IngredientinitialRows } from "./UI13AdminIngredientList";

import styles from "./UI13AdminOrderList.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
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
  GridValueGetterParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

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

const UI13AdminIngredientListineditable: FunctionComponent = () => {
  function gettotal(params: GridValueGetterParams) {
    return String(params.row.unitPrice * params.row.quantity) + " đồng";
  }
  function getmeasure(params: GridValueGetterParams) {
    if (params.row.ingredientName == "Đậu hũ") return `miếng`;
    return `kg`;
  }
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/ingredient", {
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

    return updatedRow;
  };
  const columns: GridColumns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Mã nguyên liệu",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ingredientName",
      headerClassName: "super-app-theme--header",
      headerName: "Tên nguyên liệu",
      flex: 0.25,
      editable: false,
    },
    {
      field: "ingredientTypeId",
      headerClassName: "super-app-theme--header",
      headerName: "Loại nguyên liệu",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Tươi sống", "Rau, củ, quả", "Gia vị"],
      editable: false,
      cellClassName: (params: GridCellParams<string>) =>
        clsx("super-app", {
          cancel: params.value == "Tươi sống",
          done: params.value == "Rau, củ, quả",
          processing: params.value == "Gia vị",
        }),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unitPrice",
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
      field: "measure",
      headerClassName: "super-app-theme--header",
      headerName: "Đơn vị",
      type: "string",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
      valueGetter: getmeasure,
    },
    {
      field: "total",
      headerClassName: "super-app-theme--header",
      headerName: "Thành tiền",
      type: "number",
      flex: 0.25,
      editable: false,
      align: "center",
      headerAlign: "center",
      valueGetter: gettotal,
    },
  ];
  return (
    <div className={styles.uI13AdminOrderList}>
      <div className={styles.tableSectionDiv}>
        <div className={styles.frameDiv}>
          <b className={styles.tableTitle}>DANH SÁCH NGUYÊN LIỆU</b>
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

export default UI13AdminIngredientListineditable;
