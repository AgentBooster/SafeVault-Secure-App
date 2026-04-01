# Contexto:

# **Introducción**

En esta actividad, utilizará Microsoft Copilot para generar código seguro para una aplicación web, centrándose en mitigar vulnerabilidades comunes como la inyección de SQL y la secuencia de comandos entre sitios (XSS). También escribirá pruebas para garantizar que el código generado protege contra posibles amenazas a la seguridad.

Esta es la primera de tres actividades en las que protegerá la aplicación SafeVault. Las prácticas de codificación segura implementadas aquí servirán como base para los sistemas de autenticación y autorización en las actividades posteriores.

# **Instrucciones**

## **Paso 1: Revisar el escenario**

Para comenzar, revisa el siguiente escenario relacionado con la construcción de la aplicación web "SafeVault":

SafeVault es una aplicación web segura diseñada para gestionar datos confidenciales, incluidas credenciales de usuario y registros financieros. ASu papel como desarrollador principal es garantizar que la aplicación sea robusta frente a ataques mediante la implementación de prácticas de codificación seguras.

Los requisitos iniciales incluyen:

* Validación de las entradas del usuario para evitar inyecciones maliciosas.  
* Asegurar las consultas a la base de datos para eliminar las vulnerabilidades de inyección de SQL.  
* Probar el código para garantizar que resiste ataques XSS y de inyección de SQL.

Su objetivo es utilizar Microsoft Copilot para escribir código seguro y generar pruebas que simulen escenarios de ataque.

Este es el código base de la aplicación

**Formulario Web (Validación de entrada)**

1

2

3

4

5

6

7

8

9

10

**Esquema y conexión de la base de datos (consultas parametrizadas)**

1

2

3

4

5

6

**Configuración del marco de pruebas (pruebas de vulnerabilidades)**

13

12

10

11

5

6

7

8

9

2

3

4

1

## **Paso 2: Generar código seguro para la Validación de entrada**

Utilice Copilot para generar código que:

* Valide las entradas de los usuarios eliminando caracteres maliciosos y garantizando la integridad de los datos.  
* Evita que los usuarios introduzcan secuencias de comandos o consultas potencialmente dañinas.

Ejemplo: Implemente una función que desinfecte las entradas de un formulario web, como **username** y **email**.

## **Paso 3: Utilice consultas parametrizadas para evitar la inyección de SQL**

Utilice Copilot para:

* Escribir consultas de base de datos utilizando sentencias parametrizadas.  
* Manejar de forma segura los datos proporcionados por el usuario, como las credenciales de inicio de sesión o las entradas de búsqueda.

Ejemplo: Generar una consulta segura para recuperar información del usuario utilizando marcadores de posición para los parámetros.

## **Paso 4: Pruebe el código en busca de vulnerabilidades**

Utilice Copilot para:

* Generar pruebas unitarias para simular intentos de inyección de SQL.  
* Escribir pruebas para vulnerabilidades XSS inyectando scripts maliciosos en las entradas del usuario.

Ejecute las pruebas y compruebe que el código generado evita eficazmente estos ataques.

## **Paso 5: Guarde su trabajo**

Al final de esta actividad, usted tendrá:

* Código seguro que valida las entradas del usuario y previene ataques de inyección de SQL.  
* Pruebas que verifican la solidez del código frente a vulnerabilidades comunes.

Guarda todo el código seguro y los casos de pruebas en tu entorno sandbox. Este trabajo será ampliado en la Actividad 2, donde implementarás sistemas de autenticación y autorización.

# **Introducción**

En esta actividad, protegerá la aplicación SafeVault implementando mecanismos de autenticación y autorización. La autenticación garantiza que sólo los usuarios legítimos puedan acceder al sistema, mientras que la autorización restringe el acceso a funciones específicas en función de los roles de usuario. Utilizando Microsoft Copilot, generarás y probarás código para establecer estas capas de seguridad esenciales.

Esta es la segunda de tres actividades. Las prácticas de codificación segura y el código base implementado en la Actividad 1 servirán como base para proteger las cuentas de usuario en esta actividad.

# **Instrucciones**

## **Paso 1: Revisar el escenario**

SafeVault necesita mecanismos sólidos de control de acceso para evitar el acceso no autorizado a datos confidenciales. El sistema debe

