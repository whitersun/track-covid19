import { skullOutline, heartOutline, alertOutline, manOutline } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";

export const TotalData = () => {
  const store = useStore();

  const info = computed(() => {
    const _info = store.state.Region.TotalReports;
    return _info ? _info : "";
  });

  const UserInCurrent = computed(() => store.state.Region.UserInCurrent);

  const lastUpdated = computed(() => {
    let _lastUpdated = info.value.lastUpdate !== undefined;

    const UserInCurrentLanguage = UserInCurrent.value.languages;
    const UserInCurrentLocales = UserInCurrentLanguage ? UserInCurrentLanguage.split(",")[0] : undefined;

    const Condition_1 = info.value.lastUpdate ? new Date(info.value.lastUpdate).toLocaleDateString() : "Loading...";
    const Condition_2 = new Date().toLocaleDateString(UserInCurrentLocales);

    return _lastUpdated ? Condition_1 : Condition_2;
  })

  // TODO: confirmed
  const confirmed = computed(() => {
    let confirmedInfo = new Intl.NumberFormat().format(info.value.TotalCases);

    return confirmedInfo.toString();
  });

  // TODO: critical
  const critical = computed(() => {
    let criticalInfo = new Intl.NumberFormat().format(info.value.TotCases_1M_Pop);

    return criticalInfo.toString();
  });

  // TODO: deaths
  const deaths = computed(() => {
    let deathsInfo = new Intl.NumberFormat().format(info.value.TotalDeaths);

    return deathsInfo.toString();
  });

  // TODO: recovered
  const recovered = computed(() => {
    let recoveredInfo = new Intl.NumberFormat().format(info.value.TotalRecovered);
    return recoveredInfo.toString();
  });

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
    },
    {
      id: 3,
      subtitle: "Deaths",
      icon: skullOutline,
      number: deaths,
    },
    {
      id: 4,
      subtitle: "Recovered",
      icon: heartOutline,
      number: recovered,
    },
  ]);

  return { 
    info, 
    deaths, 
    critical, 
    confirmed, 
    recovered,
    structure, 
    lastUpdated,
  }

}
