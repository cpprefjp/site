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


## 例
```cpp
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
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0
	- `conditional_t`は、12.0から。


## 参照
- [N2240 Two missing traits: `enable_if` and `conditional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2240.html)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

