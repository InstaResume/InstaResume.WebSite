import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
  styled
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Contribute: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)'
            }}
          >
            Contribute&nbsp;
          </Typography>
          <Grid container spacing={12} justifyContent="center">
            <Grid item xs={4}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload File
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" fullWidth>
                Example
              </Button>
            </Grid>
          </Grid>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 2, sm: 4 },
            alignSelf: 'center',
            height: { xs: 200 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`
          })}
        />
      </Container>
    </Box>
  )
}

export default Contribute
