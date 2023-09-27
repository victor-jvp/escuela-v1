import logo from "../../assets/logo_escuela.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getStudentsByTeacherRequest, getStudentsRequest } from "../../api/students";
import Swal from 'sweetalert2';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  title: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
    padding: "25px 0px 0px 10px",
    fontSize: "16pt",
  },
  logo: {
    height: "auto",
    width: "70px",
    alignSelf: "center",
    paddingTop: "15px",
  },
  body: {
    display: "flex",
    alignContent: "flex-start",
    margin: 10,
    padding: 10,
  },
  bodyText: {
    padding: "5px",
    marginTop: "50px"
  },
  expide: {
    marginTop: "50px",
    padding: "5px",
    textAlign: "justify",
  }
});

const Constancia = () => {

  const getStudent = async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      const token = JSON.parse(sessionStorage.getItem("session")).token;
      const userType = JSON.parse(sessionStorage.getItem("session"));
      if (userType.profesor) {
        return await getStudentsByTeacherRequest(token);
      } else {
        return await getStudentsRequest(token);
      }
    } catch (error) {
      Swal.fire(
        'Error al cargar los datos.',
        error.message,
        'error'
      )
      console.log(error)
    }
  };

  const students = getStudent()
  const dia = new Intl.DateTimeFormat("es-ES", {day: "numeric"}).format(new Date());
  const mes = new Intl.DateTimeFormat("es-ES", {month: "long"}).format(new Date());
  const anio = new Intl.DateTimeFormat("es-ES", {year: "numeric"}).format(new Date());

  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.title}>
          <Text>República Bolivariana de Venezuela</Text>
          <Text>Ministerio del Poder Popular para la Educicación</Text>
          <Text>E.B. República del Uruguay</Text>
          <Text
            style={{
              paddingTop: "15px",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            CONSTANCIA DE ESTUDIOS
          </Text>
          <Image src={logo} style={styles.logo} />
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Por medio de la presente se hace constar que el estudiante: {student.nombres + ' ' + student.apellidos},
            cédula escolar o de identidad: V{student.cedula}, cursa en esta institución el {student.grado} grado,
            sección: {student.seccion}, de educación primaria durante el año escolar: [anio_escolar]
          </Text>
          
          <Text style={styles.expide}>
            Constancia que se expide en Maturín, a los {dia} días del mes de {mes} del año {anio}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Constancia;
