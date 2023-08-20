import logo from "../../assets/logo_escuela.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getStudentProofRequest } from "../../api/students";
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
  },
});

const Constancia = () => {

  const getStudent = async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      const token = JSON.parse(sessionStorage.getItem("session")).token;
      return await getStudentProofRequest(token, id);
    } catch (error) {
      Swal.fire(
        'Error al cargar los datos.',
        error.message,
        'error'
      )
      console.log(error)
    }
  };

  const student = getStudent()

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
            BOLETIN INFORMATIVO
          </Text>
          <Image src={logo} style={styles.logo} />
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyText}>Apellidos: </Text>
          <Text style={styles.bodyText}>Nombres: </Text>
          <Text style={styles.bodyText}>Fecha de Nacimiento: </Text>
          <Text style={styles.bodyText}>Edad: </Text>
          <Text style={styles.bodyText}>Grado y Sección: </Text>
          <Text style={styles.bodyText}>Representante: </Text>
          <Text style={styles.bodyText}>Dirección: </Text>
          <Text style={styles.bodyText}>Cédula Escolar: </Text>
          <Text style={styles.bodyText}>Año Escolar: </Text>
        </View>
      </Page>
      <Page size="Letter" style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            El Alumno [alumno] Natural de [direccion] de [edad] años de edad, cursante de [grado] de educación básica
            ha sido promovido al [grado+1] / reprobado en el [grado] grado con el literal de [literal (definir variable)]
          </Text>
          <Text style={styles.bodyText}>
            Docente de Grado: ___________,
            Director: ___________
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Constancia;
