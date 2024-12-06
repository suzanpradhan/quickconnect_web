
"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";

export default function MemberList() {
  const dispatch = useAppDispatch();
  const [chatId, setchatId] = useState<string | null>(null);



  return <div>

  </div>;
}
