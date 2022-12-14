export function classActive($element, bool = null) {
	classToggle("is-active", $element, bool);
}

export function classHidden($etiqueta, bool = null) {
	classToggle("hidden", $etiqueta, bool);
}

function classToggle(claseTag, $etiqueta, bool = null) {
	if (bool == true ) return $etiqueta.classList.add(claseTag);

	if (bool == false) return $etiqueta.classList.remove(claseTag);

	return $etiqueta.classList.toggle(claseTag);
}
