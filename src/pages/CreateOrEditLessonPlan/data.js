export function lessonPlanSidebarData(showSelectedMethods, t) {
  return [
    {
      text: t("Assistants"),
      hash: "teacherId",
      show: true,
    },
    {
      text: t("Subject/Grade"),
      hash: "subjectAndClassId",
      show: true,
    },
    {
      text: t("Topic"),
      hash: "topic",
      show: true,
    },
    {
      text: t("Used materials"),
      hash: "materialsUsed",
      show: true,
    },
    {
      text: t("Lesson objectives"),
      hash: "lessonObjective",
      show: true,
    },
    {
      text: t("Lesson extended picture"),
      hash: "completePictureOfClass",
      show: true,
    },
    {
      text: t("Learning outcomes"),
      hash: "finalResults",
      show: true,
    },
    {
      text: t("Selected methods"),
      hash: "selectedMethods",
      show: showSelectedMethods,
    },
    {
      text: t("Terminology"),
      hash: "terms",
      show: true,
    },
    {
      text: t("Homework"),
      hash: "homeWork",
      show: true,
    },
    {
      text: t("Whiteboard content"),
      hash: "blackBoard",
      show: true,
    },
  ];
}
