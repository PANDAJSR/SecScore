# SecScore Electron 到 Tauri 迁移规格

## Why
将现有的 Electron 项目迁移到 Rust + Tauri 框架，以获得更小的打包体积、更好的性能和更低的资源消耗，同时保持所有现有功能和 UI 逻辑完全一致。

## What Changes
- **BREAKING**: 后端从 Node.js/TypeScript 迁移到 Rust
- **BREAKING**: 框架从 Electron 迁移到 Tauri 2.x
- 前端 React 代码保持不变，仅修改 IPC 通信层
- 数据库层从 TypeORM + better-sqlite3 迁移到 Rust 的 SeaORM + Rusqlite
- 所有后端服务用 Rust 重写，功能实现保持一致

## Impact
- Affected specs: 整个后端架构
- Affected code: 
  - `src/main/` - 全部重写为 Rust
  - `src/preload/` - 替换为 Tauri commands
  - `src/renderer/` - 仅修改 API 调用层
  - `src/shared/` - 部分逻辑迁移到 Rust

## ADDED Requirements

### Requirement: Tauri 项目初始化
系统 SHALL 在 `SecScore-Rust` 目录下创建 Tauri 2.x 项目结构，包含：
- Rust 后端 (src-tauri/)
- React 前端 (复用现有前端代码)
- Tauri 配置文件

#### Scenario: 项目结构创建
- **WHEN** 初始化 Tauri 项目
- **THEN** 应创建标准 Tauri 2.x 项目结构
- **AND** 前端使用现有的 React + Ant Design 技术栈

### Requirement: 数据库层迁移
系统 SHALL 使用 Rust 实现数据库功能，支持 SQLite 和 PostgreSQL：

#### Scenario: SQLite 支持
- **WHEN** 未配置 PostgreSQL 连接字符串
- **THEN** 使用 SQLite 作为默认数据库
- **AND** 数据库文件路径与原项目一致

#### Scenario: PostgreSQL 支持
- **WHEN** 配置了有效的 PostgreSQL 连接字符串
- **THEN** 系统应能连接到 PostgreSQL 数据库
- **AND** 支持连接测试和切换

#### Scenario: 数据库迁移
- **WHEN** 系统启动
- **THEN** 自动运行数据库迁移
- **AND** 表结构与原项目完全一致

### Requirement: 学生管理功能
系统 SHALL 提供完整的学生管理功能：

#### Scenario: 查询学生列表
- **WHEN** 调用查询学生接口
- **THEN** 返回所有学生信息，包含 id、name、score、tags
- **AND** 按 score DESC, name ASC 排序

#### Scenario: 创建学生
- **WHEN** 调用创建学生接口
- **THEN** 创建新学生记录，初始分数为 0
- **AND** 返回新创建的学生 ID

#### Scenario: 更新学生
- **WHEN** 调用更新学生接口
- **THEN** 更新指定学生的信息
- **AND** 自动更新 updated_at 时间戳

#### Scenario: 删除学生
- **WHEN** 调用删除学生接口
- **THEN** 删除学生及其关联的积分记录
- **AND** 使用事务确保数据一致性

#### Scenario: 导入学生名单
- **WHEN** 调用导入学生接口
- **THEN** 批量创建学生记录
- **AND** 跳过已存在的学生

### Requirement: 积分事件管理
系统 SHALL 提供完整的积分事件管理功能：

#### Scenario: 创建积分事件
- **WHEN** 调用创建积分事件接口
- **THEN** 创建积分记录并更新学生分数
- **AND** 使用事务确保数据一致性
- **AND** 自动生成 UUID

#### Scenario: 撤销积分事件
- **WHEN** 调用撤销积分事件接口
- **THEN** 撤销积分记录并回退学生分数
- **AND** 已结算的记录不可撤销

#### Scenario: 查询积分事件
- **WHEN** 调用查询积分事件接口
- **THEN** 返回指定条件的积分记录
- **AND** 支持按学生、时间范围筛选

#### Scenario: 查询排行榜
- **WHEN** 调用查询排行榜接口
- **THEN** 返回指定时间范围的排行榜数据
- **AND** 支持 today、week、month 三种范围

### Requirement: 原因管理功能
系统 SHALL 提供完整的积分原因管理功能：

#### Scenario: 查询原因列表
- **WHEN** 调用查询原因接口
- **THEN** 返回所有积分原因
- **AND** 按 category ASC, content ASC 排序

#### Scenario: 创建原因
- **WHEN** 调用创建原因接口
- **THEN** 创建新的积分原因
- **AND** 默认 is_system 为 0

