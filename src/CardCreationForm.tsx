import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { ReactNode, useEffect, useReducer, useRef } from "react";
import { Action, Card, CardProps } from "./Card";
import { MultipleInput } from "./MultipleInput";
import { TextArea } from "./TextArea";
import { Checkbox } from "./Checkbox";

const ActionOption = (actions: String): ReactNode => {
  return (
    <div className="flex mr-8">
      <span className={`pf-action-container`}>
        <span className={`pf-action ${actions}-action small-action`}></span>
      </span>
      {actions}
    </div>
  );
};

interface CardCreationFormProps {
  onSubmit: (card: CardProps) => void;
  overwriteState?: CardProps | null;
  isEditing?: boolean;
}

export default function CardCreationForm({
  onSubmit,
  overwriteState = null,
  isEditing,
}: CardCreationFormProps) {
  const prevOverwriteState = useRef<CardProps | null>(null);
  const [state, dispatch] = useReducer(
    (prevState: CardProps, newState: Partial<CardProps>) => {
      if (newState === prevState) return prevState;
      return { ...prevState, ...newState };
    },
    {
      id: "0",
      title: "",
      traits: [],
      lvl: "",
      actions: "none",
      description: "",
      type: "",
      hasAffliction: false,
      affliction: {
        savingThrow: {
          type: "Zähigkeit",
        },
      },
    }
  );

  useEffect(() => {
    if (overwriteState === prevOverwriteState.current || !overwriteState)
      return;
    prevOverwriteState.current = overwriteState;
    dispatch(overwriteState);
  }, [overwriteState]);

  return (
    <>
      <div className="mt-10">
        <h1 className="px-4 py-5 grow-1">
          {overwriteState && isEditing ? "Bearbeiten" : "Erstellen"}
        </h1>
        <div className="md:grid md:grid-cols-3 md:gap-3">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-3">
                    <TextInput
                      colSpan={4}
                      label="Titel"
                      name="title"
                      onChange={(title) => {
                        dispatch({ title });
                      }}
                      value={state.title}
                    />
                    <Checkbox
                      name="isRaw"
                      label="Raw"
                      value={!!state.raw}
                      onChange={(raw) => {
                        dispatch({ raw });
                      }}
                    />
                    <SelectInput
                      colSpan={2}
                      label="Type"
                      onChange={(type) => {
                        dispatch({ type });
                      }}
                      value={state.type}
                      options={["Gegenstand", "Talent", "Zauber", "Zaubertrick", "Fokus", "Rune", "Vorrichtung"]}
                      renderItem={(item) => item}
                    />
                    <TextInput
                      colSpan={1}
                      label="Level"
                      name="lvl"
                      onChange={(lvl) => {
                        dispatch({ lvl });
                      }}
                      value={state.lvl}
                    />
                    <MultipleInput
                      colSpan={2}
                      label="Merkmale"
                      name="traits"
                      onChange={(traits) => {
                        dispatch({ traits });
                      }}
                      asTags={true}
                      value={state.traits}
                    />
                    <SelectInput
                      colSpan={1}
                      label="Seltenheit"
                      options={["Selten", "Ungewöhnlich", "Gewöhnlich"]}
                      onChange={(rarity) => {
                        dispatch({
                          rarity,
                        });
                      }}
                      value={state.rarity || "Gewöhnlich"}
                      renderItem={(item) => item}
                    />
                    {state.type === "Gegenstand" && (
                      <div className="border rounded-md col-span-6 grid grid-cols-6 gap-3 p-2">
                        <Checkbox
                          name="isConsumable"
                          label="konsumierbar"
                          value={!!state.consumable}
                          onChange={(consumable) => {
                            const traits = [
                              ...state.traits.filter(
                                (trait) => trait !== "VERBRAUCHSGEGENSTAND"
                              ),
                            ];
                            if (consumable) traits.push("VERBRAUCHSGEGENSTAND");
                            dispatch({ traits, consumable });
                          }}
                        />
                        <TextInput
                          colSpan={1}
                          label="Nutzung"
                          name="usage"
                          onChange={(usage) => {
                            dispatch({ usage });
                          }}
                          value={state.usage || ""}
                        />
                        <TextInput
                          colSpan={1}
                          label="Last"
                          name="bulk"
                          onChange={(bulk) => {
                            dispatch({ bulk });
                          }}
                          value={state.bulk || ""}
                        />
                        <TextInput
                          colSpan={1}
                          label="Preis"
                          name="price"
                          onChange={(price) => {
                            dispatch({ price });
                          }}
                          value={state.price || ""}
                        />
                        <MultipleInput
                          colSpan={2}
                          label="Aktivierung"
                          name="activate"
                          onChange={(activate) => {
                            dispatch({ activate });
                          }}
                          value={state.activate || []}
                        />
                        <Checkbox
                          name="activate-in-header"
                          value={!!state.activateTop}
                          label="im Header"
                          onChange={(activateTop) => {
                            dispatch({ activateTop });
                          }}
                        />
                        {!!state.activate && (
                          <>
                            <TextInput
                              colSpan={1}
                              label="Häufigkeit"
                              name="frequency"
                              onChange={(frequency) => {
                                dispatch({ frequency });
                              }}
                              value={state.frequency || ""}
                            />
                            <TextInput
                              colSpan={1}
                              label="Effekt"
                              name="effect"
                              onChange={(effect) => {
                                dispatch({ effect });
                              }}
                              value={state.effect || ""}
                            />
                            <Checkbox
                              name="affliction"
                              value={state.hasAffliction}
                              label="Leiden"
                              onChange={(hasAffliction) => {
                                dispatch({ hasAffliction });
                              }}
                            />
                            {state.hasAffliction && (
                              <>
                                <TextInput
                                  colSpan={1}
                                  label="Schwierigkeitsgrad"
                                  name="dc"
                                  onChange={(dc) => {
                                    dispatch({
                                      affliction: {
                                        ...state.affliction?.savingThrow,
                                        savingThrow: {
                                          dc: dc,
                                        },
                                      },
                                    });
                                  }}
                                  value={
                                    state.affliction?.savingThrow?.dc || ""
                                  }
                                />
                                <SelectInput
                                  colSpan={2}
                                  label="Type"
                                  onChange={(type) => {
                                    dispatch({
                                      affliction: {
                                        ...state.affliction,
                                        savingThrow: {
                                          ...state.affliction?.savingThrow,
                                          type,
                                        },
                                      },
                                    });
                                  }}
                                  value={
                                    state.affliction?.savingThrow?.type ||
                                    "Zähigkeit"
                                  }
                                  options={["Reflex", "Wille", "Zähigkeit"]}
                                  renderItem={(item) => item}
                                />
                                <TextInput
                                  colSpan={1}
                                  label="Verzögerung"
                                  name="onset"
                                  onChange={(onset) => {
                                    dispatch({
                                      affliction: {
                                        ...state.affliction,
                                        onset,
                                      },
                                    });
                                  }}
                                  value={state.affliction?.onset || ""}
                                />
                                <TextInput
                                  colSpan={1}
                                  label="Maximale Wirkungsdauer"
                                  name="maxDuration"
                                  onChange={(maxDuration) => {
                                    dispatch({
                                      affliction: {
                                        ...state.affliction,
                                        maxDuration,
                                      },
                                    });
                                  }}
                                  value={state.affliction?.maxDuration || ""}
                                />
                                <MultipleInput
                                  colSpan={2}
                                  label="Phasen"
                                  name="phases"
                                  split=";"
                                  onChange={(phases) => {
                                    dispatch({
                                      affliction: {
                                        ...state.affliction,
                                        phases,
                                      },
                                    });
                                  }}
                                  value={state.activate || []}
                                />
                              </>
                            )}
                            {state.traits.some(
                              (value) => value.toUpperCase() === "MUTAGEN"
                            ) && (
                              <>
                                <TextInput
                                  colSpan={1}
                                  label="Vorteil"
                                  name="benefit"
                                  onChange={(benefit) => {
                                    dispatch({
                                      benefit,
                                    });
                                  }}
                                  value={state.benefit || ""}
                                />
                                <TextInput
                                  colSpan={1}
                                  label="Nachteil"
                                  name="drawback"
                                  onChange={(drawback) => {
                                    dispatch({
                                      drawback,
                                    });
                                  }}
                                  value={state.drawback || ""}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {((state.type === "Talent" || state.type === "Zauber" || state.type === "Zaubertrick") ||
                      (state.type === "Gegenstand" && !!state.activate)) && (
                      <>
                        <SelectInput
                          colSpan={1}
                          label="Aktionen"
                          options={["none", "one", "two", "three", "reaction"]}
                          onChange={(actions) => {
                            dispatch({
                              actions: actions as Action,
                            });
                          }}
                          value={state.actions}
                          renderItem={ActionOption}
                        />
                        <TextInput
                          colSpan={4}
                          label="Bedingungen"
                          name="requirements"
                          onChange={(requirements) => {
                            dispatch({ requirements });
                          }}
                          value={state.requirements || ""}
                        />
                        <TextInput
                          colSpan={4}
                          label="Auslöser"
                          name="trigger"
                          onChange={(trigger) => {
                            dispatch({ trigger });
                          }}
                          value={state.trigger || ""}
                        />
                      </>
                    )}
                    <TextArea
                      colSpan={4}
                      label="Beschreibung"
                      name="description"
                      onChange={(description) => {
                        dispatch({ description });
                      }}
                      value={state.description || ""}
                    />
                    {/*
                    Saving Throw DC 36 Fortitude; Maximum Duration 6 rounds;
                      Stage 1 9d6 poison damage (1 round); Stage 2 12d6 poison
                      damage (1 round); Stage 3 15d6 poison damage (1 round)*/}

                    {(state.type === "Talent" ||
                      (state.type === "Gegenstand" && !!state.activate)) && (
                      <>
                        <TextInput
                          colSpan={4}
                          label="Kritischer Erfolg"
                          name="critSuccess"
                          onChange={(critSuccess) => {
                            dispatch({ critSuccess });
                          }}
                          value={state.critSuccess || ""}
                        />
                        <TextInput
                          colSpan={4}
                          label="Erfolg"
                          name="success"
                          onChange={(success) => {
                            dispatch({ success });
                          }}
                          value={state.success || ""}
                        />
                        <TextInput
                          colSpan={4}
                          label="Fehlschlag"
                          name="failure"
                          onChange={(fail) => {
                            dispatch({ fail });
                          }}
                          value={state.fail || ""}
                        />
                        <TextInput
                          colSpan={4}
                          label="Kritischer Fehlschlag"
                          name="critFailure"
                          onChange={(critFail) => {
                            dispatch({ critFail });
                          }}
                          value={state.critFail || ""}
                        />
                      </>
                    )}
                    <TextInput
                      colSpan={4}
                      label="Spezial"
                      name="special"
                      onChange={(special) => {
                        dispatch({ special });
                      }}
                      value={state.special || ""}
                    />
                    <TextInput
                      colSpan={4}
                      label="Schriftgröße (default 8pt)"
                      name="fontSize"
                      onChange={(fontSize) => {
                        dispatch({ fontSize });
                      }}
                      value={state.fontSize || ""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="md:col-span-1">
            <Card {...state} />
            <div className="py-3">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => onSubmit(state)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
