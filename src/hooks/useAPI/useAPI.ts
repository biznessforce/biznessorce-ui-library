import React from "react";

import { AxiosPromise, AxiosResponse } from "axios";
import { constructErrorMessage } from "../../common";

/**
 * @param APICall Service Call to be made
 * @param callback onSuccess callback function with AxiosResponse as parameter
 * @param errCallback onFailure callback function with error message as parameter
 * @param config Configuration params to show global loader and global error
 *
 * @returns {loading, status, submitting, onRefresh, onSubmit}
 *
 * @example
 * import useAPI from '../hooks/useAPI';
 * import {fetchEmployees} from '../services/employee.service';
 *
 * const {loading, status, onSubmit} = useAPI(fetchEmployees, ({resp : {data}}) => {
 *      // response data
 *      console.log(data);
 * });
 *
 * <Button onClick={onSubmit} loading={loading}>Fetch Employees</Button>
 */
const useAPI = (
  APICall: (...props: any[]) => AxiosPromise,
  callback?: ({
    resp,
    setStatus,
  }: {
    resp: AxiosResponse;
    setStatus: any;
  }) => void,
  errCallback?: (errMsg: string) => void,
  config: {
    showGlobalLoader: boolean;
    showGlobalError: boolean;
    onLoader?: ({ isLoading }: { isLoading: boolean }) => void;
    onThrowError?: ({ type, msg }: { type: string; msg: string }) => void;
  } = {
    showGlobalLoader: false,
    showGlobalError: false,
    onLoader: () => null,
    onThrowError: () => null,
  }
) => {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<{
    type: "danger" | "success";
    msg: string;
  } | null>();

  const handleAPI = async (...props: any[]) => {
    setLoading(true);

    if (config.showGlobalLoader && config.onLoader) {
      // dispatch(ajaxLoader({ isLoading: true }));
      config.onLoader({ isLoading: true });
    }

    try {
      const resp = await APICall(...props);
      callback && callback({ resp, setStatus });

      if (config.showGlobalError && config.onThrowError) {
        // dispatch(updateGlobalError({ type: 'danger', msg: '' }));
        config.onThrowError({ type: "danger", msg: "" });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.log(err);

      setStatus({ type: "danger", msg: constructErrorMessage(err) });

      errCallback && errCallback(constructErrorMessage(err));
      if (config.showGlobalError && config.onThrowError) {
        config.onThrowError({
          type: "danger",
          msg: constructErrorMessage(err),
        });

        // dispatch(
        //   updateGlobalError()
        // );
      }
    }
    if (config.showGlobalLoader && config.onLoader) {
      config.onLoader({ isLoading: false });

      // dispatch(ajaxLoader({ isLoading: false }));
    }
    setLoading(false);
  };

  // React.useEffect(() => {
  //   return () => {};
  // }, []);

  return {
    loading,
    status,
    setStatus,
    submitted,
    submitting: loading,
    onRefresh: handleAPI,
    onSubmit: handleAPI,
  };
};

export default useAPI;
