import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type PaginateProps = {
  keyword: string;
  pages: number;
  page: number;
  isAdmin?: boolean;
};

const Paginate = ({ keyword, pages, page, isAdmin = false }: PaginateProps) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null;
};

export default Paginate;
