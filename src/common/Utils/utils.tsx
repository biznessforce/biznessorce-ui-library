import { capitalize, identity, pickBy } from "lodash";
import dayjs, { Dayjs } from "dayjs";

export const DAY_TIMING = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening",
  NIGHT: "night",
  MOON: "moon",
  SUNSET: "sunset",
  SUN: "sun",
};

export const removeEmptyProps = (obj: any) => {
  // return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  return pickBy(obj, identity);
};

export const firstLettersPipe = (word: string) => {
  return word
    ?.split(" ")
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase();
};

export const formatDate = (
  date: Dayjs | Date | string,
  format = "DD-MMM-YYYY"
) => {
  return date ? dayjs(date).format(format) : "";
};

export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "";
  const codePoints = countryCode
    ?.toUpperCase()
    ?.split("")
    ?.map((char: any) => 127397 + char?.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export const constructErrorMessage = (
  error?: { response: { data: any } } | any
): string => {
  const message = "please try again later or contact administrator";

  if (error?.response?.status === 503) {
    return `Service not available, ${message}`;
  }
  if (error?.response?.status === 500) {
    return `Server error occured, ${message}`;
  }
  if (error?.response?.data)
    return `${error.response.data.status} - ${
      error.response.data.message || error.response.data.statusMessage
    }`;
  return `Error processing request, ${message}`;
};

// Converting Mins to Hours
export const convertMinstoHrs = (mins: number | undefined): string => {
  if (!mins) return "0:00";
  /**
   * 405 / 60 = 6.75 => 6: 0.75*60 => 6h:45m
   */
  const [hour, min] = (mins / 60).toFixed(2).split(".");
  const updatedHour = `${(parseInt(min) * 60).toString().slice(0, 2)}`;
  return `${hour}:${
    updatedHour.length === 1 ? `${updatedHour}0` : updatedHour
  }`;
};

export const dataURItoBlob = (dataURI: string) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //Old Code
  //write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);

  //New Code
  return new Blob([ab], { type: mimeString });
};

export const toggleFullScreen = () => {
  const isInFullScreen =
    (document.fullscreenElement && true) ||
    // @ts-ignore
    (document["webkitFullscreenElement"] &&
      // @ts-ignore
      document["webkitFullscreenElement"] !== null) ||
    // @ts-ignore
    (document["mozFullScreenElement"] &&
      // @ts-ignore
      document["mozFullScreenElement"] !== null) ||
    // @ts-ignore
    (document["msFullscreenElement"] &&
      // @ts-ignore
      document["msFullscreenElement"] !== null);

  const docElm = document.documentElement as any;
  if (!isInFullScreen) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm["mozRequestFullScreen"]) {
      docElm?.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // @ts-ignore
    } else if (document["webkitExitFullscreen"]) {
      (document as any).webkitExitFullscreen();
      // @ts-ignore
    } else if (document["mozCancelFullScreen"]) {
      (document as any).mozCancelFullScreen();
      // @ts-ignore
    } else if (document["msExitFullscreen"]) {
      (document as any).msExitFullscreen();
    }
  }
};

export const firstLetterCaps = (name: string) => {
  return name?.replace(/\w+/g, capitalize);
  // return startCase(name?.toLowerCase());
};

export const getGreetingTime = (m: Dayjs) => {
  let g = null; //return g

  if (!m || !m.isValid()) {
    return;
  } //if we can't find a valid or filled dayjs, we return.

  const split_afternoon = 12; //24hr time to split the afternoon
  const split_evening = 15; //24hr time to split the evening
  const split_night = 17; //24hr time to split the evening
  const currentHour = parseFloat(m.format("HH"));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = DAY_TIMING.AFTERNOON;
  } else if (currentHour >= split_evening && currentHour <= split_night) {
    g = DAY_TIMING.EVENING;
  } else if (currentHour >= split_night) {
    g = DAY_TIMING.NIGHT;
  } else {
    g = DAY_TIMING.MORNING;
  }

  return g;
};

export const getIcon = (shiftTime: string) => {
  const greetings = getGreetingTime(dayjs(shiftTime?.split(" ")[0], "ha"));
  if (greetings === DAY_TIMING.MORNING) {
    return " ";
  }
  if (greetings === DAY_TIMING.NIGHT) {
    return DAY_TIMING.MOON;
  }
  if (greetings === DAY_TIMING.EVENING) {
    return DAY_TIMING.SUNSET;
  }

  return DAY_TIMING.SUN;
};

// GUID/ UUID Generator
export const uuidv4 = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// Image Placeholder
export const ImagePlaceholder =
  "data:image/png;base64,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";

// Integer Validation for Rate
export const RateRuleValidator = {
  validator: (_: any, value: any) => {
    const re = /^-?(0|[1-9]\d*)(\.\d+)?$/;
    return re.exec(value)
      ? Promise.resolve()
      : Promise.reject(new Error("Invalid Format"));
  },
};
