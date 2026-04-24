import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './404.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="not-found-card">
              <div className="not-found-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h1 className="not-found-code">404</h1>
              <h2 className="not-found-title">Página no encontrada</h2>
              <p className="not-found-message">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
              <div className="not-found-actions">
                <Button 
                  variant="primary" 
                  onClick={() => navigate(-1)}
                  className="me-3"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Volver atrás
                </Button>
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate('/')}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M12 3v18" />
                  </svg>
                  Ir al inicio
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFound;