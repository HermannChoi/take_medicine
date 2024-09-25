import { css } from "@emotion/react";
import { colors, flexCenterX2, flexColumnCenterX2 } from "./commonSt";
import { emptyItemSectionAni, scaleYFadeIn, scaleYFadeOut } from "./keyframes";

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
      background-color: ${colors.grey}12;
    `,
  ],
  emptyItemSection: [
    flexCenterX2,
    css`
      width: 100%;
      height: 10rem;
      border: none;
      border-radius: 10px;
      background-color: ${colors.grey}12;
      color: ${colors.grey};
      transition: 0.2s;
      animation: ${emptyItemSectionAni} 2s ease-in-out alternate infinite;

      &:hover {
        background-color: ${colors.grey}24;
        color: ${colors.green};
      }
    `,
  ],
  listItemContainer: css`
    width: 100%;
  `,
  listItem: (itemId: string, selectedItemId: string | null) => {
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
      border-radius: ${itemId === selectedItemId ? `10px 10px 0 0` : `10px`};
      background-color: ${itemId === selectedItemId
        ? colors.green
        : colors.grey}12;
      transition: background-color 0.2s, border-radius 0.2s;
      cursor: pointer;

      &:hover {
        border-color: ${colors.green};
        background-color: ${colors.green}10;
      }
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
    background-color: ${colors.green}50;
    transition: 0.2s;

    &:hover {
      transform: scale(0.98);
      background-color: ${colors.green}40;
    }
  `,
  toggle2: (isTaken: boolean) => {
    return css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      padding: 3px;
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
