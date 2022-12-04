import { FunctionComponent } from "react";
import styles from "./UI14AdminReport.module.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
import ReactToPrint from "react-to-print";

const UI14AdminReport: FunctionComponent = () => {
  let [rows, setRows] = React.useState<GridRowsProp>([]);
  let [order, setorder] = React.useState<GridRowsProp>([]);
  const ordercancel = order.filter(function (item) {
    if (item.statusid === "Đã hủy") {
      return true;
    } else {
      return false;
    }
  });
  const ordersuccess = order.filter(function (item) {
    if (item.statusid === "Hoàn thành") {
      return true;
    } else {
      return false;
    }
  });
  const now = new Date();
  const tongthu = ordersuccess.reduce((counter, obj) => {
    counter += obj.total;
    return counter;
  }, 0);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/orders", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setorder(data));
  }, []);
  console.log(order.length);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/menu", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows(data));
  }, []);
  let [rows2, setRows2] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/menu", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows2(data));
  }, []);
  let [rows3, setRows3] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    fetch("https://broken-frequent-seat.glitch.me/ingredient", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setRows3(data));
  }, []);
  const tongchi = rows3.reduce((counter, obj) => {
    counter += obj.quantity * obj.unitPrice;
    return counter;
  }, 0);
  const print = () => {
    (window as any).print();
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
      field: "updateAt",
      headerClassName: "super-app-theme--header",
      headerName: "Thời gian bán",
      type: "dateTime",
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
  ];

  const columns2: GridColumns = [
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
      headerName: "Còn lại",
      type: "number",
      flex: 0.25,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  const columns3: GridColumns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Mã nguyên liệu",
      type: "number",
      flex: 0.25,
      editable: true,
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
      field: "quantity",
      headerClassName: "super-app-theme--header",
      headerName: "Số lượng",
      type: "number",
      flex: 0.25,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <>
      <div className={styles.frameDiv}>
        <div className={styles.lineDiv} />

        <div className={styles.vectorDiv1} />
        <b className={styles.nguynLiuB}>Nguyên liệu</b>

        <b className={styles.mnNB}>Món ăn</b>
        {/* Table 1 */}
        <div className={styles.cYuThch}>Hạng mục được yêu thích:</div>
        <div className={styles.frameDiv3}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
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
            <DataGrid rows={rows} columns={columns} />
          </Box>
        </div>

        {/* Table 2 */}
        <div className={styles.cnDDiv}>Hạng mục còn dư:</div>
        <div className={styles.frameDiv1}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
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
            <DataGrid rows={rows2} columns={columns2} />
          </Box>
        </div>

        {/* Table 3 */}
        <div className={styles.cnDDiv1}>Hạng mục còn dư:</div>

        <div className={styles.frameDiv2}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
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
            <DataGrid rows={rows3} columns={columns3} />
          </Box>
        </div>
        <div className={styles.lineDiv} />
        <Button variant="contained" onClick={print} className={styles.textBin}>
          Xuất pdf
        </Button>
        <b className={styles.textB1}>BÁO CÁO</b>

        <b className={styles.doanhThuB}>Doanh thu</b>
        <div className={styles.profitDiv}>
          <div className={styles.vndDiv}>
            {(tongthu - tongchi).toLocaleString()} vnd
          </div>
          <div className={styles.tinLiDiv}>
            <b>{`Tiền lời: `}</b>
          </div>
        </div>
        <div className={styles.turnoverDiv}>
          <div className={styles.vndDiv}>{tongthu.toLocaleString()} vnd</div>
          <div className={styles.tinLiDiv}>
            <b>Tổng thu:</b>
          </div>
        </div>
        <div className={styles.costDiv}>
          <div className={styles.tngChiDiv}>
            <b>{`Tổng chi: `}</b>
          </div>
          <div className={styles.vndDiv2}>{tongchi.toLocaleString()}</div>
        </div>
        <div className={styles.totalCancelDiv}>
          <div className={styles.div}>{ordercancel.length}</div>
          <div className={styles.tinLiDiv}>
            <b>Số đơn bị hủy:</b>
          </div>
        </div>
        <div className={styles.totalDiv}>
          <div className={styles.div1}>{order.length}</div>
          <div className={styles.tinLiDiv}>
            <b>Tổng đơn hàng:</b>
          </div>
        </div>
        <div className={styles.dateDiv}>
          <div className={styles.div2}>{now.toLocaleDateString()}</div>
          <div className={styles.ngyDiv}>
            <b>{`Ngày: `}</b>
          </div>
        </div>

        <div className={styles.lineDiv1} />
      </div>
    </>
  );
};

export default UI14AdminReport;
