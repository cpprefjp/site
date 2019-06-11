# concepts
* concepts[meta header]
* cpp20[meta cpp]


## 型の関係

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `Same` | 2つの型が同じ | C++20 |
| `DerivedFrom` | 継承関係にある | C++20 |
| `ConvertibleTo` | 変換可能 | C++20 |
| `CommonReference` | 共通の参照型 | C++20 |
| `Common` | 共通の型 | C++20 |


## 型の種類

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `Integral` | 整数型 | C++20 |
| `SignedIntegral` | 符号付き整数型 | C++20 |
| `UnsignedIntegral` | 符号なし整数型 | C++20 |
| `Boolean` | 真理値型 | C++20 |


## 型の構築・破棄・代入操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `Constructible` | 構築可能 | C++20 |
| [`DefaultConstructible`](concepts/DefaultConstructible.md) | デフォルト構築可能 | C++20 |
| [`CopyConstructible`](concepts/CopyConstructible.md)       | コピー構築可能 | C++20 |
| [`MoveConstructible`](concepts/MoveConstructible.md)       | ムーブ構築可能 | C++20 |
| [`Destructible`](concepts/Destructible.md)                 | 破棄可能 | C++20 |
| `Assignable` | 代入可能 | C++20 |
| [`CopyAssignable`](concepts/CopyAssignable.md)             | コピー代入可能 | C++20 |
| [`MoveAssignable`](concepts/MoveAssignable.md)             | ムーブ代入可能 | C++20 |
| [`Swappable`](concepts/Swappable.md)                       | 入れ替え可能 | C++20 |
| `SwappableWith` | 特定の型と入れ替え可能 | C++20 |


## 比較

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`EqualityComparable`](concepts/EqualityComparable.md)     | 等値比較可能 | C++20 |
| EqualityComparableWith | 特定の型と等値比較可能 | C++20 |
| `StrictTotallyOrdered` | 狭義の全順序 | C++20 |
| `StrictTotallyOrderedWith` | 特定の型と狭義の全順序 | C++20 |


## 値指向の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `Movable` | ムーブ可能 | C++20 |
| `Copyable` | コピー可能 | C++20 |
| `Semiregular` | 半正則 | C++20 |
| `Regular` | 正則 | C++20 |


## 関数呼び出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `Invocable` | INVOKEコンセプトに従った関数呼び出しが可能 | C++20 |
| `RegularInvocable` | 正則呼び出し可能 | C++20 |
| `Predicate` | 述語 | C++20 |
| `Relation` | 述語関係 | C++20 |
| `StrictWeakOrder` | 狭義の弱順序 | C++20 |


## そのうちどこかに移動するページ

以下は、ライブラリとして提供はされていない要件をまとめる。

| | |
|--|--|--|
| [`Callable`](concepts/Callable.md)                         | |
| [`INVOKE`](concepts/Invoke.md)                             | |
| [`LessThanComparable`](concepts/LessThanComparable.md)     | 小なり比較可能 |
| [`ValueSwappable`](concepts/ValueSwappable.md)             | 間接参照して入れ替え可能 |
