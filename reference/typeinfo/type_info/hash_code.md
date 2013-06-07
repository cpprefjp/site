#hash_code
```cpp
size_t hash_code() const noexcept;
```

##概要
型のハッシュコードを取得する


##戻り値
未規定の値を返す。一度のプログラム実行中において、同じ型に対しては同じ値が返される。 
異なる型に対しては異なる値が返される。


##例外
投げない


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


