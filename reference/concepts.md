# concepts
* concepts[meta header]
* cpp20[meta cpp]

## 概要

`<concepts>`ヘッダでは基礎的なコンセプトの実装を提供する。これらのコンセプトは標準ライブラリでも使用される。

本ヘッダはフリースタンディング環境でも提供される。

## 暗黙の意味論的な制約

### 等しさの保持（*equality preservation*）

ある式への等しい入力によって等しい出力が得られる時、その式は __等しさを保持__ している。入力とはその式に与えられた全ての引数（オペランド）であり、出力とはその式の結果およびその式によって変更された全ての引数のこと。

また、必ずしも入力の個別の値が全てその式にとって有効である必要はない。例えば、整数に対する`a / b`という式は等しさを保持するが、`b = 0`の時この式は有効ではない。しかし、このことは式`a / b`が等しさを保持することを妨げない。  
式への入力のうちこのような有効ではない値を除いたものをその式の __定義域（*domain*）__ と呼ぶ。

等しさを保持する式はさらに __安定（*stable*）__ でなければならない。式が安定であるとは、その式への同じオブジェクトの入力は、そのオブジェクトの明示的な変更が介在しない限りは常に同じ出力が得られることである。  
式が安定であれば、あるオブジェクトの現在の値についてのことを、等しさを保持する式を介して観測した以前の値についての情報から推察することができる。

つまりこれらの事は、式が引数と結果以外に副作用を及ぼさず、式内部に状態を持たず、式の実行にはその外部からの影響がないことを要求している。

そして、C++標準において`requires`式で使用される全ての式は等しさを保持し安定でなければならない。この事は、場合によっては間接的にユーザーコードに対しても要求される。ただし、「等しさを保持することを要求しない」などと明記されている場合にはその必要はない。

### 式の入力への副作用

C++標準で定義される`requires`式では、それぞれの制約式への入力が（その制約式が実際に実行された場合に）変更されるかどうかを`requires`式のローカルパラメータの`const`修飾によって表現する。別に記載のある場合を除いて、`const`修飾のない左辺値・右辺値のローカルパラメータは変更しても良く変更されうる事を、`const`修飾されたパラメータは変更してはならず変更されない事を表明する。

```cpp
template<typename T>
concept C1 = requires(T a) {
  a + a;  // C1コンセプトを満たす型はこの式の実行においてその引数を変更しても良い
};

template<typename T>
concept C2 = requires(const T a) {
  a + a;  // C2コンセプトを満たす型はこの式の実行においてその引数を変更してはならない
};
```

これによって各制約式では、型パラメータがCV修飾されない非配列のオブジェクト型であると仮定することで、それぞれの引数の値カテゴリとCV修飾を確定することができる。

### 暗黙的な式のバリエーション（*implicit expression variations*）

`requires`式において定数左辺値としてローカルパラメータを宣言する場合、それぞれの制約式にはそのパラメータを受け取る位置に非定数左辺値や（定数）右辺値を受け入れる暗黙的な式のバリエーションが要求される。ただし、このような暗黙的な式のバリエーション（のいずれか）が異なる意味論を持ち、明示的に記述される場合を除く。

この暗黙的な式のバリエーションは各制約式の意味論的な要件を満たすために必要である。ただし、実装が各バリエーションをどこまで構文的に検証するかについては未規定。

```cpp
// このCコンセプトは
template<typename T>
concept C = requires(const T a, T b) {
  a + b;
};

// 以下のようなバリエーションが全て有効であることを暗黙的に要求している（実際にこのように検証されるかは未規定）
template<typename T>
concept C =
  requires(const T a, T b) { a + b } &&
  requires(T a, T b) { a + b; } &&
  requires(T&& a, T b) { std::move(a) + b; } &&
  requires(const T&& a, T b) { std::move(a) + b; };
```

## コンセプトのモデル

型`T`があるコンセプト`C`の構文的な制約（コンセプト定義内の各制約式）を全て満足しそれら制約式の追加の暗黙の意味論的な制約（等しさの保持、安定、入力への副作用の要求および暗黙的な式のバリエーション）についても全て満足していて、`C`に追加で要求されている意味論的な制約（モデルとなる条件）を全て満足するとき、そのような型`T`はコンセプト`C`の __モデル（*model*）__ である。

