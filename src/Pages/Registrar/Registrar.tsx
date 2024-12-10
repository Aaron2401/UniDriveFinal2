import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrar.css';

const Registrar: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.university) {
      return 'Por favor, complete todos los campos obligatorios.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          password: formData.password,
          universidad: formData.university,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Registro exitoso!');
        navigate('/login');
      } else {
        setError(data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Hubo un error al realizar la solicitud. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="/Images/imagen-registro.jpg"
          alt="Imagen de Registro"
          className="login-image"
        />
        <div className="login-form">
          <h2>¡Regístrate y Únete!</h2>
          {error && <p className="error-message" role="alert">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="correo@universidad.edu.mx"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Ingresa una contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="university">Universidad</label>
              <select
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
              >
                <option value="">Selecciona tu universidad</option>
                <option value="Universidad Tecnológica de Cancún">Universidad Tecnológica de Cancún</option>
                <option value="La Salle">La Salle</option>
                <option value="Tecnológico de Monterrey">Tecnológico de Monterrey</option>
              </select>
            </div>
            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
          <div className="back-button-container">
  <button className="back-button" onClick={() => navigate("/")}>
    Regresar al Inicio
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Registrar;
