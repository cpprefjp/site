# enable_if
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <bool Condition, class T = void>
  struct enable_if;

  template <bool Condition, class T = void>
  using enable_if_t = typename enable_if<Condition,T>::type; // C++14
}
```

## 概要
コンパイル時条件式が真の場合のみ有効な型。


## 効果
`enable_if`は、`Condition`が`true`の場合のみ、型`T`をメンバ型`type`として定義する。そうでなければ`enable_if`は、メンバ型`type`を持たない。


`enable_if`は、SFINAEと組み合わせて使用する。関数のパラメータ、戻り値型、デフォルトテンプレートパラメータ�のいずれかで`enable_if`のメンバ型`type`を使用することにより、テンプレートの置き換え失敗が発生し、SFINAEによってその関数がオーバー�ード解決の候補から除外される。


## 例
```cpp example
#include <type_traits>
#include <iostream>

template <class T>
auto f(T) -> typename std::enable_if<std::is_integral<T>::value>::type
{
  std::cout << "Tは整数型" << std::endl;
}

template <class T>
auto f(T) -> typename std::enable_if<!std::is_integral<T>::value>::type
{
  std::cout << "Tは整数型以外" << std::endl;
}

int main()
{
  f(3);
  f("hello");
}
```
* std::enable_if[color ff0000]
* std::is_integral[link is_integral.md]

### 出力
```
Tは整数型
Tは整数型以外
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- `enable_if_t`は、2013から。


## 参照
- [N2240 Two missing traits: `enable_if` and `conditional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2240.html)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

