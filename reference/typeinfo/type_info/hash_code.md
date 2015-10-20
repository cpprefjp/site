#hash_code
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_t hash_code() const noexcept;
```

##概要
型のハッシュコードを取得する


##戻り値
未規定の値を返す。一度のプログラム実行中において、同じ型に対しては同じ値が返される。 


##例外
投げない


##備考
この関数の実装は、異なる型に対しては異なる値を返すことが推奨される。


##例
```cpp
#include <iostream>
#include <typeinfo>

int main()
{
  std::cout << typeid(int).hash_code() << std::endl;
  std::cout << typeid(char).hash_code() << std::endl;
}
```
* hash_code[color ff0000]

###出力例
```
15265900242347711334
9981675175275146982
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N2530 Making It Easier to Use `std::type_info` as an Index in an Associative Container](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2530.html)


