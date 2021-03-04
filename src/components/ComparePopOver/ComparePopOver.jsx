import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './ComparePopOver.css';
import { productsContext } from '../../contexts/ProductsContext';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    backgroundColor: 'grey'
  },
}));

export default function ComparePopOver() {
  const { setCompare, compareProduct, deleteCompare } = useContext(productsContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCompare();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Compare
    </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          {compareProduct.length !==0 ? <span className="compare__item">
            {compareProduct.map(item => (
              <span className="compare__item-inner" key={item.id}>
                <span className="compare__item-inner-wrapper">
                  <span className="inner-wrapper__title">{item.title}</span>
                  <span
                    onClick={() => deleteCompare(item.id)}
                    className="clear-list"
                  >X</span>
                  <img src={item.image} alt="" />
                  <span className="abilitys">Abilitys</span>
                  <span className="inner-abilitys">
                    <span>Strenght</span>
                    <span>{item.strenght}</span>
                  </span>
                  <span className="inner-abilitys">
                    <span>Speed</span>
                    <span>{item.speed}</span>
                  </span>
                  <span className="inner-abilitys">
                    <span>Fighting Skills</span>
                    <span>{item.fighting}</span>
                  </span>
                  <span className="inner-abilitys">
                    <span>Intelligence</span>
                    <span>{item.intelligence}</span>
                  </span>
                  <span className="inner-abilitys">
                    <span>Energy</span>
                    <span>{item.energy}</span>
                  </span>
                  <span className="inner-abilitys">
                    <span>Durability</span>
                    <span>{item.durability}</span>
                  </span>
                </span>
              </span>
            ))}
          </span> : <span>Empty</span>}       
        </Typography>
      </Popover>
    </div>
  );
}





