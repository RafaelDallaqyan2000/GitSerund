const languageAm = localStorage.getItem("language") === "am";

export const ReplyType = {
  agree: {
    typename: languageAm ? "Համաձայն եմ" : "I agree",
    textColor: "#6FD89C",
    typeText: languageAm
      ? "Համաձայն եմ, փոփոխությունը կատարել եմ "
      : "OK, proposed change is done",
    typeValue: true,
  },
  disagree: {
    typename: languageAm ? "Համաձայն չեմ" : "I don't agree",
    textColor: "#EA6670",
    typeText: languageAm
      ? "Համաձայն չեմ, քանի որ..."
      : "I didn’t change because …",
    typeValue: false,
  },
};

export const replyTypes = [ReplyType.agree, ReplyType.disagree];
