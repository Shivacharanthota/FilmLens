import React from 'react';
import { Button, Typography, Modal, Card, CardContent, Box } from '@mui/material';

const ModalExampleControlled = ({ movietrailer, modalOpen, handleOpen }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <Modal open={modalOpen} onClose={handleOpen}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant='h4'>Trailer</Typography>
        <>
          {movietrailer?.results?.[0]?.key ? (
            <Card>
              <CardContent>
                <iframe
                  id={movietrailer.results[0].key}
                  title="Trailer"
                  width="100%"
                  src={`https://www.youtube.com/embed/${movietrailer.results[0].key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </CardContent>
            </Card>
          ) : (
            <Typography variant='body1'>No trailer available</Typography>
          )}
        </>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalExampleControlled;