モデルとなるための意味論的な制約は文書で指定されているのみであり、通常何らかのチェックは行われない。しかし、標準ライブラリの事前条件などにおいて入力に対してあるコンセプトのモデルである事を要求する場合、モデルとならない型の入力は診断不要の未定義動作を引き起こす。

本サイトでは、型がコンセプトのモデルとなるための条件をそのコンセプトの構文的な制約条件とは分けて「モデル」という項に記載する。

## 型の関係

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`same_as`](concepts/same_as.md) | 2つの型が同じ | C++20 |
| [`derived_from`](concepts/derived_from.md) | 継承関係にある | C++20 |
| [`convertible_to`](concepts/convertible_to.md) | 変換可能 | C++20 |
| [`common_reference_with`](concepts/common_reference_with.md) | 共通の参照型 | C++20 |
| [`common_with`](concepts/common_with.md) | 共通の型 | C++20 |


## 型の種類

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`integral`](concepts/integral.md) | 整数型 | C++20 |
| [`signed_integral`](concepts/signed_integral.md) | 符号付き整数型 | C++20 |
| [`unsigned_integral`](concepts/unsigned_integral.md) | 符号なし整数型 | C++20 |
| [`floating_point`](concepts/floating_point.md) | 浮動小数点数型 | C++20 |


## 型の構築・破棄・代入操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`constructible_from`](concepts/constructible_from.md) | 構築可能 | C++20 |
| [`default_initializable`](concepts/default_initializable.md) | デフォルト構築可能 | C++20 |
| [`copy_constructible`](concepts/copy_constructible.md)       | コピー構築可能 | C++20 |
| [`move_constructible`](concepts/move_constructible.md)       | ムーブ構築可能 | C++20 |
| [`destructible`](concepts/destructible.md)                 | 破棄可能 | C++20 |
| [`assignable_from`](concepts/assignable_from.md) | 代入可能 | C++20 |
| [`swappable`](concepts/swappable.md)                       | 入れ替え可能 | C++20 |
| [`swappable_with`](concepts/swappable.md) | 特定の型と入れ替え可能 | C++20 |


## 比較

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`equality_comparable`](concepts/equality_comparable.md)     | 等値比較可能 | C++20 |
| [`equality_comparable_with`](concepts/equality_comparable.md) | 特定の型と等値比較可能 | C++20 |
| [`totally_ordered`](concepts/totally_ordered.md) | 狭義の全順序による比較が可能 | C++20 |
| [`totally_ordered_with`](concepts/totally_ordered.md) | 特定の型と狭義の全順序による比較が可能 | C++20 |


## 値指向の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`movable`](concepts/movable.md) | ムーブ可能 | C++20 |
| [`copyable`](concepts/copyable.md) | コピー可能 | C++20 |
| [`semiregular`](concepts/semiregular.md) | 半正則 | C++20 |
| [`regular`](concepts/regular.md) | 正則 | C++20 |


## 関数呼び出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`invocable`](concepts/invocable.md) | INVOKEコンセプトに従った関数呼び出しが可能 | C++20 |
| [`regular_invocable`](concepts/invocable.md) | 正則呼び出し可能 | C++20 |
| [`predicate`](concepts/predicate.md) | 述語 | C++20 |
| [`relation`](concepts/relation.md) | 二項関係 | C++20 |
| [`equivalence_relation`](concepts/equivalence_relation.md) | 同値関係 | C++20 |
| [`strict_weak_order`](concepts/strict_weak_order.md) | 狭義の弱順序 | C++20 |


## カスタマイゼーションポイントオブジェクト

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ranges::swap`](concepts/swap.md) | 任意の2つのオブジェクトを入れ替える | C++20 |

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

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [C++標準コンセプトの名前付けガイドライン - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190826/p1)
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [P2101R0 “Models” subsumes “satisfies” (Wording for US298 and US300)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2101r0.html)
- [P2102R0 Make “implicit expression variations” more explicit (Wording for US185)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2102r0.html)
