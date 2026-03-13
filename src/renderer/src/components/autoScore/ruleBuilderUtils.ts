import type { RuleGroupType, Field, Operator } from 'react-querybuilder'
import  {defaultOperators} from 'react-querybuilder'
import { fetchAllTags } from '../TagEditorDialog'

import type {  FullField, RuleType } from 'react-querybuilder';
import {  toFullOption } from 'react-querybuilder';
const tags = await fetchAllTags()

export interface AutoScoreTrigger {
  event: string
  value?: string
  relation?: 'AND' | 'OR'
}

export interface AutoScoreAction {
  event: string
  value?: string
  reason?: string
}

const musicalInstruments = fetchAllTags().then((tags) => tags.map((tag) => tag.name))

export interface AutoScoreRuleData {
  triggers: AutoScoreTrigger[]
  actions: AutoScoreAction[]
}

// Function to get fields with i18n support
export const getFields = (t: (key: string) => string): Field[] => [
  {
    name: 'interval_time_passed',
    label: t('autoScore.triggerIntervalTime'),
    placeholder: t('autoScore.intervalMinutesPlaceholder'),
    inputType: 'date',
    datatype: 'timestamp with time zone',
  },
  {
    name: 'student_has_tag',
    label: t('autoScore.triggerStudentTag'),
    placeholder: t('autoScore.tagNamesPlaceholder'),
    valueEditorType: 'multiselect',
    values: tags.map((tag) => tag.name),
    defaultValue: tags.length > 0 ? [tags[0].name] : [],
    operators: defaultOperators.filter((op) => op.name === '='),
  },
  {
    name: 'tourStops',
    label: 'Tour stops',
    
    matchModes: true,
    subproperties: [
      { name: 'date', label: 'Date', inputType: 'date', datatype: 'date' },
      { name: 'time', label: 'Time', inputType: 'time', datatype: 'time' },
    ],
  },
]

/* export const operators: Operator[] = [
  { name: '=', label: '=' },
  { name: 'contains', label: 'contains' },
  { name: 'between', label: 'between' }
] */

export const fields: FullField[] = (
  [
    {
      name: 'interval_time_passed',
      label: ('autoScore.triggerIntervalTime'),
      placeholder: ('autoScore.intervalMinutesPlaceholder')
    },
    {
      name: 'student_has_tag',
      label: ('autoScore.triggerStudentTag'),
      placeholder: ('autoScore.tagNamesPlaceholder'),
      valueEditorType: 'multiselect',
      values: tags.map((tag) => tag.name),
      defaultValue: 'more_cowbell',
      operators: defaultOperators.filter((op) => op.name === 'in'),
    }
  ] satisfies Field[]
).map((o) => toFullOption(o)); 

export const defaultQuery: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: 'interval_time_passed', operator: '=', value: '1440' }]
}

export function queryToAutoScoreRule(query: RuleGroupType): AutoScoreRuleData {
  const triggers: AutoScoreTrigger[] = []

  const processRuleGroup = (group: RuleGroupType, relation: 'AND' | 'OR' = 'AND') => {
    group.rules.forEach((rule, index) => {
      if ('rules' in rule) {
        processRuleGroup(rule, group.combinator === 'and' ? 'AND' : 'OR')
      } else {
        const trigger: AutoScoreTrigger = {
          event: rule.field,
          value: rule.value as string
        }

        if (index > 0) {
          trigger.relation = relation
        }

        triggers.push(trigger)
      }
    })
  }

  processRuleGroup(query)

  return {
    triggers,
    actions: []
  }
}

export function autoScoreRuleToQuery(ruleData: AutoScoreRuleData): RuleGroupType {
  const rules: any[] = []
  let currentCombinator: 'and' | 'or' = 'and'

  ruleData.triggers.forEach((trigger, index) => {
    if (index === 0) {
      currentCombinator = 'and'
    } else if (trigger.relation === 'OR') {
      currentCombinator = 'or'
    }

    rules.push({
      field: trigger.event,
      operator: '=',
      value: trigger.value || ''
    })
  })

  return {
    combinator: currentCombinator,
    rules: rules.length > 0 ? rules : defaultQuery.rules
  }
}

/* import type { Field, FullField, RuleType } from 'react-querybuilder';
import { defaultOperators, toFullOption } from 'react-querybuilder';
import { fetchAllTags } from '../TagEditorDialog'
const tags = await fetchAllTags()

export const fields: FullField[] = (
  [
    {
      name: 'interval_time_passed',
      label: ('autoScore.triggerIntervalTime'),
      placeholder: ('autoScore.intervalMinutesPlaceholder')
    },
    {
      name: 'student_has_tag',
      label: ('autoScore.triggerStudentTag'),
      placeholder: ('autoScore.tagNamesPlaceholder'),
      valueEditorType: 'multiselect',
      values: tags.map((tag) => tag.name),
      defaultValue: 'more_cowbell',
      operators: defaultOperators.filter((op) => op.name === 'in'),
    }
  ] satisfies Field[]
).map((o) => toFullOption(o)); */