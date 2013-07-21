#data(C++11)
```cpp
T* data() noexcept;
const T* data() const noexcept;
```

##概要
配列の先頭へのポインタを取得する。


##戻り値
`array`クラス内部の組み込み配列変数名が`elems`であった場合、`elems`を返す。


##例外
投げない


##備考
0要素の場合(`N == 0`)、この関数の呼び出しによる挙動は未規定。


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int* p = ar.data();
  const int* cp = car.data();

  std::cout << *p << std::endl;
  std::cout << *cp << std::endl;
}
```
* data[color ff0000]


###出力
```
3
3
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 9.0 (std::tr1), 10.0, 11.0


##参照

