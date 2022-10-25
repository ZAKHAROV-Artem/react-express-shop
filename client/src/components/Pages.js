import React, { useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./../index";
import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";

const Pages = observer(() => {
  const { device } = useContext(Context);
  let pages = [];
  let pageCount = useRef(0);

  pageCount.current = Math.ceil(device.totalCount / device.limit);

  for (let i = 0; i < pageCount.current; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