* Verificar las credenciales del usuario durante el inicio de sesión (autenticación).  
* Restringir el acceso a determinadas funciones, como las herramientas administrativas, en función de los roles de usuario (autorización).

Su objetivo es utilizar Microsoft Copilot para generar código para estas funcionalidades y probar su fiabilidad.

## **Paso 2: Generar código de autenticación**

Utilice Copilot para:

* Escribir código para la funcionalidad de inicio de sesión de usuario, incluida la verificación de nombres de usuario y contraseñas.  
* Convertir en hash las contraseñas de forma segura utilizando una biblioteca como **bcrypt** o **Argon2**.

Ejemplo: Implementar una función para autenticar usuarios comparando contraseñas con hash.

## **Paso 3: Implementar la autorización basada en roles (RBAC)**

Utiliza Copilot para generar código que:

* Asigne funciones a los usuarios (por ejemplo, **admin**, **user**).  
* Restrinja el acceso a rutas o funciones específicas en función de los roles.

Ejemplo: Proteger el **panel de administración** para que sólo los usuarios con el rol **admin** puedan acceder a él.

## **Paso 4: Probar el sistema de autenticación y autorización**

Utilice Copilot para:

* Escribir casos de prueba para simular escenarios como intentos de inicio de sesión no válidos y accesos no autorizados.  
* Probar el Control de acceso para usuarios con diferentes roles.

## **Paso 5: Guarde su trabajo**

Al final de esta actividad, usted tendrá:

* Un sistema operativo de autenticación y autorización para SafeVault.  
* Pruebas de verificación del control de acceso adecuado para diferentes roles de usuario.

Guarde el código de autenticación y autorización y los casos de pruebas en su entorno sandbox. Estos sistemas serán depurados y asegurados en la Actividad 3\.

# **Introducción**

Incluso con prácticas de codificación seguras, pueden existir vulnerabilidades. En esta actividad, utilizará Microsoft Copilot para depurar y resolver vulnerabilidades de seguridad en la aplicación SafeVault. Esto incluye la identificación de problemas como riesgos de inyección de SQL y vulnerabilidades XSS, la aplicación de correcciones y la comprobación del código corregido para garantizar su seguridad.

Esta es la actividad final del proyecto, que garantiza que la aplicación SafeVault es segura y está lista para su despliegue.

# **Instrucciones**

## **Paso 1: Revisar el escenario**

Ha implementado prácticas de codificación seguras y mecanismos de control de acceso en SafeVault, pero las pruebas posteriores han revelado posibles vulnerabilidades. Estas incluyen

* Riesgos de inyección de SQL en consultas a bases de datos.  
* Riesgos de secuencia de comandos entre sitios (XSS) en el manejo de Contenido generado por el usuario.

Su objetivo es depurar estos problemas mediante Microsoft Copilot y aplicar correcciones para proteger la aplicación.

## **Paso 2: Identificar vulnerabilidades en el código base**

Utilice Copilot para:

* Analizar la base de código e identificar consultas inseguras o el manejo de la salida.  
* Detectar vulnerabilidades específicas como:  
  * Concatenación de cadenas insegura en consultas SQL.  
  * Falta de sanitización de entrada en el manejo de formularios.

## **Paso 3: Solucione los problemas de seguridad con Copilot**

Utilice las sugerencias de Copilot para:

* Sustituir las consultas inseguras por sentencias parametrizadas.  
* Sanear y escapar de las entradas del usuario para evitar ataques XSS.

## **Paso 4: Pruebe el código corregido**

Utilice Copilot para:

* Generar pruebas que simulen escenarios de ataque, tales como:  
  * Intentos de inyección de SQL con entradas maliciosas.  
  * Ataques XSS a través de campos de formulario.  
* Compruebe que el código corregido bloquea eficazmente estos ataques.

## **Paso 5: Guarde y resuma su trabajo**

Al final de esta actividad, usted habrá:

* Depurado y asegurado el código base de SafeVault contra vulnerabilidades comunes.  
* Pruebas que confirmen la solidez de la aplicación frente a los ataques.

Guardado el código base depurado y protegido en tu entorno sandbox. Preparar un resumen de las vulnerabilidades identificadas, las correcciones aplicadas y cómo Copilot ayudó en el proceso de depuración.