#### Scenario: 更新原因
- **WHEN** 调用更新原因接口
- **THEN** 更新指定原因的信息

#### Scenario: 删除原因
- **WHEN** 调用删除原因接口
- **THEN** 删除指定原因

### Requirement: 结算功能
系统 SHALL 提供完整的结算功能：

#### Scenario: 查询结算列表
- **WHEN** 调用查询结算接口
- **THEN** 返回所有结算记录
- **AND** 包含每个结算的事件数量

#### Scenario: 创建结算
- **WHEN** 调用创建结算接口
- **THEN** 将所有未结算事件标记为已结算
- **AND** 重置所有学生分数为 0
- **AND** 使用事务确保数据一致性

#### Scenario: 查询结算排行榜
- **WHEN** 调用查询结算排行榜接口
- **THEN** 返回指定结算的排行榜数据

### Requirement: 标签管理功能
系统 SHALL 提供完整的学生标签管理功能：

#### Scenario: 查询所有标签
- **WHEN** 调用查询标签接口
- **THEN** 返回所有标签列表

#### Scenario: 创建标签
- **WHEN** 调用创建标签接口
- **THEN** 创建新标签或返回已存在的标签

#### Scenario: 删除标签
- **WHEN** 调用删除标签接口
- **THEN** 删除指定标签及其关联

#### Scenario: 更新学生标签
- **WHEN** 调用更新学生标签接口
- **THEN** 更新指定学生的标签关联

### Requirement: 设置管理功能
系统 SHALL 提供完整的设置管理功能：

#### Scenario: 获取所有设置
- **WHEN** 调用获取所有设置接口
- **THEN** 返回所有设置项

#### Scenario: 获取单个设置
- **WHEN** 调用获取设置接口
- **THEN** 返回指定设置项的值

#### Scenario: 设置值
- **WHEN** 调用设置值接口
- **THEN** 更新指定设置项
- **AND** 通知所有窗口设置变更

#### Scenario: 设置项定义
- **AND** 支持以下设置项：
  - is_wizard_completed: boolean
  - log_level: string (debug/info/warn/error)
  - window_zoom: number
  - themes_custom: json array
  - auto_score_enabled: boolean
  - auto_score_rules: json array
  - current_theme_id: string
  - pg_connection_string: string
  - pg_connection_status: json object

### Requirement: 认证与安全功能
系统 SHALL 提供完整的认证与安全功能：

#### Scenario: 获取认证状态
- **WHEN** 调用获取认证状态接口
- **THEN** 返回当前权限级别和密码设置状态

#### Scenario: 登录
- **WHEN** 调用登录接口
- **THEN** 验证密码并设置权限级别
- **AND** 支持 admin 和 points 两种密码

#### Scenario: 登出
- **WHEN** 调用登出接口
- **THEN** 重置权限级别为默认值

#### Scenario: 设置密码
- **WHEN** 调用设置密码接口
- **THEN** 加密存储密码
- **AND** 自动生成恢复字符串

#### Scenario: 恢复密码
- **WHEN** 调用恢复密码接口
- **THEN** 使用恢复字符串重置所有密码

#### Scenario: 加密实现
- **WHEN** 存储敏感数据
- **THEN** 使用 AES-256-CBC 加密
- **AND** 使用应用数据目录派生的密钥

### Requirement: 主题管理功能
系统 SHALL 提供完整的主题管理功能：

#### Scenario: 获取主题列表
- **WHEN** 调用获取主题列表接口
- **THEN** 返回内置主题和自定义主题

#### Scenario: 获取当前主题
- **WHEN** 调用获取当前主题接口
- **THEN** 返回当前激活的主题配置

#### Scenario: 设置主题
- **WHEN** 调用设置主题接口
- **THEN** 切换到指定主题
- **AND** 通知所有窗口主题变更

#### Scenario: 保存自定义主题
- **WHEN** 调用保存主题接口
- **THEN** 保存自定义主题配置
- **AND** 不允许覆盖内置主题

#### Scenario: 删除自定义主题
- **WHEN** 调用删除主题接口
- **THEN** 删除指定的自定义主题
- **AND** 不允许删除内置主题

### Requirement: 自动评分功能
系统 SHALL 提供完整的自动评分功能：

#### Scenario: 规则管理
- **WHEN** 管理自动评分规则
- **THEN** 支持添加、更新、删除、排序规则

#### Scenario: 规则执行
- **WHEN** 规则触发条件满足
- **THEN** 自动执行规则动作
- **AND** 记录执行时间

