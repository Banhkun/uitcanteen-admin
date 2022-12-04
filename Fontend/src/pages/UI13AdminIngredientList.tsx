import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
import { Footer } from "../components/footer/Footer";
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
  GridValueGetterParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
  randomPrice,
} from "@mui/x-data-grid-generator";

export const IngredientinitialRows: GridRowsProp = [
  {
    id: randomId(),
    name: "Thịt heo",
    status: "Tươi sống",
    price: 20000,
    amount: 20,
  },
  {
    id: randomId(),
    name: "Thịt gà",
    status: "Rau, củ, quả",
    price: 20000,
    amount: 10,
  },
  {
    id: randomId(),
    name: "Măng",
    status: "Rau, củ, quả",
    price: 20000,
    amount: 5,
  },
  {
    id: randomId(),
    name: "Giá đỗ",
    status: "Rau, củ, quả",
    price: 20000,
    amount: 2,
  },
  {
    id: randomId(),
    name: "Đậu hũ",
    status: "Tươi sống",
    price: 20000,
    amount: 100,
  },
  {
    id: randomId(),
    name: "Ớt",
    status: "Gia vị",
    price: 20000,
    amount: 1,
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
        Thêm nguyên liệu
      </Button>
      <GridToolbarExport />
      <GridToolbarQuickFilter sx={{ mx: 2 }} />
    </GridToolbarContainer>
  );
}

const UI13AdminIngredientList: FunctionComponent = () => {
  function gettotal(params: GridValueGetterParams) {
    return Number(params.row.unitPrice * params.row.quantity);
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

    fetch(
      "https://broken-frequent-seat.glitch.me/ingredient" + "/" + newRow.id,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newRow),
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
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
      editable: true,
    },
    {
      field: "ingredientTypeId",
      headerClassName: "super-app-theme--header",
      headerName: "Loại nguyên liệu",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Tươi sống", "Rau, củ, quả", "Gia vị"],
      editable: true,
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
      field: "quantity",
      headerClassName: "super-app-theme--header",
      headerName: "Số lượng",
      type: "number",
      flex: 0.25,
      editable: true,
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
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = params.value.toLocaleString();
        return `${valueFormatted} đồng`;
      },
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

export default UI13AdminIngredientList;
