import { FunctionComponent, useEffect } from "react";
import styles from "./Option1.module.css";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import { useNavigate, Link as Linkroute } from "react-router-dom";

type Option1Type = {
  onClose?: () => void;
};

const Option1: FunctionComponent<Option1Type> = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    navigate("/");
  };
  return (
    <div className={styles.optionDiv} data-animate-on-scroll>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ mt: 4.2, mx: 4.5 }}
          >
            <img alt="" src="../option.svg" />{" "}
            <a href="/">
              <div className={styles.canteenUITDiv}> Canteen UIT</div>
            </a>
          </ListSubheader>
        }
      >
        {/* button */}
        <ListItemButton onClick={handleClick} sx={{ mx: 4 }}>
          <ListItemIcon>
            <img alt="" src="../mdiorderbooldescendingvariant.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Danh sách đơn hàng" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* option */}

        <Collapse in={open} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="order-onlywatch">
            <ListItemIcon>
              <img alt="" src="../mdidatabaseview.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Xem" />
          </ListItemButton>
        </Collapse>
        <Collapse in={open} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="order-editable">
            <ListItemIcon>
              <img alt="" src="../materialsymbolseditnote.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa" />
          </ListItemButton>
        </Collapse>
        {/* Button */}
        <ListItemButton onClick={handleClick2} sx={{ mx: 4 }}>
          <ListItemIcon>
            <img alt="" src="../gameiconssteak.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Danh sách nguyên liệu" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* option */}
        <Collapse in={open2} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="ingredient-onlywatch">
            <ListItemIcon>
              <img alt="" src="../mdidatabaseview.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Xem" />
          </ListItemButton>
        </Collapse>
        <Collapse in={open2} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="ingredient-editable">
            <ListItemIcon>
              <img alt="" src="../materialsymbolseditnote.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa" />
          </ListItemButton>
        </Collapse>

        {/* Button */}

        <ListItemButton onClick={handleClick3} sx={{ mx: 4 }}>
          <ListItemIcon>
            <img alt="" src="../mdifoodturkey.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Danh sách món ăn" />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* Option */}
        <Collapse in={open3} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="dish-onlywatch">
            <ListItemIcon>
              <img alt="" src="../mdidatabaseview.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Xem" />
          </ListItemButton>
        </Collapse>
        <Collapse in={open3} timeout="auto" unmountOnExit sx={{ mx: 4 }}>
          <ListItemButton sx={{ pl: 4 }} href="dish-editable">
            <ListItemIcon>
              <img alt="" src="../materialsymbolseditnote.svg" />{" "}
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa" />
          </ListItemButton>
        </Collapse>
        <ListItemButton sx={{ mb: 2, mx: 4 }} href="/">
          <ListItemIcon>
            <img alt="" src="../mdireportboxoutline.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Báo cáo" />
        </ListItemButton>
        {/* Divider */}
        <Divider />
        {/* Divider */}
        <ListItemButton sx={{ mt: 2, mx: 4 }} href="/">
          <ListItemIcon>
            <img alt="" src="../icroundhome.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
        <ListItemButton sx={{ mx: 4 }} onClick={logout}>
          <ListItemIcon>
            <img alt="" src="../lucidelogout.svg" />{" "}
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Option1;
