#operator<
```cpp
namespace std {

  template <class T, size_t N>
  bool operator<(const array<T, N>& x, const array<T, N>& y);

}
```

##概要

<b>arrayにおいて、左辺が右辺より小さいかの判定を行う。</b>



##要件

型`T`が`<`比較可能であること。その`<`が全順序関係を持っていること。


##戻り値

[lexicographical_compare](/reference/algorithm/lexicographical_compare.md)(x.[begin](/reference/array/begin.md)(), x.[end](/reference/array/end.md)(), y.[begin](/reference/array/begin.md)(), y.[end](/reference/array/end.md)());


##計算量

線形時間


##備考



##例

```cpp
#include <iostream>
#include <array>

int main ()
{
  std::array<int, 3> x = {1, 2, 3};
  std::array<int, 3> y = {4, 5, 6};

  std::cout << std::boolalpha;

  std::cout << (x < y) << std::endl;
}
```
* <[color ff0000]

###出力

```cpp
true
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```