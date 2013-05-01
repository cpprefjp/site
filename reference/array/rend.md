#rend
```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```

##概要

<b>先頭要素の前を指す逆イテレータを取得する。</b>


##戻り値

非`const`な文脈では`reverse_iterator`型で先頭要素の前を指す逆イテレータを返し、
`const`な文脈では`const_reverse_iterator`型で 先頭要素の前を指す逆イテレータを返す。



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

  decltype(ar)::reverse_iterator i = ar.rbegin();
  decltype(ar)::reverse_iterator last = ar.rend();

  decltype(ar)::const_reverse_iterator ci = car.rbegin();
  decltype(ar)::const_reverse_iterator clast = car.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend[color ff0000]
* rend[color ff0000]

###出力

```cpp
3
2
1
3
2
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