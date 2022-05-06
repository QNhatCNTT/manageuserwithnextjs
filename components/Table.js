import { Table } from "rsuite";
import { MyPagination } from "../components/MyPagination";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalState";
const pageSize = 5;
const width = 1259;

function TableUser() {
  const { initData, deleteUser, reloadData, isSearch, foundData } =
    useContext(GlobalContext);
  const [current, setCurrent] = useState(1);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [data, setData] = useState([]);
  const route = useRouter();
  useEffect(() => {
    if (isSearch) {
      setData(foundData);
    } else {
      setData(initData);
    }
  }, [isSearch, foundData, initData]);
  const getData = (current, pageSize) => {
    if (sortColumn && sortType) {
      return data
        .sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === "string") {
            x = x.charCodeAt();
          }
          if (typeof y === "string") {
            y = y.charCodeAt();
          }
          if (sortType === "asc") {
            return x - y;
          } else {
            return y - x;
          }
        })
        .slice((current - 1) * pageSize, current * pageSize);
    }
    return data.slice((current - 1) * pageSize, current * pageSize);
  };
  const hanldeSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };
  return (
    <>
      <Table
        height={270}
        width={width}
        sortColumn={sortColumn}
        sortType={sortType}
        data={getData(current, pageSize)}
        onSortColumn={hanldeSortColumn}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        <Table.Column width={width * 0.3} sortable>
          <Table.HeaderCell>NAME</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column width={width * 0.3} sortable>
          <Table.HeaderCell>PHONE</Table.HeaderCell>
          <Table.Cell dataKey="phone" />
        </Table.Column>
        <Table.Column width={width * 0.3}>
          <Table.HeaderCell>BIRTHDAY</Table.HeaderCell>
          <Table.Cell dataKey="birth_day" />
        </Table.Column>
        <Table.Column width={width * 0.1} fixed="right">
          <Table.HeaderCell
            style={{ display: "flex", justifyContent: "center" }}
          >
            ACTIONS
          </Table.HeaderCell>
          <Table.Cell style={{ boxSizing: "border-box" }}>
            {(rowData) => {
              const handleEdit = async () => {
                await reloadData();
                await route.push({
                  pathname: `/users/edit-user/${rowData._id}`,

                  query: {
                    _id: rowData._id,
                    name: rowData.name,
                    phone: rowData.phone,
                    birth_day: rowData.birth_day,
                    avt_user: rowData.avt_user,
                  },
                });
              };

              const handleDelete = async () => {
                await deleteUser(rowData._id);
                await reloadData();
              };
              return (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: `0 ${(width * 0.1 - 64) / 2}px`,
                  }}
                >
                  <span
                    onClick={handleEdit}
                    style={{
                      color: "Magenta",
                      cursor: "pointer",
                      fontSize: 17,
                      marginRight: 5,
                    }}
                  >
                    {" "}
                    <EditIcon />{" "}
                  </span>

                  <span
                    onClick={handleDelete}
                    style={{
                      color: "SaddleBrown",
                      cursor: "pointer",
                      fontSize: 17,
                      marginLeft: 5,
                    }}
                  >
                    {" "}
                    <TrashIcon />{" "}
                  </span>
                </span>
              );
            }}
          </Table.Cell>
        </Table.Column>
      </Table>

      <MyPagination
        onChange={setCurrent}
        total={initData.length}
        current={current}
        pageSize={pageSize}
      />
    </>
  );
}

export default TableUser;
