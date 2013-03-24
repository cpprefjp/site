#operator+=
```cpp
move_iterator& operator+=(difference_type n);
```

##概要

<b>イテレータ自身をN回進める。</b>


##効果

`current += n;`※currentは、メンバ変数として保持しているアダプト元のイテレータ変数


##戻り値

`return *this;`

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
  it += 2;
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* it += 2[color ff0000]

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


