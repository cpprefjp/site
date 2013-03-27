#operator--
```cpp
move_iterator& operator--();
move_iterator operator--(int);
```

##概要

<b>イテレータをデクリメントする。</b>


##効果

前置デクリメント operator--()：
`--[base](/reference/iterator/move_iterator/base.md)();``return *this;`

後置デクリメント operator--(int)：
`move_iterator tmp = *this;``--[base](/reference/iterator/move_iterator/base.md)();`
`return tmp;`



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

  auto it = std::make_move_iterator(v.end());
  --it; // ひとつ逆に進める
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* --it[color ff0000]

###出力

```cpp
4
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


