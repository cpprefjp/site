# any
* any[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class any;
}
```

## 概要



## 要件



## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](any/op_constructor.md.nolink) | コンストラクタ | C++17 |
| [`(destructor)`](any/op_destructor.md.nolink)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](any/op_assign.md.nolink) | 代入演算子 | C++17 |
| [`emplace`](any/emplace.md.nolink)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](any/swap.md.nolink)           | 他の`any`オブジェクトとデータを入れ替える | C++17 |
| [`reset`](any/reset.md.nolink)         | 有効値を保持していない状態にする | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`has_value`](any/has_value.md.nolink) | 有効な値を保持しているかを判定する | C++17 |
| [`type`](any/type.md.nolink)           | 保持している値の型情報を取得する | C++17 |


## 非メンバ関数
### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_any`](make_any.md.nolink) | `any`オブジェクトを構築する | C++17 |


### 値の取り出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`any_cast`](any_cast.md.nolink) | 値を取り出す | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](any/swap_free.md.nolink) | 2つの`any`オブジェクトを入れ替える | C++17 |


## 例
```cpp example
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): ??
- [GCC, C++17 mode](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
