import type { RuleGroupType, Field, Operator } from 'react-querybuilder'

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

export interface AutoScoreRuleData {
  triggers: AutoScoreTrigger[]
  actions: AutoScoreAction[]
}

export const TRIGGER_TYPES = {
  interval_time_passed: {
    label: '间隔时间',
    description: '每隔指定时间自动触发'
  },
  student_has_tag: {
    label: '学生标签',
    description: '当学生拥有指定标签时触发'
  }
}

export const ACTION_TYPES = {
  add_score: {
    label: '加分',
    description: '为学生增加分数'
  },
  add_tag: {
    label: '添加标签',
    description: '为学生添加标签'
  }
}

export const fields: Field[] = [
  { name: 'interval_time_passed', label: '间隔时间（分钟）', placeholder: '例如：1440' },
  { name: 'student_has_tag', label: '学生标签', placeholder: '例如：优秀学生,班干部' }
]

export const operators: Operator[] = [
  { name: '=', label: '等于' },
  { name: 'contains', label: '包含' }
]

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
