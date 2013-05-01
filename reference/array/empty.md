#empty
```cpp
constexpr bool empty() noexcept;
```

##概要

<b>コンテナが空かどうかを判定する</b>


##戻り値

コンテナが空であれば`true`、そうでなければ`false`を返す。



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
  std::array<int, 3> non_empty_array;
  std::array<int, 0> empty_array;

  std::cout << std::boolalpha;
  std::cout << "non_empty_array : " << non_empty_array.empty() << std::endl;
  std::cout << "empty_array : " << empty_array.empty() << std::endl;
}
```
* empty[color ff0000]
* empty[color ff0000]

###出力

```cpp
non_empty_array : false
empty_array : true
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


