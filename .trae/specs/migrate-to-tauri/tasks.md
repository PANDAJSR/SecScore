# Tasks

## Phase 1: 项目初始化

- [x] Task 1: 创建 Tauri 项目结构
  - [x] SubTask 1.1: 在 SecScore-Rust 目录初始化 Tauri 2.x 项目
  - [x] SubTask 1.2: 配置 Cargo.toml 依赖（tauri, serde, tokio, sqlx, sea-orm 等）
  - [x] SubTask 1.3: 配置 tauri.conf.json 基本设置
  - [x] SubTask 1.4: 复制前端代码到新项目
  - [x] SubTask 1.5: 配置前端构建脚本

## Phase 2: 数据库层实现

- [x] Task 2: 实现数据库实体和迁移
  - [x] SubTask 2.1: 定义数据库实体结构（Student, Reason, ScoreEvent, Settlement, Setting, Tag, StudentTag）
  - [x] SubTask 2.2: 实现 SQLite 数据库连接
  - [x] SubTask 2.3: 实现 PostgreSQL 数据库连接
  - [x] SubTask 2.4: 实现数据库迁移逻辑
  - [x] SubTask 2.5: 实现连接切换功能

- [x] Task 3: 实现数据库仓储层
  - [x] SubTask 3.1: 实现 StudentRepository（查询、创建、更新、删除、导入）
  - [x] SubTask 3.2: 实现 EventRepository（查询、创建、删除、排行榜）
  - [x] SubTask 3.3: 实现 ReasonRepository（查询、创建、更新、删除）
  - [x] SubTask 3.4: 实现 SettlementRepository（查询、创建、排行榜）
  - [x] SubTask 3.5: 实现 TagRepository（查询、创建、删除、学生标签关联）

## Phase 3: 核心服务实现

- [x] Task 4: 实现设置服务
  - [x] SubTask 4.1: 定义设置项结构和默认值
  - [x] SubTask 4.2: 实现设置缓存机制
  - [x] SubTask 4.3: 实现设置的增删改查
  - [x] SubTask 4.4: 实现设置变更通知

- [x] Task 5: 实现安全服务
  - [x] SubTask 5.1: 实现 AES-256-CBC 加密解密
  - [x] SubTask 5.2: 实现密码验证
  - [x] SubTask 5.3: 实现恢复字符串生成

- [x] Task 6: 实现权限服务
  - [x] SubTask 6.1: 定义权限级别（admin, points, view）
  - [x] SubTask 6.2: 实现权限检查逻辑
  - [x] SubTask 6.3: 实现权限状态管理

- [x] Task 7: 实现认证服务
  - [x] SubTask 7.1: 实现登录/登出功能
  - [x] SubTask 7.2: 实现密码设置功能
  - [x] SubTask 7.3: 实现恢复功能

- [x] Task 8: 实现主题服务
  - [x] SubTask 8.1: 定义内置主题
  - [x] SubTask 8.2: 实现主题管理功能
  - [x] SubTask 8.3: 实现主题变更通知

- [x] Task 9: 实现自动评分服务
  - [x] SubTask 9.1: 定义规则结构
  - [x] SubTask 9.2: 实现规则引擎
  - [x] SubTask 9.3: 实现触发器逻辑（定时、标签）
  - [x] SubTask 9.4: 实现动作执行（加分、加标签）
  - [x] SubTask 9.5: 实现规则调度

- [x] Task 10: 实现日志服务
  - [x] SubTask 10.1: 配置日志框架
  - [x] SubTask 10.2: 实现日志文件滚动
  - [x] SubTask 10.3: 实现日志查询和清除

- [x] Task 11: 实现数据服务
  - [x] SubTask 11.1: 实现数据导出为 JSON
  - [x] SubTask 11.2: 实现数据导入

## Phase 4: Tauri Commands 实现

- [x] Task 12: 实现学生相关 Commands
  - [x] SubTask 12.1: db_student_query
  - [x] SubTask 12.2: db_student_create
  - [x] SubTask 12.3: db_student_update
  - [x] SubTask 12.4: db_student_delete
  - [x] SubTask 12.5: db_student_import_from_xlsx

- [x] Task 13: 实现标签相关 Commands
  - [x] SubTask 13.1: tags_get_all
  - [x] SubTask 13.2: tags_get_by_student
  - [x] SubTask 13.3: tags_create
  - [x] SubTask 13.4: tags_delete
  - [x] SubTask 13.5: tags_update_student_tags

- [x] Task 14: 实现原因相关 Commands
  - [x] SubTask 14.1: db_reason_query
  - [x] SubTask 14.2: db_reason_create
  - [x] SubTask 14.3: db_reason_update
  - [x] SubTask 14.4: db_reason_delete

- [x] Task 15: 实现事件相关 Commands
  - [x] SubTask 15.1: db_event_query
  - [x] SubTask 15.2: db_event_create
  - [x] SubTask 15.3: db_event_delete
  - [x] SubTask 15.4: db_event_query_by_student
  - [x] SubTask 15.5: db_leaderboard_query

- [x] Task 16: 实现结算相关 Commands
  - [x] SubTask 16.1: db_settlement_query
  - [x] SubTask 16.2: db_settlement_create
  - [x] SubTask 16.3: db_settlement_leaderboard

- [x] Task 17: 实现设置相关 Commands
  - [x] SubTask 17.1: settings_get_all
  - [x] SubTask 17.2: settings_get
  - [x] SubTask 17.3: settings_set
  - [x] SubTask 17.4: settings_changed 事件

