#max_size
```cpp
size_type max_size() const noexcept;
```

##概要

<b>コンテナに格納可能な最大数を取得する。</b>


##戻り値

コンテナに格納可能な最大数


##例外

投げない


##計算量

定数時間


##例

```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v;
  std::size_t s = v.max_size();

  std::cout << s << std::endl;
}
```
* max_size[color ff0000]

###出力例

```cpp
4611686018427387903
```

##バージョン


###言語


- C++03
- C++11



###処理系

- [Clang](/implementation#clang.md): 1.9, 2.9
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.4, 4.5.2, 4.6.1
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0



##参照