#### Scenario: 触发器类型
- **AND** 支持以下触发器：
  - interval_time_passed: 定时触发
  - student_has_tag: 学生标签触发

#### Scenario: 动作类型
- **AND** 支持以下动作：
  - add_score: 添加积分
  - add_tag: 添加标签

### Requirement: 数据导入导出功能
系统 SHALL 提供完整的数据导入导出功能：

#### Scenario: 导出数据
- **WHEN** 调用导出数据接口
- **THEN** 导出所有数据为 JSON 格式

#### Scenario: 导入数据
- **WHEN** 调用导入数据接口
- **THEN** 从 JSON 导入数据
- **AND** 重新加载设置

### Requirement: 日志管理功能
系统 SHALL 提供完整的日志管理功能：

#### Scenario: 查询日志
- **WHEN** 调用查询日志接口
- **THEN** 返回最近的日志记录

#### Scenario: 清除日志
- **WHEN** 调用清除日志接口
- **THEN** 删除所有日志文件

#### Scenario: 设置日志级别
- **WHEN** 调用设置日志级别接口
- **THEN** 更新日志级别

#### Scenario: 日志文件
- **AND** 日志文件按日期滚动
- **AND** 保留最近 30 天的日志

### Requirement: 窗口管理功能
系统 SHALL 提供完整的窗口管理功能：

#### Scenario: 窗口控制
- **WHEN** 调用窗口控制接口
- **THEN** 支持最小化、最大化、关闭操作

#### Scenario: 窗口状态
- **WHEN** 查询窗口状态
- **THEN** 返回窗口最大化状态

#### Scenario: 窗口缩放
- **WHEN** 设置窗口缩放
- **THEN** 应用缩放比例到所有窗口

#### Scenario: 窗口导航
- **WHEN** 调用导航接口
- **THEN** 在窗口中导航到指定路由

### Requirement: 系统托盘功能
系统 SHALL 提供系统托盘功能：

#### Scenario: 托盘初始化
- **WHEN** 应用启动
- **THEN** 创建系统托盘图标

#### Scenario: 托盘菜单
- **WHEN** 右键点击托盘图标
- **THEN** 显示菜单：显示主窗口、重启应用、关闭应用

#### Scenario: 双击托盘
- **WHEN** 双击托盘图标
- **THEN** 显示主窗口

### Requirement: URL 协议功能
系统 SHALL 提供自定义 URL 协议功能：

#### Scenario: 协议注册
- **WHEN** 应用启动（非开发模式）
- **THEN** 注册 secscore:// 协议

#### Scenario: 协议处理
- **WHEN** 收到协议 URL
- **THEN** 解析并导航到对应路由
- **AND** 支持路由：home、students、score、leaderboard、settlements、reasons、settings

### Requirement: 单实例运行
系统 SHALL 确保应用单实例运行：

#### Scenario: 单实例检查
- **WHEN** 启动第二个实例
- **THEN** 激活已有实例并退出

### Requirement: 前端 API 适配
系统 SHALL 保持前端 API 调用接口不变：

#### Scenario: API 兼容
- **WHEN** 前端调用 window.api
- **THEN** 返回与原项目相同格式的响应
- **AND** 所有接口签名保持一致

### Requirement: 文件系统功能
系统 SHALL 提供配置文件管理功能：

#### Scenario: 获取配置目录结构
- **WHEN** 调用获取配置目录结构接口
- **THEN** 返回 automatic 和 script 目录路径

#### Scenario: 读写 JSON 文件
- **WHEN** 调用读写 JSON 接口
- **THEN** 在指定目录读写 JSON 文件

#### Scenario: 读写文本文件
- **WHEN** 调用读写文本接口
- **THEN** 在指定目录读写文本文件

#### Scenario: 文件列表
- **WHEN** 调用文件列表接口
- **THEN** 返回指定目录的文件列表

### Requirement: HTTP 服务器功能
系统 SHALL 提供可选的 HTTP API 服务：

#### Scenario: 启动服务器
- **WHEN** 调用启动服务器接口
- **THEN** 启动 HTTP 服务器
- **AND** 支持自定义端口和 CORS 配置

#### Scenario: 停止服务器
- **WHEN** 调用停止服务器接口
- **THEN** 停止 HTTP 服务器

#### Scenario: 服务器状态
- **WHEN** 调用服务器状态接口
- **THEN** 返回服务器运行状态

## MODIFIED Requirements
无修改的需求，所有功能保持原有实现逻辑。

## REMOVED Requirements
无移除的需求。
