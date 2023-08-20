// import logo from "../../assets/logo_escuela.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getStudentNotesRequest } from "../../api/students";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  title: {
    display: "flex",
    alignContent: "left",
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

const Informe = () => {

  const getStudent = async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      const token = JSON.parse(sessionStorage.getItem("session")).token;
      return await getStudentNotesRequest(token, id);
    } catch (error) {
      console.log(error)
    }
  };

  const student = getStudent()
  console.log(student)

  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.title}>
          <Text>Proyecto: [nombre_proyecto]</Text>
          <Text>Año escolar: [periodo]</Text>
          <Text>Alumno: [nombre_apellidos]</Text>
          <Text
            style={{
              paddingTop: "15px",
              fontWeight: "bold",
              textDecoration: "underline",
              textAlign: "left",
            }}
          >
            REGISTRO DESCRIPTIVO
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            [descripcion]
          </Text>
          <Text style={styles.bodyText}>
            Docente de Grado: ___________
            Director: ___________
            Representante: ___________
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Informe;
