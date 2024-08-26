import axios from "axios";

export function putSubjectsOnAdminPage(userId, checkedSubjects) {
  const subjects = checkedSubjects?.map((e) => {
    return {
      subjectId: e.subjectId || e.id,
      classes: e.classes || e.subArray,
    };
  });
  return (dispatch) => {
    axios
      .put(`/auth/userData/subject`, {
        userId,
        subjects,
      })
      .then((res) => res)
      .catch((er) => er);
  };
}
