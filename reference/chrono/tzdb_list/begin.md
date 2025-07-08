# begin
* chrono[meta header]
* std::chrono[meta namespace]
* tzdb_list[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
const_iterator begin() const noexcept;
```

## 概要
先頭要素を指すイテレータを取得する。


## 戻り値
先頭要素を指すイテレータ


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::tzdb_list& ls = chrono::get_tzdb_list();

  int n = std::distance(ls.begin(), ls.end());
  std::cout << n << std::endl;

  for (const chrono::tzdb& tzdb : ls) {
    std::cout << tzdb.version << std::endl;
  }
}
```
* begin()[color ff0000]
* ls.end()[link end.md]
* chrono::get_tzdb_list()[link /reference/chrono/get_tzdb_list.md]
* chrono::tzdb[link /reference/chrono/tzdb.md]

### 出力例
```
1
2019c
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

