import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3050/getUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, [users]);

  const createUser = () => {
    axios
      .post("http://localhost:3050/createUser", {
        name: name,
        age: age,
        username: username,
        img: img,
      })
      .then((res) => {
        alert("User Created");
        handleClose();
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updatedUser = (id) => {
    axios
      .put("http://localhost:3050/updateUser", {
        id: id,
        newName: newName,
        newAge: newAge,
      })
      .then((res) => {
        alert("güncellendi.");
      });
  };

  const delatedUser = (id) => {
    axios.delete(`http://localhost:3050/deleteUser/${id}`);
  };

  return (
    <div className="App">
      <div className="container bg-dark">
        <h1 className="text-center text-danger">USER LİST</h1>
        <div>
          <div className="row ">
            {users.map((user) => (
              <div className="col-md-4 col-sm-12">
                <div className="card radius-15">
                  <div className="card-body text-center">
                    <div className="p-4 border radius-15">
                      <img
                        src={
                          user.img === ""
                            ? "https://www.casper.com.tr/uploads/2021/02/wallpaper-7.jpg"
                            : user.img
                        }
                        width={110}
                        height={110}
                        className="rounded-circle shadow"
                        alt=""
                      />
                      <h5 className="mb-0 mt-5">{user.name}</h5>
                      <p className="mb-3">{user.username}</p>
                      <p className="mb-3">Age: {user.age}</p>
                    </div>
                    <input
                      className="form-control p-1 m-1"
                      placeholder="isim giriniz"
                      onChange={(e) => setNewName(e.target.value)}
                    ></input>
                    <input
                      className="form-control p-1 m-1"
                      placeholder="yaş giriniz"
                      onChange={(e) => setNewAge(e.target.value)}
                    ></input>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => {
                        updatedUser(user._id);
                      }}
                    >
                      Güncelle
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => {
                        delatedUser(user._id);
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h2>Create USER</h2>
                    <div>
                      <button
                        type="button"
                        className="btn-success btn"
                        onClick={handleShow}
                      >
                        Kullanıcıyı Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline">
              <input
                type="text"
                id="form"
                className="form-control mb-4"
                placeholder="İsim giriniz"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                id="form"
                className="form-control mb-4"
                placeholder="Yaş giriniz"
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                id="form"
                className="form-control mb-4"
                placeholder="Kullanıcı adı giriniz"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                id="form"
                className="form-control mb-4"
                placeholder="Fotograf Linki giriniz"
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
