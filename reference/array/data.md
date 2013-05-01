#data
```cpp
T* data() noexcept;
const T* data() const noexcept;
```

##概要

<b>配列の先頭へのポインタを取得する。</b>


##戻り値

arrayクラス内部の組み込み配列変数名がelemsであった場合、elemsを返す。


##例外

投げない

##備考
0要素の場合(N == 0)、この関数の呼び出しによる挙動は未規定。


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
* data[color ff0000]

###出力

```cpp
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
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```