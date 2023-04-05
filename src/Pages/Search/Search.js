import {
    Button,
    createTheme,
    Tab,
    Tabs,
    Box,
    TextField,
    ThemeProvider,
} from "@mui/material";
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState()

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=9d6f8b8f9a6eaf900e1f098508869ad1&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            <div className="search">
                <TextField
                    style={{ flex: 1, color: "white", backgroundColor: "white", fontFamily: "sans-serif" }}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                    onClick={fetchSearch}
                    variant="contained"
                    style={{ marginLeft: 10 }}
                >
                    <SearchIcon fontSize="large" />
                </Button>
            </div>
            <Box sx={{ width: '100%', color: 'background.paper' }}>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);

                    }}
                    style={{ paddingBottom: 5, width: "100%" }}
                    aria-label="disabled tabs example"
                    centered
                >
                    <Tab style={{ width: "50vw", color: "white", fontSize: "20px", fontFamily: "sansserif" }} label="Search Movies" />
                    <Tab style={{ width: "50vw", color: "white", fontSize: "20px", fontFamily: "sansserif" }} label="Search TV Series" />
                </Tabs>
            </Box>
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};

export default Search;