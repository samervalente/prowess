import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps extends React.PropsWithChildren {
    title: string;
}

export default function SimpleAccordion({title, children}: AccordionProps) {
  return (
    <div>
      <Accordion sx={{backgroundColor:'#2A2A2A', color:"#BBBBBB"}}>
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
      </Accordion>
    </div>
  );
}