import { useState, useEffect } from 'react';
import { Table, Badge, Button, Container, Row, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import type { User } from '../../interface/user';
import './userList.css';
import { Rol } from '../../enum/rol';

function UserList() {
    const navigate = useNavigate();
    const { getAllUsers, updateUserRol, updateUserBlocked } = useAuth(); 
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRol, setSelectedRol] = useState<Rol>('USER');
    const [saving, setSaving] = useState(false);
    const [blocking, setBlocking] = useState<string | null>(null); 

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const usersList = await getAllUsers();
        if (usersList) {
            setUsers(usersList);
            setFilteredUsers(usersList);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredUsers(users);
        } else {
            const term = searchTerm.toLowerCase();
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
            );
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]);

    const handleToggleBlocked = async (user: User) => {
        const newBlockedStatus = !user.blocked;
        setBlocking(user.id); 
        
        try {
            const updatedUser = await updateUserBlocked(user.id, newBlockedStatus);
            if (updatedUser) {
                const updatedUsers = users.map(u =>
                    u.id === user.id ? { ...u, blocked: newBlockedStatus } : u
                );
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.error('Error al cambiar el estado del usuario:', error);
        } finally {
            setBlocking(null);
        }
    };

    const handleEditRol = (user: User) => {
        setSelectedUser(user);
        setSelectedRol(user.rol);
        setShowModal(true);
    };

    const handleSaveRol = async () => {
        if (!selectedUser) return;
        
        setSaving(true);
        
        try {
            const updatedUser = await updateUserRol(selectedUser.id, selectedRol);
            if (updatedUser) {
                const updatedUsers = users.map(u =>
                    u.id === selectedUser.id ? { ...u, rol: selectedRol } : u
                );
                setUsers(updatedUsers);
            }
            setShowModal(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error al guardar el rol:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleCloseModal = () => {
        if (!saving) {
            setShowModal(false);
            setSelectedUser(null);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    if (loading) {
        return (
            <Container className="user-list-container">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3">Cargando lista de usuarios...</p>
                </div>
            </Container>
        );
    }

    return (
        <Container className="user-list-container">
            {/* Botón Volver */}
            <button className="user-list-back-btn" onClick={() => navigate('/')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver al menú
            </button>

            <Row className="mb-4 align-items-center">
                <Col md={6}>
                    <h2 className="user-list-title">Lista de Usuarios</h2>
                    <p className="user-list-subtitle">
                        Total de usuarios: {filteredUsers.length}
                        {searchTerm && ` (${users.length} total)`}
                    </p>
                </Col>
                <Col md={6}>
                    <InputGroup className="search-input-group">
                        <InputGroup.Text className="search-icon">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <Button
                                variant="outline-secondary"
                                onClick={handleClearSearch}
                                className="search-clear-btn"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </Button>
                        )}
                    </InputGroup>
                </Col>
            </Row>

            {searchTerm && filteredUsers.length === 0 && (
                <Row className="mb-3">
                    <Col>
                        <div className="no-results">
                            <svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <p>No se encontraron usuarios para "{searchTerm}"</p>
                        </div>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <div className="table-responsive">
                        <Table striped bordered hover className="user-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Badge bg={user.rol === 'ADMIN' ? 'danger' : 'secondary'}>
                                                {user.rol}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge bg={user.blocked ? 'danger' : 'success'}>
                                                {user.blocked ? 'Bloqueado' : 'Activo'}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="user-actions">
                                                <button
                                                    className={`action-btn ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                                                    onClick={() => handleToggleBlocked(user)}
                                                    title={user.blocked ? 'Desbloquear usuario' : 'Bloquear usuario'}
                                                    disabled={blocking === user.id}
                                                >
                                                    {blocking === user.id ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : user.blocked ? (
                                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <line x1="8" y1="12" x2="16" y2="12" />
                                                        </svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <line x1="12" y1="8" x2="12" y2="16" />
                                                            <line x1="8" y1="12" x2="16" y2="12" />
                                                        </svg>
                                                    )}
                                                </button>

                                                {/* Botón de editar rol */}
                                                <button
                                                    className="action-btn btn-edit"
                                                    onClick={() => handleEditRol(user)}
                                                    title="Editar rol"
                                                >
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M17 3l4 4-7 7H10v-4l7-7z" />
                                                        <path d="M4 20h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            {/* Modal para editar rol */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton={!saving}>
                    <Modal.Title>Editar Rol de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <>
                            <p><strong>Usuario:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <Form.Group>
                                <Form.Label>Seleccionar nuevo rol</Form.Label>
                                <Form.Select
                                    value={selectedRol}
                                    onChange={(e) => setSelectedRol(e.target.value as Rol)}
                                    disabled={saving}
                                >
                                    <option value={Rol.USER}>USER</option>
                                    <option value={Rol.ADMIN}>ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleCloseModal}
                        disabled={saving}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSaveRol}
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Guardando...
                            </>
                        ) : (
                            'Guardar cambios'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default UserList;