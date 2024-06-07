import React from "react";
import {DatePicker  as NextDatePicker} from "@nextui-org/react";
import {now, parseAbsoluteToLocal} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

export default function DatePicker() {
  let [date, setDate] = React.useState(parseAbsoluteToLocal("2021-04-07T18:45:22Z"));

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="en-US">
        <NextDatePicker
          showMonthAndYearPickers
          variant="bordered"
          className="max-w-md"
          label="Appointment date"
          value={date}
          onChange={setDate}
        />
      </I18nProvider>
    </div>
  );
}
