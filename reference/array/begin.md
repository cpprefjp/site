#begin
```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

##概要

<b>先頭要素を指すイテレータを取得する。</b>


##戻り値

非constな文脈ではiterator型で先頭要素へのイテレータを返し、
constな文脈ではconst_iterator型で先頭要素へのイテレータを返す。



##例外

投げない


##計算量

定数時間


##備考



##例

```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};
  const std::array<int, 3>& car = ar;

  decltype(ar)::iterator i = ar.begin();
  decltype(ar)::const_iterator ci = car.begin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* begin[color ff0000]
* begin[color ff0000]

###出力

```cpp
1
1
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