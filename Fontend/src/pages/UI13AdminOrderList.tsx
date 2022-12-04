import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { Footer } from "../components/footer/Footer";

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
import { useLocalStorage } from "../hooks/useLocalStorage";

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

export const initialRows: GridRowsProp = [
  {
    id: "31d0f367-cb01-58e4-a7f8-c925eb865186",
    name: "Bảnh",
    status: "Hoàn thành",
    price: 30000,
    dateCreated: "2021-12-07T05:32:35.639Z",
    lastLogin: "2021-12-07T05:32:35.639Z",
  },
  {
    id: "31d0f367-cb01-58e4-a7f8-c925eb865182",
    name: "dog",
    status: "Hoàn thành",
    price: 30000,
    dateCreated: "2021-12-07T05:32:35.639Z",
    lastLogin: "2021-12-07T05:32:35.639Z",
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", status: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Thêm đơn hàng
      </Button>
      <GridToolbarExport />
      <GridToolbarQuickFilter sx={{ mx: 2 }} />
    </GridToolbarContainer>
  );
}

const UI13AdminOrderList: FunctionComponent = () => {
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/orders", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows(data));
  }, []);
  console.log(rows.length);
  // const [rows, setRows] = useLocalStorage("key", initialRows);

  // React.useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(rows));
  // }, [rows]);

  // const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    fetch("https://broken-frequent-seat.glitch.me/orders" + "/" + newRow.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRow),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    return updatedRow;
  };

  const columns: GridColumns = [
    {
      field: "userName",
      type: "string",
      headerClassName: "super-app-theme--header",
      headerName: "Tên Khách Hàng",
      flex: 0.25,
      editable: true,
    },
    {
      field: "statusid",
      headerClassName: "super-app-theme--header",
      headerName: "Tình trạng",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Đã hủy", "Hoàn thành", "Đang xử lý"],
      editable: true,
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
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "total",
      headerClassName: "super-app-theme--header",
      headerName: "Đơn giá",
      type: "number",
      flex: 0.25,
      editable: true,
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
    {
      field: "actions",
      headerClassName: "super-app-theme--header",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
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

export default UI13AdminOrderList;
