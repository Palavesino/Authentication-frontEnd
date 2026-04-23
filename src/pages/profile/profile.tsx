import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { useAuth } from '../../contexts/auth-context';
import type { UserComplete } from '../../interface/user';

function Profile() {
  const { getCompleteUser,setUser} = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userComplete, setUserComplete] = useState<UserComplete | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    imageUrl: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      const completeUser = await getCompleteUser();
      if (completeUser) {
        setUserComplete(completeUser);
        setFormData({
          name: completeUser.name || '',
          email: completeUser.email || '',
          address: completeUser.address || '',
          phone: completeUser.phone || '',
          imageUrl: completeUser.imageUrl || ''
        });
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userComplete?.id) {
        console.error('No hay ID de usuario');
        return;
    }
    
    const updatedUser: UserComplete = {
        id: userComplete.id,  
        rol: userComplete.rol,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        imageUrl: formData.imageUrl,
        age: userComplete.age  
    };
    
    await setUser(updatedUser);
    
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
};

  if (loading) {
    return (
      <div className="profile-page">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando información del perfil...</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Container>
        {/* Botón Volver */}
        <button className="profile-back-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="profile-card shadow-sm">
              {/* Botón Editar en la esquina superior derecha */}
              <button
                className="profile-edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                  <path d="M4 20h16" />
                </svg>
              </button>

              <Card.Body className="p-4 p-md-5">
                {/* Mensaje de éxito */}
                {showSuccess && (
                  <Alert variant="success" className="profile-alert">
                    Perfil actualizado correctamente
                  </Alert>
                )}

                {/* Avatar / Imagen de perfil */}
                <div className="profile-avatar-container">
                  <div className="profile-avatar">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Avatar" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  {isEditing && (
                    <div className="profile-avatar-edit">
                      <small>URL de la imagen (opcional)</small>
                    </div>
                  )}
                </div>

                <h2 className="profile-title text-center mb-4">Mi Perfil</h2>

                {isEditing ? (
                  // Formulario de edición
                  <form onSubmit={handleSubmit}>
                    {/* Campo URL del avatar */}
                    <Form.Group className="mb-4">
                      <Form.Label className="profile-label">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 17.66a10 10 0 0 0 6.36-2.62z" />
                          <path d="M16.5 6.5a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z" />
                        </svg>
                        URL de la foto de perfil
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="https://ejemplo.com/mi-foto.jpg"
                      />
                      <Form.Text className="text-muted">
                        Deja vacío para usar el icono por defecto
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="profile-label">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Nombre completo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Tu nombre"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="profile-label">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        Correo electrónico
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="tu@email.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="profile-label">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Dirección
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Tu dirección"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="profile-label">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Teléfono
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Tu teléfono"
                      />
                    </Form.Group>

                    {/* Campo Rol (solo lectura) */}
                    {userComplete?.rol && (
                      <Form.Group className="mb-4">
                        <Form.Label className="profile-label">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Rol
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={userComplete.rol}
                          className="profile-input"
                          disabled
                          readOnly
                        />
                      </Form.Group>
                    )}

                    <div className="d-flex gap-3 mt-4">
                      <Button type="submit" className="profile-btn-save">
                        Guardar cambios
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsEditing(false);
                          // Restaurar datos originales
                          if (userComplete) {
                            setFormData({
                              name: userComplete.name || '',
                              email: userComplete.email || '',
                              address: userComplete.address || '',
                              phone: userComplete.phone || '',
                              imageUrl: userComplete.imageUrl || ''
                            });
                          }
                        }}
                        className="profile-btn-cancel"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  // Vista de datos
                  <div className="profile-info">
                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="profile-info-content">
                        <span className="profile-info-label">Nombre</span>
                        <p className="profile-info-value">{formData.name || 'No especificado'}</p>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="profile-info-content">
                        <span className="profile-info-label">Email</span>
                        <p className="profile-info-value">{formData.email}</p>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="profile-info-content">
                        <span className="profile-info-label">Dirección</span>
                        <p className="profile-info-value">{formData.address || 'No especificada'}</p>
                      </div>
                    </div>

                    <div className="profile-info-item">
                      <div className="profile-info-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="profile-info-content">
                        <span className="profile-info-label">Teléfono</span>
                        <p className="profile-info-value">{formData.phone || 'No especificado'}</p>
                      </div>
                    </div>

                    {userComplete?.rol && (
                      <div className="profile-info-item">
                        <div className="profile-info-icon">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                        </div>
                        <div className="profile-info-content">
                          <span className="profile-info-label">Rol</span>
                          <p className="profile-info-value">{userComplete.rol}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;