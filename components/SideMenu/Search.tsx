/* library package */
import {
  FC,
  useState,
  useRef
} from 'react'
import { useI18n } from '@sirclo/nexus'
import {
  Search as IconSearch,
  X as IconX
} from 'react-feather'

export type SearchPropsType = {
  classes?: {
    searchContainer?: string
    searchInputContainer?: string
    searchInput?: string
    searchClear?: string
    searchButton?: string
    searchForm?: string
  };
  searchProduct: any
};

const Search: FC<SearchPropsType> = ({
  classes = {},
  searchProduct,
}) => {
  const i18n: any = useI18n();
  const [searchValue, setSearchValue] = useState<string>("");
  const inputRef = useRef(null)

  const {
    searchContainer = "search-searchContainer",
    searchInputContainer = "search-searchInputContainer",
    searchInput = "search-searchInput",
    searchClear = "search-searchClear",
    searchButton = "search-searchButton",
    searchForm = "search-searchForm"
  } = classes;

  return (
    <>
      <div className={searchContainer}>
        <form
          className={searchForm}
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            searchProduct(searchValue);
          }}
        >
          <button
            type="submit"
            className={searchButton}
            disabled={!searchValue}
            onClick={() => searchProduct(searchValue)}
          >
            <IconSearch color="#333333" />
          </button>
          <div className={searchInputContainer}>
            <input
              type="search"
              className={searchInput}
              placeholder={i18n.t("header.searchPlaceholder")}
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue !== "" &&
              <div
                className={searchClear}
                onClick={() => setSearchValue("")}
              >
                <IconX />
              </div>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default Search;