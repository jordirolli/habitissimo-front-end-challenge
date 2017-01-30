# Habitissimo front end challenge

Proyecto para demostrar mis aptitudes para el desarrollo front end.

Concretamente:
1. Descomposición del problema en estructuras y algoritmos para reducir su complejidad.
2. Estilo de código.
3. Nomenclatura de clases, funciones y variables.
4. Correcta organización del código en ficheros y directorios.
5. Gestión de excepciones y e  dge cases.
6. Uso de tests unitarios y baterías de pruebas.

## Construcción

Para instalar y construir el proyecto deben ejecutarse los siguientes comandos:

```
# Descargar dependencias
npm install

# Construir proyecto
gulp
```

## Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```
data/       -> capa de persisténcia de datos. Ya sea mediante bbdd o ficheros.
dist/       -> directorio dónde se construye el proyecto
src/        -> código fuente
    html/
    js/
    php/
    sass/
gulpfile.js
package.json
```