import { Space, Input, InputNumber, Select, Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { AutoScoreAction } from './ruleBuilderUtils'

interface ActionComponentProps {
  actions: AutoScoreAction[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, field: keyof AutoScoreAction, value: any) => void
}

export const ActionComponent: React.FC<ActionComponentProps> = ({
  actions,
  onAdd,
  onRemove,
  onChange
}) => {
  const handleActionChange = (index: number, field: keyof AutoScoreAction, value: any) => {
    onChange(index, field, value)
  }

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        {actions.map((action, index) => (
          <div
            key={index}
            style={{
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              backgroundColor: '#fafafa'
            }}
          >
            <Space style={{ width: '100%' }} wrap>
              <Select
                value={action.event}
                onChange={(value) => handleActionChange(index, 'event', value)}
                style={{ width: 150 }}
                options={Object.entries({
                  add_score: { label: '加分', description: '为学生增加分数' },
                  add_tag: { label: '添加标签', description: '为学生添加标签' }
                }).map(([key, val]) => ({
                  label: val.label,
                  value: key
                }))}
              />

              {action.event === 'add_score' && (
                <InputNumber
                  value={action.value ? parseInt(action.value) : 0}
                  onChange={(value) => handleActionChange(index, 'value', String(value || 0))}
                  placeholder="分数"
                  min={-100}
                  max={100}
                  style={{ width: 120 }}
                />
              )}

              {action.event === 'add_tag' && (
                <Input
                  value={action.value}
                  onChange={(e) => handleActionChange(index, 'value', e.target.value)}
                  placeholder="标签名称"
                  style={{ width: 200 }}
                />
              )}

              <Input
                value={action.reason}
                onChange={(e) => handleActionChange(index, 'reason', e.target.value)}
                placeholder="操作说明（可选）"
                style={{ flex: 1, minWidth: 200 }}
              />

              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onRemove(index)}
              />
            </Space>
          </div>
        ))}

        <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} block>
          添加操作
        </Button>
      </Space>
    </div>
  )
}

export default ActionComponent
