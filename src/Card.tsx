import React, { ReactNode } from "react";

export type Action = "none" | "one" | "two" | "three" | "reaction";

export interface CardProps {
  id: string;
  title: string;
  type: string;
  consumable?: boolean;
  traits: string[];
  lvl: string;
  description: string;
  usage?: string;
  // item
  activate?: string[];
  activateTop?: boolean;
  // activate
  frequency?: string;
  effect?: string;
  // -- activate
  bulk?: string;
  price?: string;
  // -- item
  requirements?: string;
  actions: Action;
  trigger?: string;
  children?: ReactNode;
  critSuccess?: string;
  success?: string;
  fail?: string;
  critFail?: string;
  special?: string;
  hasAffliction: boolean;
  affliction?: {
    savingThrow?: {
      type?: string;
      dc?: string;
    };
    onset?: string;
    maxDuration?: string;
    phases?: string[];
  };
  benefit?: string;
  drawback?: string;
  fontSize?: string;
}

export const Card = ({
  title,
  traits,
  type,
  description,
  lvl,
  requirements,
  actions = "none",
  trigger,
  usage,
  activate,
  activateTop,
  frequency,
  effect,
  bulk,
  price,
  critSuccess,
  success,
  fail,
  critFail,
  special,
  hasAffliction,
  affliction,
  benefit,
  drawback,
  fontSize,
}: CardProps) => (
  <div className="p-1 bg-pf print-card">
    <div id="result" className="text-pf">
      <div className="d-flex">
        <div className="pf-trait-title">
          <h1>{title}</h1>
          {type === "Talent" && actions !== "none" && (
            <div className={`pf-action ${actions}-action`} />
          )}
        </div>
        <h1 className="ml-auto">
          {type} {lvl}
        </h1>
      </div>
      {price && (
        <p className="hang">
          <strong>Preis</strong> {price}
        </p>
      )}
      {usage && bulk && (
        <p className="hang">
          <strong>Nutzung</strong> {usage}; <strong>Last</strong> {bulk}
        </p>
      )}
      {activate && activateTop && (
        <p className="hang">
          <strong>Aktivierung</strong>
          {actions !== "none" && (
            <div className={`pf-action ${actions}-action small-action`} />
          )}
          {activate.map(
            (item, idx) => `${item}${idx !== activate?.length - 1 ? ", " : ""}`
          )}
          {frequency && (
            <>
              ; <strong>Häufigkeit</strong> {frequency}
            </>
          )}
          {trigger && (
            <>
              ; <strong>Auslöser</strong> {trigger}
            </>
          )}
        </p>
      )}

      <div className="head-line" />

      <div className="pf-traits">
        {traits.map((trait) => (
          <div key={trait} className="pf-trait">
            {trait}
          </div>
        ))}
      </div>
      <div className="text-pf" style={{ fontSize }}>
        {requirements && (
          <p className="hang">
            <strong>Voraussetzungen</strong> {requirements}
          </p>
        )}
        {type === "Talent" && trigger && (
          <p className="hang">
            <strong>Auslöser</strong> {trigger}
          </p>
        )}

        {(!!trigger || !!requirements) && <div className="sub-line" />}

        {description.split("\n").map((text, i) => (
          <p className={i !== 0 ? "indent" : undefined} key={text}>
            {text}
          </p>
        ))}
        {activate && !activateTop && (
          <p className="indent">
            <strong>Aktivierung</strong>{" "}
            {actions !== "none" && (
              <div className={`pf-action ${actions}-action small-action`} />
            )}{" "}
            {activate.map(
              (item, idx) =>
                `${item}${idx !== activate?.length - 1 ? ", " : ""}`
            )}
            {frequency && (
              <>
                ; <strong>Häufigkeit</strong> {frequency}
              </>
            )}
            {trigger && (
              <>
                ; <strong>Auslöser</strong> {trigger}
              </>
            )}
            ; <strong>Effekt</strong> {effect}
          </p>
        )}
        {hasAffliction && affliction && (
          <>
            <p className="indent">
              <strong>Rettungswurf </strong>
              {`${affliction.savingThrow?.type
                ?.substring(0, 3)
                .toUpperCase()}, SG ${affliction.savingThrow?.dc}; `}
            </p>
            <p className="indent">
              <strong>Maximale Wirkungsdauer </strong> {affliction.maxDuration};
            </p>
            {affliction.phases?.map((phase, idx) => (
              <p className="indent" key={phase}>
                <strong>Phase {idx + 1}</strong> {phase};
              </p>
            ))}
          </>
        )}
        {traits.some((value) => value.toUpperCase() === "MUTAGEN") && benefit && (
          <p className="hang">
            <strong>Vorteil</strong> {benefit}
          </p>
        )}
        {traits.some((value) => value.toUpperCase() === "MUTAGEN") && drawback && (
          <p className="hang">
            <strong>Nachteil</strong> {drawback}
          </p>
        )}
        {critSuccess && (
          <p className="hang">
            <strong>Kritischer Erfolg</strong> {critSuccess}
          </p>
        )}
        {success && (
          <p className="hang">
            <strong>Erfolg</strong> {success}
          </p>
        )}
        {fail && (
          <p className="hang">
            <strong>Fehlschlag</strong> {fail}
          </p>
        )}
        {critFail && (
          <p className="hang">
            <strong>Kritischer Fehlschlag</strong> {critFail}
          </p>
        )}
        {special && (
          <p className="hang">
            <strong>Spezial</strong> {special}
          </p>
        )}
      </div>
    </div>
  </div>
);
