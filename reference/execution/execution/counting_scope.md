# counting_scope
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class counting_scope;
}
```

## 概要
`counting_scope`は、停止要求を作成可能なカウント式の非同期スコープを表現する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](counting_scope/op_constructor.md.nolink) | コンストラクタ | C++26 |
| [`(destructor)`](counting_scope/op_destructor.md.nolink) | デストラクタ | C++26 |
| [`get_token`](counting_scope/get_token.md.nolink) | 非同期スコープトークンを取得 | C++26 |
| [`close`](counting_scope/close.md.nolink) | 非同期スコープを閉じる | C++26 |
| [`join`](counting_scope/join.md.nolink) | 非同期スコープを合流する[Sender](sender.md)取得 | C++26 |
| [`request_stop`](counting_scope/request_stop.md.nolink) | 停止要求を行う | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`token`](counting_scope/token.md.nolink) | 非同期スコープトークン型 | C++26 |

## 静的メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constexpr size_t max_associations = implementation-defined;` | 関連付けの最大数 | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::simple_counting_scope`](simple_counting_scope.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
