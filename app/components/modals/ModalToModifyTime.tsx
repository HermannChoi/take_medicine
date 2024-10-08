"use client";
/** @jsxImportSource @emotion/react */

import React from "react";
import useModalStore from "@/app/store/useModalStore";
import { modalSt } from "@/app/style/modalSt";
import useItemStore from "@/app/store/homePage/useItemStore";
import useSettingStore from "@/app/store/useSettingStore";
import useFormStore from "@/app/store/homePage/useFormStore";
import { clickModifyItem } from "@/app/hooks/clickModifyItem";

const ModalToModifyTime = () => {
  const { setList } = useFormStore();
  const {
    whichModal,
    setWhichModal,
    itemForModal,
    setItemForModal,
    resetItemForModal,
  } = useModalStore();
  const { setSelectedItemId } = useItemStore();
  const { isEnglish } = useSettingStore();

  const hoursMin = 0;
  const hoursMax = 23;
  const minutesMin = 0;
  const minutesMax = 59;

  const clickModifyOnModal = () => {
    setWhichModal(null);
    clickModifyItem(itemForModal, setList);
    resetItemForModal();
    setSelectedItemId(null);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) e.target.value = e.target.value.substring(1);

    if (Number(e.target.value) < hoursMin) e.target.value = hoursMin.toString();
    else if (Number(e.target.value) > hoursMax)
      e.target.value = hoursMax.toString();
    setItemForModal({
      ...itemForModal,
      hours: Number(e.target.value),
    });
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) e.target.value = e.target.value.substring(1);

    if (Number(e.target.value) < minutesMin)
      e.target.value = minutesMin.toString();
    else if (Number(e.target.value) > minutesMax)
      e.target.value = minutesMax.toString();
    setItemForModal({
      ...itemForModal,
      minutes: Number(e.target.value),
    });
  };

  return (
    <div
      onClick={() => setWhichModal(null)}
      css={modalSt.background(whichModal, "modifyTime")}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        css={modalSt.container}
      >
        <div css={modalSt.textContainer}>
          <p css={modalSt.text}>
            {isEnglish
              ? `Modify the last time you took`
              : `마지막으로 복용(사용)한 시간`}
          </p>
          <input
            name="modifyHours"
            min={hoursMin}
            max={hoursMax}
            type="number"
            css={modalSt.timeInput}
            value={itemForModal.hours}
            onChange={(e) => handleHoursChange(e)}
          />
          <span> : </span>
          <input
            name="modifyMinutes"
            min={minutesMin}
            max={minutesMax}
            type="number"
            css={modalSt.timeInput}
            value={itemForModal.minutes}
            onChange={(e) => handleMinutesChange(e)}
          />
        </div>
        <div css={modalSt.btnContainer}>
          <button onClick={() => clickModifyOnModal()} css={modalSt.delBtn}>
            {isEnglish ? `Modify` : `수정`}
          </button>
          <button onClick={() => setWhichModal(null)} css={modalSt.cancelBtn}>
            {isEnglish ? `CANCEL` : `취소`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalToModifyTime;
