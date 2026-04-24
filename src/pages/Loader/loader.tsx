
const PageLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
        <div className="text-center">
            <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white mt-3">Cargando página...</p>
        </div>
    </div>
);

export default PageLoader