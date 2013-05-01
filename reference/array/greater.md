#operator>
```cpp
namespace std {

  template <class T, size_t N>
  bool operator>(const array<T, N>& x, const array<T, N>& y);

}
```

##概要

<b>arrayにおいて、左辺が右辺より大きいかを判定する。</b>



##戻り値

b [<](/reference/array/less.md) a


##計算量

線形時間


##備考



##例

```cpp
#include <iostream>
#include <array>

int main ()
{
  std::array<int, 3> x = {4, 5, 6};
  std::array<int, 3> y = {1, 2, 3};

  std::cout << std::boolalpha;

  std::cout << (x > y) << std::endl;
}
```
* >[color ff0000]

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
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```