```cpp
move_iterator& operator++();
move_iterator operator++(int);
```

##概要

<b>イテレータをインクリメントする。</b>


##効果

前置インクリメント operator++()：

`++[base](/reference/iterator/move_iterator/base)();``return *this;`

後置インクリメント operator++(int)：
`move_iterator tmp = *this;``++[base](/reference/iterator/move_iterator/base)();`
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

  auto it = std::make_move_iterator(v.begin());
  ++it; // ひとつ進める
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* ++it[color ff0000]

###出力

```cpp
1
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


