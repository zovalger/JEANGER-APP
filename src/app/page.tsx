"use client";

import { v4 as uuid } from "uuid";

import * as React from "react";
import Link from "next/link";

	interface Props {
		/**
		 * Injected by the documentation to work in an iframe.
		 * You won't need it on your project.
		 */
		// window?: () => Window;
	}

export default function Home(props: Props) {
	return <Link href={"/dashboard"}>dashboard</Link>;
}
