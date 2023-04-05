import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function MainNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate('/');
    if (value === 1) navigate('/movies');
    if (value === 2) navigate('/series');
    if (value === 3) navigate('/search');
  }, [value, navigate]);

  return (
    <Box sx={{
      width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100
    }}>
      <BottomNavigation
        style={{ backgroundColor: 'rgb(44, 13, 60)' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{ color: 'white' }} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="Movies" icon={<MovieCreationIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="TV series" icon={<TvIcon />} />
        <BottomNavigationAction style={{ color: 'white' }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box >
  );
}

