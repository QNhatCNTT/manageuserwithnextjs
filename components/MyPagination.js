import { Pagination } from "rsuite";

const MyPagination = ({ total, onChange, current, pageSize }) => {
  return (
    <Pagination
      onChangePage={onChange}
      activePage={current}
      total={total}
      limit={pageSize}
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    />
  );
};

export { MyPagination };
