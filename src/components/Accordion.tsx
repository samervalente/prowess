import * as React from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';


const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion {...props} />
))(({ theme }) => ({
  overflowWrap: 'break-word',
  backgroundColor:'#2A2A2A',
  color:"#BBBBBB",
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },

  '&:before': {
    display: 'none',
  },
}));

export default function SimpleAccordion({title, children}: AccordionProps) {
  return (
      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  sx={{color:"#00D1FF"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
         
        >
          <Typography sx={{color:"white"}}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontSize:14, textAlign: 'justify'}}>
            {children}
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
  );
}