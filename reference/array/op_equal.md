#operator==
```cpp
namespace std {

  template <class T, size_t N>
  bool operator==(const array<T, N>& x, const array<T, N>& y);

}
```

##概要

<b>arrayオブジェクトの等値比較を行う。</b>


##要件

型`T`が`operator==`で等値比較可能であること。


##効果

[equal](/reference/algorithm/equal.md)(x.[begin](/reference/array/begin.md)(), x.[end](/reference/array/end.md)(), y.[begin](/reference/array/begin.md)());


##戻り値

`x`と`y`の要素が全て等値であれば`true`、そうでなければ`false`を返す。


##計算量

線形時間


##備考



##例

```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {1, 2, 3};

  if (x == y) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* ==[color ff0000]

###出力

```cpp
equal
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


