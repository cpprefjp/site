#enable_if(C++11)
```cpp
namespace std {
  template <bool Condition, class T = void>
  struct enable_if;
}
```

##概要
コンパイル時条件式が真の場合のみ有効な型。


##効果
`enable_if`は、`Condition`が`true`の場合のみ、型`T`をメンバ型`type`として定義する。そうでなければ`enable_if`は、メンバ型`type`を持たない。


`enable_if`は、SFINAEと組み合わせて使用する。関数のパラメータ、戻り値型、デフォルトテンプレートパラメータ等のいずれかで`enable_if`のメンバ型`type`を使用することにより、テンプレートの置き換え失敗が発生し、SFINAEによってその関数がオーバーロード解決の候補から除外される。


##例
```cpp
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

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [Visual C++](/implementation#visual_cpp.md): ??


