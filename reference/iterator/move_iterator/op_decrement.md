#operator-- (C++11)
* iterator[meta header]

```cpp
move_iterator& operator--();
move_iterator operator--(int);
```

##概要
イテレータをデクリメントする。


##効果

- 前置デクリメント `operator--()`：

```cpp
--base();
return *this;
```
* base[link ./base.md]

- 後置デクリメント `operator--(int)`：

```cpp
move_iterator tmp = *this;
--base();
return tmp;
```
* base[link ./base.md]


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

###出力
```
4
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


