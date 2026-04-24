import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './401.css';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="unauthorized-card">
              <div className="unauthorized-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                  <rect x="5" y="5" width="14" height="14" rx="2" />
                </svg>
              </div>
              <h1 className="unauthorized-code">401</h1>
              <h2 className="unauthorized-title">Acceso no autorizado</h2>
              <p className="unauthorized-message">
                Lo sentimos, no tienes permisos para acceder a esta página.
                Por favor, inicia sesión con una cuenta que tenga los permisos necesarios.
              </p>
              <div className="unauthorized-actions">
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/login')}
                  className="me-3"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5z" />
                    <path d="M20 19h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
                  </svg>
                  Iniciar sesión
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
              <div className="unauthorized-footer">
                <p>¿Necesitas ayuda? <a href="/contact">Contacta con soporte</a></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Unauthorized;