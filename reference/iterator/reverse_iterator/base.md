```cpp
Iterator base() const;
```

##概要

<b>メンバ変数として保持している、元のイテレータを取得する。</b>



##戻り値

`current`

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());
  decltype(v)::iterator base = it.base(); // 元のイテレータ(v.begin())を取得

  std::cout << *base << std::endl;
}
```
* base[color ff0000]

###出力

```cpp
1
```

##参照


