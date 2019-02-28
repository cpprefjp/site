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
  inline constexpr in_place_type_t<T> in_place_type{}; // C++11
  template <class T>
  constexpr in_place_type_t<T> in_place_type{};        // C++17
}
```

## 概要
`in_place_type_t`クラスは、オーバーロードのための空クラスである。

標準ライブラリの特定機能において、要素型とそのコンストラクタ引数を直接受け取って構築するための関数オーバーロードを定義するためにある。


## 備考
デフォルトコンストラクタに`explicit`が付いているのは、`in_place_type_t<T> x = {};`のように`=`付きの波カッコ初期化を禁止するためである。ユーザーは通常、`in_place_type_t<T>`型の定数として事前定義されている`in_place_type<T>`を使用すればよいので、問題にはならない。


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
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
