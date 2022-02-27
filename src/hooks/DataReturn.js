import { computed } from 'vue'
import { useStore } from 'vuex'

export const ReturnValue = () => {

    const store = useStore();

    const info = computed(() => {
        const _info = store.state.Region.TotalReports;
        return _info ? _info : "";
    });


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

    const TodayNewCase = computed(() => {
        let NewCasesInfo = new Intl.NumberFormat().format(info.value.NewCases);
        return NewCasesInfo.toString();
    });

    const TodayNewDeath = computed(() => {
        let NewDeathsInfo = new Intl.NumberFormat().format(info.value.NewDeaths);
        return NewDeathsInfo.toString();
    });

    const TodayNewRecovered = computed(() => {
        let NewRecoveredInfo = new Intl.NumberFormat().format(info.value.NewRecovered);
        return NewRecoveredInfo.toString();
    });

    return {
        info,
        store,
        deaths,
        critical,
        confirmed,
        recovered,
        TodayNewCase,
        TodayNewDeath,
        TodayNewRecovered,
    }
}