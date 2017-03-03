#aligned_union
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <std::size_t Len,
            class... Types>
  struct aligned_union {
    using type = …;
    static constexpr std::size_t alignment_value = …;
  };

  template <std::size_t Len, class... Types>
  using aligned_union_t = typename aligned_union<Len,Types...>::type; // C++14
}
```

##概要
アライメント調整された共用体領域を作る。


##要件
`Types...`に、1個以上の型が与えられること。


##効果
`aligned_union`は、領域サイズ`Len`、要素型列`Types...`で調整した未初期化の共用体領域をメンバ型`type`として定義する。  
`Types...`のいずれかの型が非POD型だとしても、メンバ型`type`はPOD型となる(参照：[`is_pod`](is_pod.md))。  

また、`Types...`全ての厳格なアライメント値を、`std::size_t`型の静的メンバ定数`alignment_value`として定義する。

##例
```cpp
#include <iostream>
#include <string>
#include <type_traits>

union X {
  int n;
  std::string s;

  X(const char* str)
    : s(str) {}
};

int main()
{
  using aligned_X = std::aligned_union<sizeof(X), int, std::string>;

  aligned_X::type x;

  new (&x) X("hello");

  std::cout << reinterpret_cast<X&>(x).s << std::endl;
  std::cout << aligned_X::alignment_value << std::endl;
}
```

###出力例(アライメント値は処理系定義)
```
hello
8
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 5.0
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0
	- 11.0は、`alignment_value`が定義されていない。
	- 11.0は、可変引数テンプレートに対応していないため、不完全な実装である。
	- `aligned_union_t`は12.0から


##参照
- [N1877 Adding Alignment Support to the C++ Programming Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1877.pdf)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

