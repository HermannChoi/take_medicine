/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/** @jsxImportSource @emotion/react */

import { motion } from "framer-motion";
import useFormStore from "../store/useFormStore";
import { itemProps, listProps } from "../types/types";
import { toggleIsTaken } from "../hooks/toggleIsTaken";
import { SyntheticEvent, useEffect, useState } from "react";
import useDateStore from "../store/useDateStore";
import { getTotalListLength } from "../utils/getToTalListLength";
import { itemSectionSt } from "../style/itemSectionSt";
import { outlineSt } from "../style/outlineSt";
import { vibrate } from "../utils/vibrate";
import useModalStore from "../store/useModalStore";

const ItemSection = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { list, setList, focusInput } = useFormStore();
  const { isDateChanged, isInitialLoad, setIsInitialLoad } = useDateStore();
  const { setWhichModal, setItemInfoToDelete } = useModalStore();

  const clickItem = (itemId: string) => {
    if (selectedItemId === itemId) return setSelectedItemId(null);
    setSelectedItemId(itemId);
  };

  const clickToggle = (
    e: SyntheticEvent,
    timePeriod: keyof listProps,
    item: itemProps
  ) => {
    e.stopPropagation();
    toggleIsTaken({
      timePeriod: timePeriod as keyof listProps,
      id: item.id,
      setList,
    });
    vibrate(100);
  };

  const clickDeleteBtn = (
    e: SyntheticEvent,
    id: string,
    name: string,
    timePeriod: keyof listProps
  ) => {
    e.stopPropagation();
    setWhichModal("deleteItem");
    setItemInfoToDelete({ id, name, timePeriod });
  };

  useEffect(() => {
    if (isDateChanged) {
      for (const time in list) {
        setList((prev) => ({
          ...prev,
          [time]: prev[time as keyof listProps].map((item) => {
            return item.isTaken ? { ...item, isTaken: false } : item;
          }),
        }));
      }
    }
  }, [isDateChanged]);

  useEffect(() => {
    (!isInitialLoad || isDateChanged) &&
      localStorage.setItem("medList", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const storedList = localStorage.getItem("medList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }

    setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
  }, []);

  return (
    <div css={itemSectionSt.sectionContainer}>
      {getTotalListLength(list) > 0 ? (
        <>
          {Object.keys(list).map(
            (timePeriod) =>
              list[timePeriod as keyof listProps].length > 0 && (
                <section key={timePeriod} css={itemSectionSt.section}>
                  {list[timePeriod as keyof listProps].length > 0 && (
                    <h2 css={outlineSt.h2}>{timePeriod}</h2>
                  )}
                  {list[timePeriod as keyof listProps].map((item, i) => {
                    return (
                      <>
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 60 }}
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 20,
                          }}
                          onClick={() => clickItem(item.id)}
                          css={itemSectionSt.listItem(item.id, selectedItemId)}
                        >
                          <div
                            onClick={(e) =>
                              clickToggle(
                                e,
                                timePeriod as keyof listProps,
                                item
                              )
                            }
                            css={itemSectionSt.toggle(item.isTaken)}
                          >
                            <motion.div
                              css={itemSectionSt.handle}
                              layout
                              transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 20,
                              }}
                            />
                          </div>
                          <p>{item.date}</p>
                          <p css={itemSectionSt.name}>{item.name}</p>
                          <p>{item.time}</p>
                          <button
                            onClick={(e) =>
                              clickDeleteBtn(
                                e,
                                item.id,
                                item.name,
                                timePeriod as keyof listProps
                              )
                            }
                            css={itemSectionSt.delBtn}
                          >
                            D
                          </button>
                        </motion.div>
                        <div
                          css={itemSectionSt.optionContainer(
                            item.id,
                            selectedItemId
                          )}
                        >
                          <button css={itemSectionSt.optionBtn}>
                            modify date : coming soon
                          </button>
                          <button css={itemSectionSt.optionBtn}>
                            modify time
                          </button>
                          {/* <input type="" /> */}
                        </div>
                      </>
                    );
                  })}
                </section>
              )
          )}
        </>
      ) : (
        <button
          onClick={() => focusInput()}
          css={itemSectionSt.emptyItemSection}
        >
          Add your medicine!
        </button>
      )}
    </div>
  );
};

export default ItemSection;
