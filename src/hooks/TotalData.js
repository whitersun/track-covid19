import { skullOutline, heartOutline, alertOutline, manOutline } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";

export const TotalData = () => {
  const store = useStore();

  const info = computed(() => {
    const _info = store.state.Region.TotalReports;
    return _info ? _info : "";
  });

  const lastUpdated = computed(() => {
    return info.value.lastUpdate ? new Date(info.value.lastUpdate).toLocaleDateString() : "Loading...";
  })

  // TODO: confirmed
  const confirmed = computed(() => {
    let confirmedInfo = new Intl.NumberFormat().format(info.value.confirmed);

    return confirmedInfo.toString();
  });

  // TODO: critical
  const critical = computed(() => {
    let criticalInfo = new Intl.NumberFormat().format(info.value.critical);

    return criticalInfo.toString();
  });

  // TODO: deaths
  const deaths = computed(() => {
    let deathsInfo = new Intl.NumberFormat().format(info.value.deaths);

    return deathsInfo.toString();
  });

  // TODO: recovered
  const recovered = computed(() => {
    let recoveredInfo = new Intl.NumberFormat().format(info.value.recovered);
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
