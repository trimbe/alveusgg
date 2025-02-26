import {
  useCallback,
  type MouseEventHandler,
  type ReactNode,
  useMemo,
} from "react";

import { classes } from "@/utils/classes";

import {
  useConsent,
  consentData,
  consentExplainer,
  type ConsentKey,
} from "@/hooks/consent";

import Link from "@/components/content/Link";

type ConsentProps = {
  item: string;
  consent: ConsentKey;
  indexable?: boolean;
  className?: string;
  children: ReactNode;
};

const Consent = ({
  item,
  consent: key,
  indexable,
  className,
  children,
}: ConsentProps) => {
  // Get the current user consent state
  // If this is "indexable", we'll ignore consent for known crawlers
  const { consent, update, loaded } = useConsent();
  const crawling = useMemo(
    () =>
      indexable &&
      typeof navigator !== "undefined" &&
      ["googlebot", "bingbot", "linkedinbot"].some((bot) =>
        navigator.userAgent.toLowerCase().includes(bot),
      ),
    [indexable],
  );

  // When the user clicks the consent button, update the state
  const clicked = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      update({ [key]: true });
    },
    [key, update],
  );

  return (
    <div
      className={classes(
        "relative z-0 flex flex-col items-center justify-center",
        className,
      )}
    >
      {loaded &&
        (crawling || consent[key] ? (
          <>
            <p className="absolute -z-10 m-auto text-2xl" aria-hidden="true">
              Loading {item}...
            </p>
            {children}
          </>
        ) : (
          <>
            <p className="m-6 mb-3 text-2xl">Loading {item}...</p>

            <div className="m-6 mt-3 flex max-w-2xl flex-col gap-4 rounded-lg bg-alveus-tan p-4 text-alveus-green shadow-lg">
              <p>
                This content is from a third party and we need your consent to
                show it. It {consentExplainer}.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={clicked}
                  className="rounded-full border-2 border-alveus-green px-4 py-2 transition-colors hover:bg-alveus-green hover:text-alveus-tan"
                >
                  Consent to loading {consentData[key].name}
                </button>

                <Link href={consentData[key].privacy} external>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Consent;
