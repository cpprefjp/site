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


クラス動作説明用のメンバ変数として下記を保持する。詳細仕様は[`simple_counting_scope`](simple_counting_scope.md)を参照。

- `count` : `size_t`型の関連付けカウント値
- `state` : `scope-state-type`列挙型（後述）の状態
- `s_source` : [`inplace_stop_source`](/reference/stop_token/inplace_stop_source.md)型の停止要求管理オブジェクト


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](counting_scope/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](counting_scope/op_destructor.md) | デストラクタ | C++26 |
| [`get_token`](counting_scope/get_token.md) | 非同期スコープトークンを取得 | C++26 |
| [`close`](counting_scope/close.md) | 非同期スコープを閉じる | C++26 |
| [`join`](counting_scope/join.md) | 非同期スコープを合流する[Sender](sender.md)取得 | C++26 |
| [`request_stop`](counting_scope/request_stop.md) | 停止要求を作成する | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `assoc-t` | [`association-t`](association-t.md)`<counting_scope>`（説明専用） | C++26 |
| [`token`](counting_scope/token.md) | 非同期スコープトークン型 | C++26 |

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
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
