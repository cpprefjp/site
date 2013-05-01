#back
```cpp
reference back();
const_reference back() const;
```

##概要

<b>最後尾要素を参照する。</b>


##戻り値

a.back()は末尾の要素への参照を返す。もし、aがconstだった場合には、末尾の要素へのconst参照を返す。a.back() は{ auto tmp = a.end(); --tmp; return *tmp; } と同じ結果になる。

##備考
要素数が0の場合(N == 0の場合)、この関数は定義されない。


##例

```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int& a = ar.back();
  const int& b = car.back();

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* back[color ff0000]
* back[color ff0000]

###出力

```cpp
4
4
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