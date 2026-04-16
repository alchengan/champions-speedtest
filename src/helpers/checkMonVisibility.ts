export function FindPokemonInList(): number {
  const userMonOnList = document.getElementsByClassName("user-mon")?.item(0);
  const speedList = document.getElementById("speed-list");
  if (userMonOnList && speedList) {
    var userMonRect = userMonOnList.getBoundingClientRect();
    var listRect = speedList.getBoundingClientRect();

    if (userMonRect.top < listRect.top) {
      return 1;
    }

    if (userMonRect.bottom > listRect.bottom) {
      return -1;
    }
  }

  return 0;
}
