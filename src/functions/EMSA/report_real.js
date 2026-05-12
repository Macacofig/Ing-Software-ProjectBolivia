function filter_reports(
  reports,
  {
    status = "",
    date = "",
    location = "",
    idCitizen = "",
  } = {}
) {

  return reports.filter(report => {

    const matchesStatus =
      !status ||
      report.status === status;

    const reportDate =
      (report.date || report.Date || "")
      .split("T")[0];

    const matchesDate =
      !date ||
      reportDate >= date;

    const matchesLocation =
      !location ||
      report.location
        .toLowerCase()
        .includes(location.toLowerCase());

    const matchesIdCitizen =
      !idCitizen ||
      report.idCitizen === idCitizen;

    return (
      matchesStatus &&
      matchesDate &&
      matchesLocation &&
      matchesIdCitizen
    );

  });

}

export { filter_reports };