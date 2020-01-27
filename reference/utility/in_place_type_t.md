# in_place_type_t
* utility[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct in_place_type_t {
    explicit in_place_type_t() = default;
  };

  template <class T>
  inline constexpr in_place_type_t<T> in_place_type{};
}
```

## 概要
`in_place_type_t`クラスは、オーバー�ードのための空クラスである。

標準ライブラリの特定機能において、要素型とそのコンストラクタ引数を直接受け取って構築するための関数オーバー�ードを定義するためにある。


## 備考
デフォルトコンストラクタに`explicit`が付いているのは、`in_place_type_t<T> x = {};`のように`=`付きの波カッコ初期化を禁�するためである。ユーザーは通常、`in_place_type_t<T>`型の定数として事前定義されている`in_place_type<T>`を使用すればよいので、問題にはならない。


## 例
```cpp example
#include <iostream>
#include <any>
#include <string>

int main()
{
  std::any x {
    std::in_place_type<std::string>,
    3,
    'z'
  };

  std::cout << std::any_cast<std::string>(x) << std::endl;
}
```
* std::in_place_type[color ff0000]
* std::any[link /reference/any/any.md]
* std::any_cast[link /reference/any/any_cast.md]

### 出力
```
zzz
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0504R0 Revisiting in-place tag types for `any`/`optional`/`variant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0504r0.html)