- [x] Task 18: 实现认证相关 Commands
  - [x] SubTask 18.1: auth_get_status
  - [x] SubTask 18.2: auth_login
  - [x] SubTask 18.3: auth_logout
  - [x] SubTask 18.4: auth_set_passwords
  - [x] SubTask 18.5: auth_generate_recovery
  - [x] SubTask 18.6: auth_reset_by_recovery
  - [x] SubTask 18.7: auth_clear_all

- [x] Task 19: 实现主题相关 Commands
  - [x] SubTask 19.1: theme_list
  - [x] SubTask 19.2: theme_current
  - [x] SubTask 19.3: theme_set
  - [x] SubTask 19.4: theme_save
  - [x] SubTask 19.5: theme_delete
  - [x] SubTask 19.6: theme_updated 事件

- [x] Task 20: 实现自动评分相关 Commands
  - [x] SubTask 20.1: auto_score_get_rules
  - [x] SubTask 20.2: auto_score_add_rule
  - [x] SubTask 20.3: auto_score_update_rule
  - [x] SubTask 20.4: auto_score_delete_rule
  - [x] SubTask 20.5: auto_score_toggle_rule
  - [x] SubTask 20.6: auto_score_get_status
  - [x] SubTask 20.7: auto_score_sort_rules

- [x] Task 21: 实现日志相关 Commands
  - [x] SubTask 21.1: log_query
  - [x] SubTask 21.2: log_clear
  - [x] SubTask 21.3: log_set_level
  - [x] SubTask 21.4: log_write

- [x] Task 22: 实现数据导入导出 Commands
  - [x] SubTask 22.1: data_export_json
  - [x] SubTask 22.2: data_import_json

- [x] Task 23: 实现窗口相关 Commands
  - [x] SubTask 23.1: window_minimize
  - [x] SubTask 23.2: window_maximize
  - [x] SubTask 23.3: window_close
  - [x] SubTask 23.4: window_is_maximized
  - [x] SubTask 23.5: window_toggle_devtools
  - [x] SubTask 23.6: window_resize
  - [x] SubTask 23.7: window_maximized_changed 事件
  - [x] SubTask 23.8: app_navigate 事件

- [x] Task 24: 实现数据库连接相关 Commands
  - [x] SubTask 24.1: db_test_connection
  - [x] SubTask 24.2: db_switch_connection
  - [x] SubTask 24.3: db_get_status
  - [x] SubTask 24.4: db_sync

- [x] Task 25: 实现文件系统相关 Commands
  - [x] SubTask 25.1: fs_get_config_structure
  - [x] SubTask 25.2: fs_read_json
  - [x] SubTask 25.3: fs_write_json
  - [x] SubTask 25.4: fs_read_text
  - [x] SubTask 25.5: fs_write_text
  - [x] SubTask 25.6: fs_delete_file
  - [x] SubTask 25.7: fs_list_files
  - [x] SubTask 25.8: fs_file_exists

- [x] Task 26: 实现 HTTP 服务器相关 Commands
  - [x] SubTask 26.1: http_server_start
  - [x] SubTask 26.2: http_server_stop
  - [x] SubTask 26.3: http_server_status

- [x] Task 27: 实现应用相关 Commands
  - [x] SubTask 27.1: app_register_url_protocol

## Phase 5: 系统功能实现

- [x] Task 28: 实现系统托盘
  - [x] SubTask 28.1: 创建托盘图标
  - [x] SubTask 28.2: 实现托盘菜单
  - [x] SubTask 28.3: 实现双击显示窗口

- [x] Task 29: 实现 URL 协议处理
  - [x] SubTask 29.1: 注册 secscore:// 协议
  - [x] SubTask 29.2: 处理协议 URL 并导航

- [x] Task 30: 实现单实例运行
  - [x] SubTask 30.1: 检测已有实例
  - [x] SubTask 30.2: 激活已有实例

## Phase 6: 前端适配

- [x] Task 31: 修改前端 API 调用层
  - [x] SubTask 31.1: 创建 Tauri invoke 封装
  - [x] SubTask 31.2: 修改所有 window.api 调用为 Tauri invoke
  - [x] SubTask 31.3: 实现事件监听（theme_updated, settings_changed 等）
  - [x] SubTask 31.4: 移除 Electron 特定代码

- [x] Task 32: 适配窗口控制
  - [x] SubTask 32.1: 修改标题栏组件使用 Tauri API
  - [x] SubTask 32.2: 实现窗口拖拽区域

## Phase 7: 构建与测试

- [ ] Task 33: 配置构建脚本
  - [ ] SubTask 33.1: 配置开发环境脚本
  - [ ] SubTask 33.2: 配置生产构建脚本
  - [ ] SubTask 33.3: 配置 Windows 打包

- [ ] Task 34: 功能验证
  - [ ] SubTask 34.1: 验证所有数据库操作
  - [ ] SubTask 34.2: 验证所有 UI 功能
  - [ ] SubTask 34.3: 验证主题切换
  - [ ] SubTask 34.4: 验证认证流程
  - [ ] SubTask 34.5: 验证自动评分
  - [ ] SubTask 34.6: 验证数据导入导出
  - [ ] SubTask 34.7: 验证系统托盘
  - [ ] SubTask 34.8: 验证 URL 协议

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 4]
- [Task 6] depends on [Task 5]
- [Task 7] depends on [Task 5, Task 6]
- [Task 8] depends on [Task 4]
- [Task 9] depends on [Task 3]
- [Task 10] depends on [Task 1]
- [Task 11] depends on [Task 3]
- [Task 12-27] depend on [Task 3-11]
- [Task 28] depends on [Task 1]
- [Task 29] depends on [Task 1]
- [Task 30] depends on [Task 1]
- [Task 31] depends on [Task 12-27]
- [Task 32] depends on [Task 31]
- [Task 33] depends on [Task 32]
- [Task 34] depends on [Task 33]
