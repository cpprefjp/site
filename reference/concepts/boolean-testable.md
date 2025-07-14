# boolean-testable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept boolean-testable = /*see below*/; // 説明専用コンセプト
}
```

## 概要

`boolean-testable`は、任意の型`T`を`bool`として扱う事ができることを表すコンセプトである。

このコンセプトはほかのコンセプトの定義および説明に使用される説明専用のものであり、実際に使用可能ではない。

## 要件

まず、説明専用の`boolean-testable-impl`コンセプトを以下の様に定義する。

```cpp
template<class T>
concept boolean-testable-impl = convertible_to<T, bool>;
```

これを用いて、`boolean-testable`は以下の様に定義される。

```cpp
template<class T>
concept boolean-testable =
  boolean-testable-impl<T> && requires (T&& t) {
    { !std::forward<T>(t) } -> boolean-testable-impl;
  };
```

## モデル

- `decltype((e))`が`T`となる式`e`について、次の条件を満たす場合に限って型`T`は`boolean-testable-impl`のモデルである。
    - 次のどちらかを満たす
        - `remove_cvref_t<T>`はクラス型ではない
        - `operator||, operator&&`を`remove_cvref_t<T>`のクラススコープで名前解決したかの様に探索した結果、候補関数は見つからない
    - `operator||, operator&&`のADLによる探索では不適格な宣言は見つからない
        - `T`のADL探索範囲に`T`が左右どちらのオペランドになったとしても、受け入れ可能にオーバーロードされた`operator||, operator&&`演算子は存在しない

2番目の条件の不適格な宣言が見つからないとは、`boolean-testable-impl`のモデルとなる型`T1, T2`については、`declval<T1>() && declval<T2>()`および`declval<T1>() || declval<T2>()`の`operator||, operator&&`は確実に組み込みの演算子が使用される、と言う事を要求している。

- `decltype((e))`が`T`となる式`e`について、次の条件を満たす場合に限って型`T`は`boolean-testable`のモデルである。
    - `bool(e) == !bool(!e)`

## 備考

`boolean-testable`コンセプトのモデルとなる型には、`bool`, [`std::true_type`](/reference/type_traits/true_type.md), `int*`等ポインタ型、[`std::bitset<N>::reference`](https://cpprefjp.github.io/reference/bitset/bitset/reference.html)等がある。

## booleanコンセプト

`boolean-testable`コンセプトは当初、真理値型を表す説明専用ではない`boolean`コンセプトとして以下の様に定義されていた。

```cpp
namespace std {
  template<class B>
  concept boolean =
    movable<remove_cvref_t<B>> &&
    requires(const remove_reference_t<B>& b1,
             const remove_reference_t<B>& b2, const bool a) {
      { b1 } -> convertible_to<bool>;
      { !b1 } -> convertible_to<bool>;
      { b1 && b2 } -> same_as<bool>;
      { b1 &&  a } -> same_as<bool>;
      {  a && b2 } -> same_as<bool>;
      { b1 || b2 } -> same_as<bool>;
      { b1 ||  a } -> same_as<bool>;
      {  a || b2 } -> same_as<bool>;
      { b1 == b2 } -> convertible_to<bool>;
      { b1 ==  a } -> convertible_to<bool>;
      {  a == b2 } -> convertible_to<bool>;
      { b1 != b2 } -> convertible_to<bool>;
      { b1 !=  a } -> convertible_to<bool>;
      {  a != b2 } -> convertible_to<bool>;
    };
}
```
* movable[link /reference/concepts/movable.md]


この`boolean`コンセプトは14個の制約式によって定義されている。これらは真理値式をなるべく正しく表現するために議論の経過と共に追加されていったものだが、これによって以下の様な問題が発生していた。

- ある型が`boolean`コンセプトを満たしているのかがわかりにくい
    - 特に、演算子オーバーロードされていると追いかけるのは非常に困難になる
- 制約式の数が多すぎるため、少し使用しただけでコンパイル時間を増大させる
    - 例えば当初の[`totally_ordered_with`](/reference/concepts/totally_ordered.md)は直接的に8個、間接的に50個の`boolean`コンセプトのチェックを要求する。`totally_ordered_with`1度の使用あたり`boolean`のチェックだけで最悪812個の制約式のチェックを行う事になる。
- この`boolean`を正しく使用するためには、本来必要ない箇所で明示的な`bool`への変換を行う必要がある。しかし、どこで必要になってどこなら必要ないのかが非常に分かりづらい。

これらの問題（共通するのは、制約式が多すぎると言う問題）によって、`boolean`コンセプトは検証するのも使用するのも教育するのも困難なものになってしまったため、削除される事となった。  
ただ、`boolean`コンセプトは標準ライブラリのその他のコンセプトの定義のために使用されていたため、「標準ライブラリが必要とするときに（暗黙的に）`bool`型への変換が可能」と言う最低限の性質を表明し、なおかつ説明専用の`boolean-testable`コンセプトへと置換された。

上記定義の`boolean`コンセプトはポインタ型等`bool`に変換可能なだけの型では満たす事はできなかったが、`boolean-testable`コンセプトでは`bool`に変換可能なだけの型でも満たす事ができる。

## バージョン
### 言語
- C++20

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3208. Boolean's expression requirements are ordered inconsistently](https://wg21.cmeerw.net/lwg/issue3208)
- [P1934R0 `boolean` Considered Harmful](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1934r0.pdf)
    - `boolean`コンセプトが標準ライブラリのコンセプトとして不適格である理由について
- [P1964R0 Wording for `boolean-testable`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1964r0.html)
- [P1964R2 Wording for `boolean-testable`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1964r2.html)
    - `boolean-testable`コンセプトについて
