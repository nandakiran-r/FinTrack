import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditIcon from "../../assets/svg/EditIcon";
import TrashIcon from "../../assets/svg/TrashIcon";
import {
  DMEditUser,
  DMViewUsers,
  PHEditUser,
  PHViewUsers,
  SADeleteUser,
  SAEditUser,
  SAViewUsers,
} from "../../helpers/api-communicator";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const usersData = {};

const ViewUsersTable = ({ role }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState("");

  const [searchParams, setSeachParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("refresh")) {
      usersData[0] = null;
      if (role === "SA") {
        navigate("/sa/view-users");
      } else if (role === "DM") {
        navigate("/dm/view-users");
      } else if (role === "PH") {
        navigate("/ph/view-users");
      } else {
        return null;
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (role === "SA") {
      if (!usersData[0]) {
        SAViewUsers()
          .then((data) => {
            setUsers(data);
            usersData[0] = data;
          })
          .catch((err) => {
            toast.error("Something Went Wrong");
          });
      } else {
        setUsers(usersData[0]);
      }
    } else if (role === "DM") {
      if (!usersData[0]) {
        DMViewUsers()
          .then((data) => {
            setUsers(data);
            usersData[0] = data;
          })
          .catch((err) => {
            toast.error("Something Went Wrong");
          });
      } else {
        setUsers(usersData[0]);
      }
    } else if (role === "PH") {
      if (!usersData[0]) {
        PHViewUsers()
          .then((data) => {
            setUsers(data);
            usersData[0] = data;
          })
          .catch((err) => {
            toast.error("Something Went Wrong");
          });
      } else {
        setUsers(usersData[0]);
      }
    }
  }, [searchParams]);

  function Role(props) {
    const role = props.role;
    let returnComponent;
    switch (role) {
      case "sa":
        returnComponent = "Super Admin";
        break;
      case "dm":
        returnComponent = "DPT Manager";
        break;
      case "de":
        returnComponent = "DPT Worker";
        break;
      case "ph":
        returnComponent = "Purchase Head";
        break;
      case "pe":
        returnComponent = "Purchase Employee";
        break;
      default:
        returnComponent = "";
    }

    return returnComponent;
  }

  const handleEdit = async (id, username, email, role, handlerRole) => {
    Swal.fire({
      customClass: "edit-user-sweet-alert",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: `Edit`,
      cancelButtonText: "Cancel",
      title: `Edit User`,
      html: `
      <input type="text" placeholder="Username" id="edit-user-username" class="swal2-input edit-user-sweet-alert-input" value=${username} required><br>
      <input placeholder="Email" id="edit-user-email" type="email" class="swal2-input edit-user-sweet-alert-input" value=${email} required><br>
      ${handlerRole === "SA"
          ? `
          <select type="text" placeholder="Role" id="edit-user-role" class="swal2-input edit-user-sweet-alert-input edit-user-sweet-alert-select" required>
            <option ${role === "sa" ? "selected" : ""} value="">Select</options>
            <option ${role === "dm" ? "selected" : ""
          } value="dm">Department Manager</options>
            <option ${role === "ph" ? "selected" : ""
          } value="ph">Purchase Head</options>
            <option ${role === "de" ? "selected" : ""
          } value="de">Department Worker</options>
            <option ${role === "pe" ? "selected" : ""
          } value="pe">Purchase Employee</options>
          </select><br />
          `
          : `<input id="edit-user-role" value=${role} type="hidden" >`
        }
      <input placeholder="Password" id="edit-user-password" type="password" class="swal2-input edit-user-sweet-alert-input" required><br>
          `,
      preConfirm: () => {
        let newUsername = document.getElementById("edit-user-username").value;
        let newEmail = document.getElementById("edit-user-email").value;
        let newRole = document.getElementById("edit-user-role").value;
        let newPassword = document.getElementById("edit-user-password").value;
        if (!newUsername || !newEmail || !newRole || !newPassword) {
          toast.error("Content cannot be empty", {
            toastId: "error",
          });
        } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(newEmail)) {
          toast.error("Invalid Email", {
            toastId: "error",
          });
        } else {
          if (handlerRole === "SA") {
            SAEditUser(id, newUsername, newEmail, newPassword, newRole)
              .then((data) => {
                if (data.status === "success") {
                  toast.success(data.message);
                  navigate(`${window.location.pathname}?refresh=true`);
                } else {
                  toast.error(data.message, {
                    toastId: "error",
                  });
                }
              })
              .catch((err) => {
                toast.error("Something Went Wrong", {
                  toastId: "error",
                });
              });
          } else if (handlerRole === "DM") {
            DMEditUser(id, newUsername, newEmail, newPassword, newRole)
              .then((data) => {
                if (data.status === "success") {
                  toast.success(data.message);
                  navigate(`${window.location.pathname}?refresh=true`);
                } else {
                  toast.error(data.message, {
                    toastId: "error",
                  });
                }
              })
              .catch((err) => {
                toast.error("Something Went Wrong", {
                  toastId: "error",
                });
              });
          } else if (handlerRole === "PH") {
            PHEditUser(id, newUsername, newEmail, newPassword, newRole)
              .then((data) => {
                if (data.status === "success") {
                  toast.success(data.message);
                  navigate(`${window.location.pathname}?refresh=true`);
                } else {
                  toast.error(data.message, {
                    toastId: "error",
                  });
                }
              })
              .catch((err) => {
                toast.error("Something Went Wrong", {
                  toastId: "error",
                });
              });
          } else {
            return null;
          }
        }
      },
    });
  };

  const handleDelete = async (id) => {
    const data = await SADeleteUser(id);
    if (data) {
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message, {
          toastId: "error",
        });
      }
      navigate(`${window.location.pathname}?refresh=true`);
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Role role={user.role} />
                </td>
                <td className="icon-container">
                  <EditIcon
                    onClick={() => {
                      handleEdit(
                        user._id,
                        user.username,
                        user.email,
                        user.role,
                        role
                      );
                    }}
                  />
                  {role === "SA" && (
                    <TrashIcon
                      onClick={() => {
                        if (
                          window.confirm("Are you sure to delete the user?")
                        ) {
                          handleDelete(user._id);
                        }
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          <></>
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsersTable;
