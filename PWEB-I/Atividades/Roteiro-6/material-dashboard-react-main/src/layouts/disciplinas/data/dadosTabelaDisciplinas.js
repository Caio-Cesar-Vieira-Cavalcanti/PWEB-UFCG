import MDTypography from "components/MDTypography";

export default function data() {
  return {
    columns: [
      {
        Header: "disciplina",
        accessor: "disciplina",
        align: "left",
      },
      {
        Header: "professor",
        accessor: "professor",
        align: "left",
      },
    ],

    rows: [
      {
        disciplina: (
          <MDTypography variant="button" fontWeight="medium">
            Compiladores
          </MDTypography>
        ),

        professor: <MDTypography variant="caption">Franklin</MDTypography>,
      },

      {
        disciplina: (
          <MDTypography variant="button" fontWeight="medium">
            Projeto 1
          </MDTypography>
        ),

        professor: <MDTypography variant="caption">Eduardo</MDTypography>,
      },

      {
        disciplina: (
          <MDTypography variant="button" fontWeight="medium">
            Metodologia Científica
          </MDTypography>
        ),

        professor: <MDTypography variant="caption">Antão</MDTypography>,
      },

      {
        disciplina: (
          <MDTypography variant="button" fontWeight="medium">
            Verificação e Validação (V&V)
          </MDTypography>
        ),

        professor: <MDTypography variant="caption">Everton</MDTypography>,
      },
    ],
  };
}
