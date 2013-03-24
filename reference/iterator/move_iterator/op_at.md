#operator[]
```cpp
unspecified operator[](difference_type n) const;
```
* unspecified[italic]

##概要

<b>任意の位置にランダムアクセスする。</b>


##戻り値

`return std::[move](/reference/utility/move)([base](/reference/iterator/move_iterator/base)()[n]);`

##例

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it = std::make_move_iterator(v.begin());
  std::unique_ptr<int> p = it[2];

  std::cout << *p << std::endl;
}
```
* it[2][color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.6.1
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


