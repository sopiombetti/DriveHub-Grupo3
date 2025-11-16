# DriveHub-Grupo3
TP Programación II - Proyecto DriveHub - Grupo 3


# 📌 DriveHub — Sistema de Alquiler de Vehículos

Plataforma para la gestión integral de alquiler de autos: administración de flota, reservas, tarifas variables por temporada, control de mantenimiento y estadísticas.

---

## 🧠 Descripción

DriveHub es un sistema que permite gestionar una flota de vehículos y las reservas de sus clientes, simulando el funcionamiento real de una empresa de alquiler. Está desarrollado en TypeScript aplicando Programación Orientada a Objetos, uso de patrones de diseño y principios SOLID.

Incluye:

- Gestión de vehículos (Compacto, Sedán, SUV)
- Manejo y validación de estados mediante **Patrón State**
- Variación de tarifas por temporada con **Patrón Strategy**
- Cálculo de tarifas base + variaciones por temporada 
- Control automático de mantenimiento por tiempo, km o cantidad de alquileres
- Estadísticas de ocupación y rentabilidad
- Pruebas unitarias con Jest (+80% cobertura)
- Documentación del código con TypeDOC

---

## 🗂 Estructura de directorios

```
DRIVEHUB-GRUPO3/
│
├── diagramas/
│   ├── clases/
│   │   └── clases.puml              # Diagrama de clases UML
│   └── secuencia/
│       ├── secuencia_1.puml         # Diagrama de secuencia
│       └── secuencia_2.puml         # Diagrama de secuencia
│
├── src/
│   ├── estados/                    # Estados
│   │   ├── alquilado.ts
│   │   ├── disponible.ts
│   │   ├── estado.ts
│   │   └── mantenimiento.ts
│   │
│   ├── excepciones/                # Excepciones
│   │   ├── alquilarException.ts
│   │   └── mantenimientoException.ts
│   │
│   ├── temporadas/                 # Temporadas
│   │   ├── temporadaAlta.ts
│   │   ├── temporadaBaja.ts
│   │   ├── temporadaMedia.ts
│   │   └── temporada.ts 
│   │
│   ├── vehiculos/                  # Vehículos
│   │   ├── compacto.ts
│   │   ├── sedan.ts
│   │   ├── suv.ts
│   │   └── vehiculo.ts
│   │
│   ├── admin.ts
│   ├── cliente.ts
│   ├── persona.ts
│   ├── reserva.ts
│   ├── solicitudReserva.ts
│   ├── index.ts
│   └── calculadoraTarifa.ts
│   
└── tests/                          # Pruebas unitarias con Jest +80% Cobertura


```


## 🔧 Instalación

### 📋 Prerrequisitos

- Node.js 18+
- npm 9+
- Git

# Instalar dependencias

```bash
npm i
```
# Hacer build
```bash
npm run build
```
# Ejecutar test

```bash
npm run test
```

###
## 👥 Integrantes
**Federico Gonzalez**  
**Sofía Piombetti**  
**Gastón Monsalvo**  
**Juan Ignacio Vicente Prieto**  
**Fiorella Bueno** 


UTN - 2025