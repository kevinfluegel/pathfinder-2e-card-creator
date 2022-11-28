import React, { ReactNode } from "react";
import showdown from "showdown";
import DOMPurify from "dompurify";
import { images, Images } from "./images";

export type Action = "none" | "one" | "two" | "three" | "reaction";

export interface CardProps {
  id: string;
  raw?: boolean;
  title: string;
  type: string;
  consumable?: boolean;
  traits: string[];
  lvl: string;
  description: string;
  usage?: string;
  rarity?: string;
  // item
  activate?: string[];
  activateTop?: boolean;
  // activate
  frequency?: string;
  effect?: string;
  // -- activate
  bulk?: string;
  price?: string;

  // -- waffen
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
  noBorder?: boolean;
  isPrint?: boolean;
}

const converter = new showdown.Converter();

export const Card = ({
  title,
  traits,
  type,
  description,
  lvl,
  requirements,
  actions = "none",
  rarity,
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
  noBorder = false,
  isPrint = false,
  raw,
}: CardProps) => {
  let str = description
    .replace(/^([\w]*) SG/gim, "**$1** SG")
    .replace(/^([\w ]*) \(/gim, "**$1** (")
    // Preis 4 GM
    // Schaden 1W8 H
    // Last 1
    // Hände 1
    // Gruppe Schwerter
    // Waffeneigenschaften Beidhändig W12
    .replace(
      /\n(Preis|Schaden|Last|Hände|Gruppe|Waffeneigenschaften|Entfernungseinheit|Nachladen|(?:Ungewöhnliche )?(?:Einfache )?(?:Nahkampf|Fernkampf|Spezial)(?:kriegs)?waffe)[\t\s+]/gm,
      "\n\n$1 "
    )
    .replace(
      /( |^)(RK Bonus|Kosten|Zugang|Härte TP|Domänenzauber|Kommunikation|Gottheiten|Vertiefter Domänenzauber||Secondary Casters|Secondary Checks|Ziel\(e\)|Archetyp|Voraussetzung|Voraussetzungen|Rüstungsspezialisierungseffekte|Kapazität|Speziell|Cast(?! \w+ Spell)|Malus \w+ Bewegungsrate|Rüstungsmalus|Stärke \d+|Gruppe|Domäne|Vorteil|Ausschalten|Beschreibung|Nachteil|Reichweite|Nachladen|Fertigkeiten|Ziele|Herstellungsvoraussetzungen|Scope and Influence|Ziele|Hauptquartier|Key Members|Allies|Enemies|Assets|Membership Requirements|Accepted Alignments|TP \(BT\)|Werte|Anathema|Verzögerung|Traditionen|verstärktes|\(\+\d\)|Dauer|Bereich|Talente|ST|GE|KO|IN|WE|CH|Gegenstände|Sprache|Sprachen|At Will|Nahkampf|Härte|Hände|Reichweite|Anhaltender Schaden|Schaden|Rettungswurf|Maximale Wirkungsdauer|Phase \d|Auslöser|Effekt|Anforderungen|Zaubertrick|Schwächen|Immunitäten|Resistenzen|Auslöser|Effekt|Anforderung|Häufigkeit|Nutzung|Typ|Munition|Stufe|Preis|Aktivierung|Waffeneigenschaften|Entfernungseinheit|(?:Ungewöhnliche )?(?:Einfache )?(?:Nahkampf|Fernkampf|Spezial)?(?:spezial)?(?:kriegs)?waffe|Zaubertrick|Komplexität|Rücksetzer|Ablauf|\d+[stndhr]{2}(?! Stufe)|\(\d+[stndhr]{2}\))( )/gm,
      "$1**$2**$3 "
    )
    .replace(/^ (\w)/gim, "&nbsp;&nbsp;&nbsp;&nbsp;$1")
    .replace(/^  (\w)/gim, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1")
    .replace(/\(x(\d)\)/g, "(&times;$1)")
    .replace(/\n(Bewegungsrate|TP|RK|Heimlichkeit|Wahrnehmung)/g, "\n**$1**")
    .replace(
      /\n(Kritischer Erfolg|Erfolg|Fehlschlag|Kritischer Fehlschlag)/gim,
      "\n**$1**"
    )
    .replace(/\s\/(\w+)/g, " $1")
    .replace(/, (TP)/, ", **$1**")
    .replace(
      /(REF|WIL|ZÄH|Willen|Zähigkeit|Reflex) *([+\-\d]+?)/gm,
      "**$1** $2"
    )
    .replace(/(Last)/, "**$1**")
    .replace(/^(Heimlichkeit|Wahrnehmung)/g, "**$1**")
    .replace(/\(\s*\)/g, "")
    .replace(/\((a|aa|aaa|r|f|1a|2a|3a)\)/gi, (m, p1) => {
      // return `<img class="text-img" src="${images[p1.toLowerCase()]}">`;
      return `<span class="pf-action ${p1.toLowerCase()}-action small-action"></span>`;
    })
    .replace(/:(a|aa|aaa|r|f|1a|2a|3a):/gi, (m, p1) => {
      // return `<img class="text-img" src="${images[p1.toLowerCase()]}">`;
      return `<span class="pf-action ${p1.toLowerCase()}-action small-action"></span>`;
    })
    .replace(/\[(a|aa|aaa|r|f|1a|2a|3a)\]/gi, (m, p1) => {
      // return `<img class="text-img" src="${images[p1.toLowerCase()]}">`;
      return `<span class="pf-action ${p1.toLowerCase()}-action small-action"></span>`;
    })
    .replace(/^-+$/gim, '<div class="sub-line" ></div>')
    .replace(/[\u2014\u2013]/g, "-") // emdash
    .replace(/[\u2022]/g, "*") // bullet
    .replace(/[\u2018\u2019]/g, "'") // smart single quotes
    .replace(/[\u201C\u201D]/g, '"'); // smart double quotes
  str = converter.makeHtml(DOMPurify.sanitize(str));
  str = str
    .replace(/<\/div><br>/g, "</div>")
    .replace(/<br \/>\n/gim, "</p><p>")
    .replace(
      /<p><strong>(Rettungswurf|Vorteil|Nachteil)/gim,
      '<p class="indent"><strong>$1'
    )
    .replace(/<p>\.\./g, '<p class="indent">')
    .replace(
      /<p><strong>(Kritischer Erfolg|Erfolg|Fehlschlag|Kritischer Fehlschlag)/gim,
      '<p class="pad"><strong>$1'
    )
    .replace(/<p><strong>/gim, '<p class="hang"><strong>')
    .replace(/ \+/gim, "&nbsp;+");
  return (
    <div className={`bg-pf print-card ${noBorder ? "no-border" : undefined}`}>
      <div id="result" className="text-pf">
        <div className="d-flex pf-title-row">
          <div className="pf-trait-title">
            <h1>{title}</h1>
            {type === "Talent" && actions !== "none" && (
              <span className={`pf-action-container`}>
                <span className={`pf-action ${actions}-action small-action`} />
              </span>
            )}
          </div>
          <h1 className="ml-auto pf-type-box">
            {type} {lvl}
          </h1>
        </div>
        <div className="sub-line" />

        <div className="pf-traits">
          {rarity !== "Gewöhnlich" ?? (
            <div className={`pf-trait-border`}>
              <p
                className={`pf-trait ${
                  rarity === "Selten" ?? "pf-trait-rare"
                } ${rarity === "Ungewöhnlich" ?? "pf-trait-uncommon"}`}
              >
                {rarity}
              </p>
            </div>
          )}
          {traits.map((trait) => (
            <div className={`pf-trait-border`} key={trait}>
              <p className={`pf-trait`}>{trait}</p>
            </div>
          ))}
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
              <span className={`pf-action-container`}>
                <span className={`pf-action ${actions}-action small-action`} />
              </span>
            )}
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
          </p>
        )}

        {!raw && <div className="sub-line" />}
        <div
          className="text-pf"
          style={{
            fontSize:
              fontSize &&
              (isPrint ? `${Number(fontSize) * 3}pt` : `${fontSize}pt`),
          }}
        >
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

          {
            /* {description.split("\n").map((text, i) => (
          <p className={i !== 0 ? "indent" : undefined} key={text}>
            {text}
          </p>
        ))} */

            <div dangerouslySetInnerHTML={{ __html: str }} />
          }
          {activate && !activateTop && (
            <p className="indent">
              <strong>Aktivierung</strong>{" "}
              {actions !== "none" && (
                <span className={`pf-action ${actions}-action1 small-action`} />
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
                <strong>Maximale Wirkungsdauer </strong>{" "}
                {affliction.maxDuration};
              </p>
              {affliction.phases?.map((phase, idx) => (
                <p className="indent" key={phase}>
                  <strong>Phase {idx + 1}</strong> {phase};
                </p>
              ))}
            </>
          )}
          {traits.some((value) => value.toUpperCase() === "MUTAGEN") &&
            benefit && (
              <p className="hang">
                <strong>Vorteil</strong> {benefit}
              </p>
            )}
          {traits.some((value) => value.toUpperCase() === "MUTAGEN") &&
            drawback && (
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
              <strong>Spezielll</strong> {special}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
