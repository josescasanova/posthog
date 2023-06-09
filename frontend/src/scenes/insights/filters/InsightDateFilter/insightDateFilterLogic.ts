import { kea, props, key, path, connect, actions, selectors, listeners } from 'kea'
import type { insightDateFilterLogicType } from './insightDateFilterLogicType'
import { InsightLogicProps } from '~/types'
import { insightLogic } from 'scenes/insights/insightLogic'
import { keyForInsightLogicProps } from 'scenes/insights/sharedUtils'
import { insightVizDataLogic } from 'scenes/insights/insightVizDataLogic'

export const insightDateFilterLogic = kea<insightDateFilterLogicType>([
    props({} as InsightLogicProps),
    key(keyForInsightLogicProps('new')),
    path((key) => ['scenes', 'insights', 'InsightDateFilter', 'insightDateFilterLogic', key]),
    connect((props: InsightLogicProps) => ({
        actions: [insightLogic(props), ['setFilters'], insightVizDataLogic(props), ['updateQuerySource']],
        values: [insightLogic(props), ['filters']],
    })),
    actions(() => ({
        setDates: (dateFrom: string | undefined | null, dateTo: string | undefined | null) => ({
            dateFrom,
            dateTo,
        }),
    })),
    selectors({
        dates: [
            (s) => [s.filters],
            (filters) => ({ dateFrom: filters?.date_from || null, dateTo: filters?.date_to || null }),
        ],
    }),
    listeners(({ actions, values }) => ({
        setDates: ({ dateFrom, dateTo }) => {
            actions.setFilters({
                ...values.filters,
                date_from: dateFrom || null,
                date_to: dateTo || null,
            })
            actions.updateQuerySource({
                dateRange: {
                    date_from: dateFrom || null,
                    date_to: dateTo || null,
                },
            })
        },
    })),
])
