#empty (C++11)
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]

```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかを判定する。


##戻り値
コンテナが空であれば `true`、そうでなければ `false` を返す。


##例外
投げない。


##計算量
定数


##例
```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_map<std::string, int> um;

  // 空
  std::cout << um.empty() << std::endl;

  um.emplace("1st", 1);

  // 空ではない
  std::cout << um.empty() << std::endl;

  um.clear();

  // 空
  std::cout << um.empty() << std::endl;
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* unordered_map[link /reference/unordered_map.md]
* emplace[link emplace.md]
* clear[link clear.md]

###出力
```
true
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##実装例
```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline bool unordered_map<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return [size](size)() == 0; // begin() == end() でも OK
}
```
* begin[link /reference/unordered_map/unordered_map/begin.md]
* end[link /reference/unordered_map/unordered_map/end.md]

##参照

| | |
|-----------------------------|------------------------------|
| [`size`](./size.md)         | 要素数の取得                 |
| [`max_size`](./max_size.md) | 格納可能な最大の要素数の取得 |

