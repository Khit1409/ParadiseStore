"use client";

import { leftMenu, rightMenu } from "@/utils/globalList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function HeaderTop() {
  return (
    <div>
      {/* link navbar */}
      <div className="flex items-center justify-between px-2">
        {/* menu firts */}
        <ul className="flex gap-3">
          <span className="font-semibold">Download App: </span>
          {leftMenu.map((menu) => (
            <li key={menu.id}>
              <a href={menu.url}>
                <FontAwesomeIcon icon={menu.icon} className="text-black" />
              </a>
            </li>
          ))}
        </ul>
        {/* menu second */}
        <ul className="flex gap-3">
          <span className="font-semibold">Follow Us:</span>
          {rightMenu.map((menur) => (
            <li key={menur.id}>
              <a href={menur.url}>
                <FontAwesomeIcon icon={menur.icon} className="text-black" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
