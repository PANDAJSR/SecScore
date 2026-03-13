import { formatQuery, QueryBuilder, RuleGroupType } from 'react-querybuilder'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import * as ReactDndTouchBackend from 'react-dnd-touch-backend';
import {
  getFields,
/*   operators, */
  defaultQuery,
  queryToAutoScoreRule,
  autoScoreRuleToQuery,
  type AutoScoreRuleData,
  AutoScoreAction
} from './ruleBuilderUtils'
import { Card } from 'antd'

import './ruleBuilderOverride.css'
import { ActionComponent } from './actionComponent'

interface RuleComponentProps {
  initialData?: AutoScoreRuleData
  onChange?: (data: AutoScoreRuleData) => void
}

export const RuleComponent: React.FC<RuleComponentProps> = ({ initialData, onChange }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState<RuleGroupType>(
   initialData ? autoScoreRuleToQuery(initialData) : defaultQuery
  )
/*   const [actions, setActions] = useState<AutoScoreRuleData['actions']>(initialData?.actions || [])

  useEffect(() => {
    if (onChange) {
      const ruleData = queryToAutoScoreRule(query)
      onChange({
        ...ruleData,
        actions
      })
    }
  }, [query, actions])

  const handleAddAction = () => {
    setActions([...actions, { event: 'add_score', value: '5', reason: '' }])
  }

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index))
  }

  const handleActionChange = (index: number, field: keyof AutoScoreAction, value: any) => {
    const newActions = [...actions]
    newActions[index] = { ...newActions[index], [field]: value }
    setActions(newActions)
  }
 */
  const handleQueryChange = (newQuery: RuleGroupType) => {
    setQuery(newQuery)
  }
  return (
    <div>
      <Card title={t('autoScore.triggerCondition')} style={{ marginBottom: '24px', backgroundColor: 'var(--ss-card-bg)' }}>
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend, ...ReactDndTouchBackend }}>
         <QueryBuilderAntD>
            <QueryBuilder
              fields={getFields(t)}
              /* operators={operators} */
              query={query}
              /* onQueryChange={handleQueryChange} */
              onQueryChange={handleQueryChange} />
          </QueryBuilderAntD> 
        </QueryBuilderDnD>
        <div style={{ marginTop: '8px' }}>
          <pre style={{ fontSize: '12px', color: '#999' }}>{ formatQuery(query, 'json') }</pre>
        </div>
      </Card>
{/*       <Card title={t('autoScore.executeAction')} style={{ marginBottom: '24px', backgroundColor: 'var(--ss-card-bg)' }}>
        <ActionComponent
          actions={actions}
          onAdd={handleAddAction}
          onRemove={handleRemoveAction}
          onChange={handleActionChange} />
      </Card> */}
    </div>
  )
}

export default RuleComponent
