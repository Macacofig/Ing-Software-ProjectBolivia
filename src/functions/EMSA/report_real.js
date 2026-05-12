function filter_reports(
  reports,
  {
    status = "",
    date = "",
    location = ""
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

    return (
      matchesStatus &&
      matchesDate &&
      matchesLocation
    );

  });

}

export { filter_reports };