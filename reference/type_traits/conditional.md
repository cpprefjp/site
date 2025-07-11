# conditional
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <bool B, class T, class F>
  struct conditional {
    using type = …;
  };

  template <bool B, class T, class F>
  using conditional_t = typename conditional<B,T,F>::type; // C++14
}
```

## 概要
コンパイル時条件式。

条件式が`true`か`false`かによって、使用する型を切り替える。


## 効果
`conditional`は、条件式`B`が`true`であれば型`T`を、そうでなければ型`F`を、メンバ型`type`として定義する。


## 備考
- この機能が標準ライブラリに導入される前、Boost C++ Librariesでは、`boost::mpl::if_c`や`boost::mpl::if_`という機能が使われていた。`if_c`が現在の`conditional`であり、`bool`定数 (constantのc) を条件式としてとり、使用する型を分岐する。`if_`は`static const bool value`をメンバとして持つ型をパラメータとしてとる高階メタ関数であり、標準ライブラリに直接採用されてはいない
- `conditional`や`boost::mpl::if_c`を使う以外に、テンプレートの特殊化を使用する方法もあり、`conditional`や`boost::mpl::if_c`はその手法を一般化したものである。
    ```cpp
    template <bool>
    struct Conditional;

    template <>
    struct Conditional<true> {
      using type = int;
    };

    template <>
    struct Conditional<false> {
      using type = char;
    };
    ```


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<std::conditional<true, int, char>::type, int>::value, "select int");
static_assert(std::is_same<std::conditional<false, int, char>::type, char>::value, "select char");

int main() {}
```
* std::conditional[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
    - `conditional_t`は、2013から。


## 関連項目
- [C++17 if constexpr文](/lang/cpp17/if_constexpr.md)


## 参照
- [N2240 Two missing traits: `enable_if` and `conditional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2240.html)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
