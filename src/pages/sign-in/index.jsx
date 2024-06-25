import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SnackbarWithDecorators from "../../components/notification";
import { auth } from "../../services/auth";
import Notification from "../../utils/notification";
import "./login.css";

const index = () => {
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.signIn(form);
      console.log(response);
      if (response.status === 200) {
          navigate("/main");
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Successfully login",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Failed login",
        type: "error",
      })
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/main");
    }
  }, []);

  const moveRegister = () => {
    navigate("/sign-up");
  };
  return (
    <>
      <div className="container">
        <SnackbarWithDecorators open={open} setOpen={setOpen} type={type} />
        <div className="row mt-5">
          <div className="col-md-6 offset-3">
            <div className="card border-primary">
              <div className="card-header bg-primary">
                <h1 className="text-center title-white">Login</h1>
              </div>
              <div className="card-body border-primary">
                <form id="login" onSubmit={handleSubmit}>
                  <TextField
                    type="email"
                    id="outlined-textarea"
                    label="Email"
                    className="form-control my-2"
                    onChange={handleChange}
                    placeholder="username"
                    name="email"
                  />
                  <TextField
                    type="password"
                    id="outlined-textarea"
                    label="Password"
                    className="form-control my-2"
                    onChange={handleChange}
                    placeholder="password"
                    name="password"
                  />
                  <Button
                    sx={{ textTransform: "inherit" }}
                    onClick={moveRegister}
                  >
                    Register
                  </Button>
                </form>
              </div>
              <div className="card-footer border-primary bg-white">
                <Button type="submit" form="login" variant="contained">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
