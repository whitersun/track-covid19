import { skullOutline, heartOutline, alertOutline, manOutline, documentOutline } from "ionicons/icons";
import { computed, ref } from "@vue/runtime-core";

import { ReturnValue } from './DataReturn'

export const TotalData = () => {

  const { store, info, confirmed, critical, deaths, recovered, TodayNewCase, TodayNewDeath, TodayNewRecovered, } = ReturnValue()

  const UserInCurrent = computed(() => store.state.Region.UserInCurrent);

  const lastUpdated = computed(() => {
    let _lastUpdated = info.value.lastUpdate !== undefined;

    const UserInCurrentLanguage = UserInCurrent.value.languages;
    const UserInCurrentLocales = UserInCurrentLanguage ? UserInCurrentLanguage.split(",")[0] : undefined;

    const Condition_1 = info.value.lastUpdate ? new Date(info.value.lastUpdate).toLocaleDateString() : "Loading...";
    const Condition_2 = new Date().toLocaleDateString(UserInCurrentLocales);

    return _lastUpdated ? Condition_1 : Condition_2;
  })


  const structure = ref([
    {
      id: 1,
      subtitle: "Confirmed",
      icon: manOutline,
      number: confirmed,
    },
    {
      id: 2,
      subtitle: "Critical",
      icon: alertOutline,
      number: critical,
      color: 'warning'
    },
    {
      id: 3,
      subtitle: "Deaths",
      icon: skullOutline,
      number: deaths,
      color: 'danger'
    },
    {
      id: 4,
      subtitle: "Recovered",
      icon: heartOutline,
      number: recovered,
      color: 'success'
    },
  ]);

  const TodayStructure = ref([
    {
      id: 1,
      subtitle: "New Cases",
      icon: documentOutline,
      number: TodayNewCase,
      color: 'primary'
    },
    {
      id: 2,
      subtitle: "New Deaths",
      icon: skullOutline,
      number: TodayNewDeath,
      color: 'danger'
    },
    {
      id: 3,
      subtitle: "New Recovered",
      icon: skullOutline,
      number: TodayNewRecovered,
      color: 'success'
    },
  ])

  return { 
    info, 
    deaths, 
    critical, 
    confirmed, 
    recovered,
    structure, 
    lastUpdated,
    TodayStructure
  }

}
