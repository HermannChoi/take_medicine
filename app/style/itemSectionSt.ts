import { css } from "@emotion/react";
import { colors, flexCenterX2, flexColumnCenterX2 } from "./commonSt";
import { emptyItemSectionAni, scaleYFadeIn, scaleYFadeOut } from "./keyframes";
import { itemProps } from "../types/types";

export const itemSectionSt = {
  sectionContainer: [
    flexColumnCenterX2,
    css`
      row-gap: 5px;
      width: 100%;
    `,
  ],
  section: [
    flexColumnCenterX2,
    css`
      row-gap: 5px;
      width: 100%;
      padding: 5px;
      border: none;
      border-radius: 10px;
      background-color: ${colors.grey}15;
    `,
  ],
  emptyItemSection: [
    flexCenterX2,
    css`
      width: 100%;
      height: 10rem;
      border: none;
      border-radius: 10px;
      background-color: ${colors.grey}15;
      color: ${colors.grey};
      transition: 0.2s;
      animation: ${emptyItemSectionAni} 2s ease-in-out alternate infinite;

      &:hover {
        background-color: ${colors.grey}20;
        color: ${colors.green};
      }
    `,
  ],
  listItemContainer: css`
    width: 100%;
  `,
  listItem: (item: itemProps, selectedItemId: string | null) => {
    return css`
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: fit-content;
      min-height: 60px;
      padding: 5px 10px;
      border: none;
      border-radius: ${item.id === selectedItemId || item.date === "0000-00-00"
        ? `10px 10px 0 0`
        : `10px`};
      background-color: ${colors.grey}${item.id === selectedItemId ? "30" : "15"};
      transition: background-color 0.2s, border-radius 0.2s;
      cursor: pointer;
    `;
  },
  toggle: (isTaken: boolean) => {
    return css`
      display: flex;
      justify-content: ${isTaken ? `flex-end` : `flex-start`};
      align-items: center;
      width: 60px;
      height: 30px;
      padding: 3px;
      border: 2px solid ${isTaken ? colors.grey : colors.red};
      border-radius: 30px;
      background-color: ${isTaken ? `${colors.green}` : `#90909099`};
      cursor: pointer;
    `;
  },
  handle: css`
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 24px;
  `,
  name: css`
    flex: 1;
  `,
  optionContainer: (
    itemId: string,
    selectedItemId: string | null,
    itemDate: string
  ) => {
    return [
      css`
        transform-origin: top;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        padding: 5px 10px 5px;
        border-radius: 0 0 10px 10px;
        background-color: ${colors.grey}30;
        overflow: hidden;
        animation: ${itemId === selectedItemId
            ? scaleYFadeIn
            : itemDate !== "0000-00-00" && scaleYFadeOut}
          0.2s forwards;
      `,
    ];
  },
  optionBtnContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: fit-content;
    height: 100%;
  `,
  optionBtn: css`
    height: 40px;
    padding: 5px 10px;
    border: none;
    border-radius: 10px;
    background-color: ${colors.green}80;
    transition: 0.2s;

    &:hover {
      transform: scale(0.98);
      background-color: ${colors.green}60;
    }
  `,
  toggle2: (isTaken: boolean) => {
    return css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      height: 40px;
      padding: 5px 10px;
      border-radius: 10px;
      background-color: ${isTaken ? `${colors.green}50` : `#90909050`};
      cursor: pointer;
    `;
  },
  delBtn: [
    flexCenterX2,
    css`
      height: 40px;
      padding: 0 5px;
      border: none;
      border-radius: 10px;
      background-color: ${colors.red}60;
      color: ${colors.red};
      transition: 0.2s;

      &:hover {
        transform: scale(0.98);
        background-color: ${colors.red}50;
      }
    `,
  ],
};
