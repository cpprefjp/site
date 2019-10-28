# concepts
* concepts[meta header]
* cpp20[meta cpp]


## 型の関係

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `same_as` | 2つの型が同じ | C++20 |
| `derived_from` | 継承関係にある | C++20 |
| `convertible_to` | 変換可能 | C++20 |
| `common_reference_with` | 共通の参照型 | C++20 |
| `common_with` | 共通の型 | C++20 |


## 型の種類

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `integral` | 整数型 | C++20 |
| `signed_integral` | 符号付き整数型 | C++20 |
| `unsigned_integral` | 符号なし整数型 | C++20 |
| `boolean` | 真理値型 | C++20 |
| [`floating_point`](concepts/floating_point.md) | 浮動小数点数型 | C++20 |


## 型の構築・破棄・代入操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constructible_from` | 構築可能 | C++20 |
| [`default_constructible`](concepts/default_constructible.md) | デフォルト構築可能 | C++20 |
| [`copy_constructible`](concepts/copy_constructible.md)       | コピー構築可能 | C++20 |
| [`move_constructible`](concepts/move_constructible.md)       | ムーブ構築可能 | C++20 |
| [`destructible`](concepts/destructible.md)                 | 破棄可能 | C++20 |
| `assignable_from` | 代入可能 | C++20 |
| [`swappable`](concepts/swappable.md)                       | 入れ替え可能 | C++20 |
| `swappable_with` | 特定の型と入れ替え可能 | C++20 |


## 比較

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`equality_comparable`](concepts/equality_comparable.md)     | 等値比較可能 | C++20 |
| `equality_comparable_with` | 特定の型と等値比較可能 | C++20 |
| `totally_ordered` | 狭義の全順序 | C++20 |
| `totally_ordered_with` | 特定の型と狭義の全順序 | C++20 |


## 値指向の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `movable` | ムーブ可能 | C++20 |
| `copyable` | コピー可能 | C++20 |
| `semiregular` | 半正則 | C++20 |
| `regular` | 正則 | C++20 |


## 関数呼び出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `invocable` | INVOKEコンセプトに従った関数呼び出しが可能 | C++20 |
| `regular_invocable` | 正則呼び出し可能 | C++20 |
| `predicate` | 述語 | C++20 |
| `relation` | 述語関係 | C++20 |
| `strict_weak_order` | 狭義の弱順序 | C++20 |


## そのうちどこかに移動するページ

以下は、ライブラリとして提供はされていない要件をまとめる。

| 名前 | 説明 |
|--|--|
| [`Callable`](concepts/Callable.md)                         | |
| [`INVOKE`](concepts/Invoke.md)                             | |
| [`LessThanComparable`](concepts/LessThanComparable.md)     | 小なり比較可能 |
| [`ValueSwappable`](concepts/ValueSwappable.md)             | 間接参照して入れ替え可能 |
| [`CopyAssignable`](concepts/CopyAssignable.md.nolink)      | コピー代入可能 | C++20 |
| [`MoveAssignable`](concepts/MoveAssignable.md.nolink)      | ムーブ代入可能 | C++20 |


## 参照
- [C++標準コンセプトの名前付けガイドライン - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190826/p1)
