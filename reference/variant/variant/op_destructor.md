# デストラクタ
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
~variant();            // C++17
constexpr ~variant();  // C++23
```

## 概要
`variant`オブジェクトを破棄する


## 効果
[`valueless_by_exception()`](valueless_by_exception.md)が`false`である場合、保持している値を破棄する。


## 備考
- `Types...`の全ての型`Ti`について[`is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<Ti>`が`true`である場合、この関数はトリビアルとなる
    - つまり、全ての候補型がデストラクタを呼び出す必要のない型である場合、[`valueless_by_exception()`](valueless_by_exception.md)の状態に関わらず何もする必要がない


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_trivially_destructible`](/reference/type_traits/is_trivially_destructible.md)

## 参照
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
