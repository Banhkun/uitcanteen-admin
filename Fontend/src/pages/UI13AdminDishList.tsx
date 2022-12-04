import { FunctionComponent } from "react";
import AdminHeader from "../components/AdminHeader";
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
} from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";

export const DishinitialRows: GridRowsProp = [
  {
    id: randomId(),
    name: "A",
    type: "Món chính",
    image: "A",
    amount: "90",
    spare: "50",
  },
  {
    id: randomId(),
    name: "B",
    type: "Món phụ",
    image: "B",
    amount: "90",
    spare: "50",
  },
  {
    id: randomId(),
    name: "C",
    type: "Món chính",
    image: "C",
    amount: "90",
    spare: "70",
  },
  {
    id: randomId(),
    name: "D",
    type: "Món chính",
    image: "C",
    amount: "100",
    spare: "0",
  },
  {
    id: randomId(),
    name: "E",
    type: "Món phụ",
    image: "E",
    amount: "70",
    spare: "56",
  },
  {
    id: randomId(),
    name: "F",
    type: "Món chính",
    image: "F",
    amount: "80",
    spare: "56",
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
    setRows((oldRows) => [...oldRows, { id, name: "", type: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Thêm món ăn
      </Button>
      <GridToolbarExport />
      <GridToolbarQuickFilter sx={{ mx: 2 }} />
    </GridToolbarContainer>
  );
}

const UI13AdminDishList: FunctionComponent = () => {
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/menu", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows(data));
  }, []);
  console.log(rows);
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
    fetch("https://broken-frequent-seat.glitch.me/menu" + "/" + newRow.id, {
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
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Mã món ăn",
      type: "number",
      flex: 0.25,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerName: "Tên món ăn",
      flex: 0.25,
      editable: true,
    },
    {
      field: "dishType",
      headerClassName: "super-app-theme--header",
      headerName: "Loại món ăn",
      flex: 0.2,
      type: "singleSelect",
      valueOptions: ["Món chính", "Món phụ"],
      editable: true,
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
      editable: true,
      align: "center",
      headerAlign: "center",
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
      field: "spare",
      headerClassName: "super-app-theme--header",
      headerName: "Suất còn lại",
      type: "number",
      flex: 0.25,
      editable: true,
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

export default UI13AdminDishList;
